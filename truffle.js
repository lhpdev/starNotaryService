// Allows us to use ES6 in our migrations and tests.
require('babel-register')({
  ignore: /node_modules\/(?!openzeppelin-solidity\/test\/helpers)/
});

require('babel-polyfill')
// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

var HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    // ganache: {
    //   host: '127.0.0.1',
    //   port: 7545,
    //   network_id: '*' // Match any network id
    // }
    rinkeby: {
      provider: function() {
        return new HDWalletProvider('uphold gauge pioneer divert model push lock intact escape rare deny gun','https://rinkeby.infura.io/v3/a38640eb3e724728b9168faf705de730');
      },
      network_id: 1
    }
  },
  compilers: {
    solc: {
      version: '0.4.24'
    }
  }
}
