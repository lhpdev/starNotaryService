# Decentralized Star Notary Service - Udacity Blockchain ND Final Project Section 5

This is the final project of the Term One from Udacity - Blockchain Nano Degree course

To run this project properly you will have to have installed the following frameworks:
- Truffle framework
- Node js
- Metamask (browser extension or browser itself)

As the current project is set to deploy contracts into the Rinkeby network, if you want to update the smart contract and re-submit it, first of all you will have to update the truffle.js file with your Metamask Mnemonics and Infura credentials.

After that, you will have to run truffle commands from the project directory:
'truffle compile' to compile the Smart Contract and see if everything works well and then
'truffle migrate --reset --network rinkeby' to deploy the contract into the Rinkeby network ( Ethereum test network )
Additionally: you can also run the project tests by running 'truffle test' command.

Once you have done that, now you will be able to modify and re-deploy a new Smart Contract.

To run the frontend of the project, first run 'npm install' if you still haven't done that, and then run 'npm run dev'. It will run the frontend application at your localhost on port 8080.

Create as many stars you want by providing a 'name' and the 'id' for it. Once you submit a star it will pop up a request into your Metamask asking you to 'Accept' or 'Reject' the transaction. 

To get a Star by its Id, at the second input fill it up with an existing star id. It should return the respective star name for the informed id.

# Current Token Info:

* ERC-721 Token Name: 'GalaxyToken',
* ERC-721 Token Symbol: 'GLX'
* Token Address” on the rinkeby Network: https://rinkeby.etherscan.io/address/0x5e0bfca0ae957466c83433045888855ce6108b79
