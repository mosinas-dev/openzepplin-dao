import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function(
  hre:HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments } = hre
  const { log, deploy} = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying GovernanceToken and wating for confiramtion...")

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmation:
  })
  log(`Deployed governance token to address ${governanceToken.address}`)

  await delegate(governanceToken.address, deployer)
  log("Delegated!")
}

const delegate = async (governanceTokenAddress: string, delegateAccount: string) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)

  const tx = await governanceToken.delegate(delegateAccount)
  await tx.wait(1)
  console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegateAccount)}`);
}

export default deployGovernanceToken