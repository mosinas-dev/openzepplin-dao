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

task('mint', "Mint Ntf token", async (taskArgs, hre) => {
  const { deployments } = hre
  const { get, log } = deployments
  const contract = await get('NFTToken')

  console.log(contract)
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "rinkeby",
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        // enabled: !process.env.DEBUG,
        enabled: true,
        runs: 1500
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
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      chainId: 0x66eeb,
      accounts: process.env.RINKEBY_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_PRIVATE_KEY] : [],
      // gas: 2100000,
      // gasPrice: 8000000000
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
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
      rinkeby: process.env.RENKEBY_PRIVATE_KEY || ""
    }
  }
};

export default config;
