import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE, developmentChains, PRIMARY_KEY} from "../helper-hardhat-config";
//@ts-ignore
import { ethers } from "hardhat"
import {BigNumber} from "ethers";
import verify from "../helper-functions";

const deployConvernor: DeployFunction = async function(
  hre: HardhatRuntimeEnvironment
  ) {
    //@ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { log, deploy, get } = deployments
    const { deployer } = await getNamedAccounts()

    log("Deployment Governor contract...")

    const governor = await deploy("GovernorContract", {
      from: deployer,
      args: [],
      log: true,
      // waitConfirmation:
    })

    log(`Deployed Governor contract to address ${governor.address}`)

    log("Initialization governor contract...")

    const tokenContract = await get('GovernanceToken')
    const timelockContract = await get('Timelock')

    const [signer] = await ethers.getSigners()
    const governorContract = new ethers.Contract(governor.address, governor.abi, signer)
    try {
      const tx = await governorContract.initialize(
        tokenContract.address,
        timelockContract.address,
        VOTING_DELAY,
        VOTING_PERIOD,
        QUORUM_PERCENTAGE
      )
      await tx.wait(1)

      log("Initialization successful!")
    } catch (e) {
      //@ts-ignore
      if (e.code == 'UNPREDICTABLE_GAS_LIMIT') {
        log('The contract has already been initialized!')
      } else {
        console.error(e)
      }
    }

  if (!developmentChains.includes(network.name) && PRIMARY_KEY) {
    await verify(governor.address, [])
  }
}

export default deployConvernor
