export interface NetworkConfigurationItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface NetworkConfiguration {
  [key: string]: NetworkConfigurationItem,
}

export const networkConfiguration = {
  hardhat: {

  },
  localhost: {

  },
  bsctest: {
    blockConfirmation: process.env.BSCTESTNET_COUNT_CONFIRMATION || 6,
  }
}

export const developmentChains = ["hardhat", "localhost"]

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact

export const VOTING_PERIOD = 5 // blocks
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const PRIMARY_KEY = process.env.BSCTESTNET_PRIVATE_KEY || ''
