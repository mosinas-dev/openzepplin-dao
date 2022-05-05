import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat"
import { ADDRESS_ZERO } from "../helper-hardhat-config"

const setupGovernance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  //@ts-ignore
  const { getNamedAccounts, deployments } = hre
  const { log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const [signer] = await ethers.getSigners()
  // const governanceToken = await get("GovernanceToken")
  // const timeLock = await get("TimeLock")
  // const governor = await get("GovernorContract")
  //
  // const timelockContract = new ethers.Contract(timeLock.address, timeLock.abi, signer)
  //
  // log("----------------------------------------------------")
  // log("Setting up contracts for roles...")
  // const proposerRole = await timelockContract.PROPOSER_ROLE()
  // const executorRole = await timelockContract.EXECUTOR_ROLE()
  // const adminRole = await timelockContract.TIMELOCK_ADMIN_ROLE()
  //
  // const proposerTx = await timelockContract.grantRole(proposerRole, governor.address)
  // await proposerTx.wait(1)
  // const executorTx = await timelockContract.grantRole(executorRole, ADDRESS_ZERO)
  // await executorTx.wait(1)
  // const revokeTx = await timelockContract.revokeRole(adminRole, deployer)
  // await revokeTx.wait(1)

}

export default setupGovernance
