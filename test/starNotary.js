//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;

  contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
  });

  it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    assert.equal(await instance.ownerOf.call(starId), user2)
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice)
  });

  it('gets contract name and symbol correctly', async() => {
    assert.equal(await instance.getTokenContractName.call(), 'GalaxyToken')
    assert.equal(await instance.getTokenContractSymbol.call(), 'GLX')
  });

  it('lets users exchange their stars', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let tokenIdUser1 = 10
    let tokenIdUser2 = 20
    await instance.createStar('awesome star', tokenIdUser1, {from: user1})
    await instance.createStar('awesome star 2', tokenIdUser2, {from: user2})
    assert.equal(await instance.ownerOf.call(tokenIdUser1), user1)
    assert.equal(await instance.ownerOf.call(tokenIdUser2), user2)
    await instance.exchangeStars(tokenIdUser1,tokenIdUser2)
    assert.equal(await instance.ownerOf.call(tokenIdUser1), user2)
    assert.equal(await instance.ownerOf.call(tokenIdUser2), user1)
  });                                  

  it('lets transfer start token from one address to another', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let tokenIdUser1 = 30

    await instance.createStar('awesome star', tokenIdUser1, {from: user1})
    assert.equal(await instance.ownerOf.call(tokenIdUser1), user1)
    await instance.transferStar(user2, tokenIdUser1, {from: user1})
    assert.equal(await instance.ownerOf.call(tokenIdUser1), user2)
  });