import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat";
import { networkConfiguration, developmentChains, PRIMARY_KEY } from './../helper-hardhat-config'
import verify  from './../helper-functions'

const deployGovernanceToken: DeployFunction = async function(
  hre:HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { log, deploy} = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying GovernanceToken and waiting for confirmation...")

  const networkName = network.name

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // @ts-ignore
    // waitConfirmation: networkConfiguration[networkName].blockConfirmation,
  });
  log(`Deployed governance token to address ${governanceToken.address}`)

  if (!developmentChains.includes(network.name) && PRIMARY_KEY) {
    await verify(governanceToken.address, 'contracts/GovernanceToken.sol:GovernanceToken',[])
  }
  log(`Delegated to ${deployer}`)
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
