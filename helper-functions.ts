import { run } from "hardhat"

export default async (contractAddress: string, contractFile: string, args: any[]) => {
  console.log("Verifying contract...")
  console.log(contractAddress)
  console.log(args)

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: contractFile
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}
