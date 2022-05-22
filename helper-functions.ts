import { run } from "hardhat"

export default async (contractAddress: string, contractFile: string, args: any[]) => {
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
