import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'XSC',
    lpAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',
    },
    tokenSymbol: 'SYRUP',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 4,
    lpSymbol: 'XSC-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xe84042994905f91164a2975a7dfac406998d1f34',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteTokenSymbol: QuoteToken.ETH_OG,
    quoteTokenAdresses: contracts.eth,
  },

  {
    pid: 1,
    lpSymbol: 'XSC-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xdC5453587b4303F6ddb839c7Bb63005B517Bb55c',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 5,
    lpSymbol: 'XSC-ATOM LP',
    lpAddresses: {
      97: '',
      56: '0xb62A5fa93275375170f45AB841F1d6F7a9b52a1c',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteTokenSymbol: QuoteToken.CAKE_OG,
    quoteTokenAdresses: contracts.cake_og,
  },

  {
    pid: 2,
    lpSymbol: 'XSC-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x30e3d899b7133Ea67F57c521606be4Ff8366DcF9',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteTokenSymbol: QuoteToken.CAKE_OG,
    quoteTokenAdresses: contracts.cake_og,
  },

  {
    pid: 3,
    lpSymbol: 'XSC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc8458F9b47FCf040F6C9871d9Dfbb0c1d079DC32',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

]

export default farms
