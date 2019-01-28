pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

    string public constant name = "GalaxyToken";
    string public constant symbol = "GLX";
    
    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

    function lookUptokenIdToStarInfo(uint256 _tokenId) view public returns (string) {
        return (tokenIdToStarInfo[_tokenId].name);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
      }

    function exchangeStars(uint256 firstToken, uint256 secondToken) public {
        require(firstToken != secondToken);

        address firstTokenOwner = ownerOf(firstToken);
        address secondTokenOwner = ownerOf(secondToken);

        require(firstTokenOwner != secondTokenOwner);

        _removeTokenFrom(firstTokenOwner, firstToken);
        _removeTokenFrom(secondTokenOwner, secondToken);

        _addTokenTo(firstTokenOwner, secondToken);
        _addTokenTo(secondTokenOwner, firstToken);
    }

    function transferStar(address _to, uint starToken) public {
        require(ownerOf(starToken) == msg.sender);

        _removeTokenFrom(msg.sender, starToken);
        _addTokenTo(_to, starToken);
    }
}
