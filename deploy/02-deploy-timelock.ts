import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY } from "./../helper-hardhat-config";


const deployTimelock: DeployFunction =async function(
  hre: HardhatRuntimeEnvironment
  ) {
    //@ts-ignore
    const { getNamedAccounts, deployments } = hre
    const { log, deploy} = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Timelock and wating for confiramtion...")

    const timelock = await deploy("Timelock", {
      from: deployer,
      args: [
        MIN_DELAY, [], []
      ],
      log: true,
      // waitConfirmation:
    })

    log(`Deployed timelock contract to address ${timelock.address}`)



}

export default deployTimelock