import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {developmentChains, MIN_DELAY, PRIMARY_KEY} from "./../helper-hardhat-config";
import verify from "../helper-functions";


const deployTimelock: DeployFunction =async function(
  hre: HardhatRuntimeEnvironment
  ) {
    //@ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { log, deploy} = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Timelock and waiting for confirmation...")

    const timelock = await deploy("Timelock", {
      from: deployer,
      args: [
        MIN_DELAY, [], []
      ],
      log: true,
      // waitConfirmation:
    })

    log(`Deployed timelock contract to address ${timelock.address}`)

    if (!developmentChains.includes(network.name) && PRIMARY_KEY) {
      await verify(timelock.address, [])
    }

}

export default deployTimelock
