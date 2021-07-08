const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 1;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 8545,
      network_id: "*",
      host: "127.0.0.1",
    },
    ganache_local: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "http://127.0.0.1:7545",
          MetaMaskAccountIndex
        );
      },
      network_id: "5777",
    },
    goerli_infura: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://goerli.infura.io/v3/3d2f0b8d964a447b8f26931139c71968",
          MetaMaskAccountIndex
        );
      },
      network_id: 5,
    },
    ropsten_infura: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/3d2f0b8d964a447b8f26931139c71968",
          MetaMaskAccountIndex
        );
      },
      network_id: 3,
    },
  },
  compilers: {
    solc: {
      version: "0.6.0",
    },
  },
};
