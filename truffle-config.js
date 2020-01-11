require("babel-register");
require("babel-polyfill");

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic =
  "bright marble call laugh curtain chuckle program script frog promote like food";

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: "*" // Match any network id
    // },
    // rinkeby: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "https://rinkeby.infura.io/v3/312053daf0f2434482ca8b71e486581c"
    //     );
    //   },
    //   network_id: 4,
    //   gas: 4500000,
    //   gasPrice: 10000000000
    // },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://kovan.infura.io/v3/312053daf0f2434482ca8b71e486581c"
        );
      },
      network_id: 42,
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
