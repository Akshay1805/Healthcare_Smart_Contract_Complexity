// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.27",  // Update to match the contract's Solidity version
    gasReporter: {
      enabled: true,
      currency: 'USD',
      gasPrice: 21,
      outputFile: "gas-report.txt", // Optional: save report to a file
      noColors: true,
  },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Your network configurations here (e.g., arbitrumSepolia)
  },
};

