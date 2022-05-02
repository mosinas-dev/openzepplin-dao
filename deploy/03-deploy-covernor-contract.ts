import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from "../helper-hardhat-config";
// import { ethers } from "hardhat";
// import { BigNumber, utils } from "ethers";




const deployConvernor: DeployFunction =async function(
  hre: HardhatRuntimeEnvironment
  ) {
    //@ts-ignore
    const { getNamedAccounts, deployments } = hre
    const { log, deploy, get } = deployments
    const { deployer } = await getNamedAccounts()

    // const governanceToken = await get("GovernanceToken")
    // const timelock = await get("Timelock")

    log("Deployment Covernor contract...")

    const governor = await deploy("ConvernorContract", {
      from: deployer,
      args: [],
      log: true,
      // waitConfirmation:
    })

    log(`Deployed Governor contract to address ${governor.address}`)
}


export default deployConvernor