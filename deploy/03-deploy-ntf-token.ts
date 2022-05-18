import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//@ts-ignore
import { ethers } from "hardhat";
import { networkConfiguration, developmentChains, PRIMARY_KEY } from './../helper-hardhat-config'
import verify  from './../helper-functions'

const deployNFTToken: DeployFunction = async function(
  hre:HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { log, deploy} = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying GovernanceToken and waiting for confirmation...")

  const nftToken = await deploy("NFTToken", {
    from: deployer,
    args: [],
    log: true,
    // @ts-ignore
    // waitConfirmation: networkConfiguration[networkName].blockConfirmation,
  });
  log(`Deployed nft token to address ${nftToken.address}`)

  if (!developmentChains.includes(network.name) && PRIMARY_KEY) {
    await verify(nftToken.address, 'contracts/NFTToken.sol:NFTToken',[])
  }
}

export default deployNFTToken;