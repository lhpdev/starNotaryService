# Decentralized Star Notary Service - Udacity Blockchain ND Final Project Section 5

This is the final project of the Term One from Udacity - Blockchain Nano Degree

To run this project you have to have installed:
- Truffle framework
- Node js
- Metamesk

As its current version is running on Rinkeby network, first of all you will have to update the truffle.js file with your Metamesk Mnemonic and Infura credentials

After that you will have to run truffle commands from the project directory:
'truffle compile' to compile the SmartContract and see if everything works well and then
'truffle migrate --reset --network rinkeby' to deploy the contract into the Rinkeby network ( Ethereum test network )

Once you have done that, now you will be able to interact with the application frontend

Create as many stars you want providing a 'name' and 'id' for it. Once you submit a star it will pop up a notification into your Metamask asking you to Accept or Reject the transaction. 

To get a Star by its Id, at the secon input fill it up with a existing star id. It should return the respective star name for the informed id.
