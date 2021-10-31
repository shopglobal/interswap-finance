import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'XSC',
    tokenAddress: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',   // token address
    stakingTokenName: QuoteToken.CAKE,
    stakingTokenAddress: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',  // token address
    contractAddress: {
      97: '',
      56: '0xbc33C8AD9756b669F5ABFe6cE9B9Cb132C3Aff47',  /// masterchef address
    },
    poolCategory: PoolCategory.CORE,
    projectLink: '/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
 
]

export default pools
