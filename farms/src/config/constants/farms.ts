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
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 4,
    lpSymbol: 'XSC-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xe84042994905f91164a2975a7dfac406998d1f34',   // lp address token-eth
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
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
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 5,
    lpSymbol: 'XSC-ATOM LP',
    lpAddresses: {
      97: '',
      56: '0xb62A5fa93275375170f45AB841F1d6F7a9b52a1c',   // lp address token-atom
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.ATOM,
    quoteTokenAdresses: contracts.atom,
  },

  {
    pid: 2,
    lpSymbol: 'XSC-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x30e3d899b7133Ea67F57c521606be4Ff8366DcF9',   // lp address token-cake
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.CAKE_OG,
    quoteTokenAdresses: contracts.cake_og,
  },

  {
    pid: 3,
    lpSymbol: 'XSC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc8458F9b47FCf040F6C9871d9Dfbb0c1d079DC32',   // lp address token-busd
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 11,
    lpSymbol: 'XSC-CRYSTAL LP',
    lpAddresses: {
      97: '',
      56: '0x202af414409042497161a9ed928330d0925a4693',   // lp address token-crystal
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },

  {
    pid: 12,
    lpSymbol: 'CRYSTAL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xB1A01410AEb9c4929Bdb99Ba776f90F142855AF4',   // lp address crystal-wbnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.wbnb,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },

  {
    pid: 13,
    lpSymbol: 'CRYSTAL-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0504b6788e880255153f9ee5251D8849B293F38B',   // lp address token-busd
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.busd,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },

  {
    pid: 14,
    lpSymbol: 'CRYSTAL-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x82F3B20FC6Ab23005B355c06dF3dA611f3371f3c',   // lp address token-cake
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.cake,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },

  {
    pid: 15,
    lpSymbol: 'CRYSTAL-ETH LP',
    lpAddresses: {
      97: '',
      56: '0x7b1de5E16466C5bd644790807302fC17B0343620',   // lp address token-eth
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.eth,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },
  
  {
    pid: 16,
    lpSymbol: 'CRYSTAL-ATOM LP',
    lpAddresses: {
      97: '',
      56: '0x8Fe68F5198228f07C6443CA0CB03CC545A52bAB8',   // lp address token-atom
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.atom,
    quoteTokenSymbol: QuoteToken.CRYSTAL,
    quoteTokenAdresses: contracts.crystal,
  },
  
  {
    pid: 17,
    lpSymbol: 'AQUA-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xe1AE3140f6b4C3854e591cd95628968a503532B3',   // lp address token-bnb
    },
    tokenSymbol: 'XSC',
    tokenAddresses: {
      97: '',
      56: '0x7155aFF27df20F9B0ecF8406A5A60c30043894Ec', // token address
    },
    quoteContract: contracts.wbnb,
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.aqua,
  },
  

]

export default farms
