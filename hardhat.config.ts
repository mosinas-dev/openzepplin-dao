import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "hardhat-deploy"
import { HardhatUserConfig, task } from "hardhat/config"

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "bsctest",
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: process.env.DEBUG ? false : true
      },
    }
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    bsctest: {
      url: process.env.BSCTESTNET_URL || "",
      chainId: 97,
      accounts: process.env.BSCTESTNET_PRIVATE_KEY !== undefined ? [process.env.BSCTESTNET_PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY || ""
    }
  }
};

export default config;
