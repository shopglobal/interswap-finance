import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { kebabCase } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { Toast, toastTypes } from '@pancakeswap-libs/uikit'
import { useSelector, useDispatch } from 'react-redux'
import { Team } from 'config/constants/types'
import { getWeb3NoAccount } from 'utils/web3'
import useRefresh from 'hooks/useRefresh'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
  setBlock,
} from './actions'
import { State, Farm, Pool, Block, ProfileState, TeamsState, AchievementState, PriceState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchPrices } from './prices'
import useGetPriceData from '../components/Menu/getPrice'
import useGetPricesData from '../components/Menu/getPrices'
import useGetPricesETHData from '../components/Menu/getPricesETH'
import useGetCakeOGPriceData from '../components/Menu/getCakePrice'
import useGetPriceATOMData from '../components/Menu/getPricesATOM'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices
export const usePriceBnbBusd = (): BigNumber => {
  // const pid = 2 // BUSD-BNB LP
  // @ts-ignore
  const priceData = useGetPriceData()

  // @ts-ignore
  const priceData2 = new BigNumber(priceData)

  return priceData2;

}

export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  const pid = 1;
  // const bnbPriceUSD = usePriceBnbBusd()

  let priceData = useGetPriceData()

  // @ts-ignore  
  priceData = new BigNumber(priceData)

  const farm = useFarmFromPid(pid)

  //  @ts-ignore
  return farm.tokenPriceVsQuote ? priceData.times(farm.tokenPriceVsQuote) : ZERO
  
}

export const usePriceCakeOGUSD = (): BigNumber => {
  // const pid = 2 // XSC-CAKE LP
  // @ts-ignore
  const priceDataOG = useGetPricesData()
  // @ts-ignore
  const priceDataOG2 = new BigNumber(priceDataOG)
  return priceDataOG2;

}
export const usePriceCakeOGBusd = (): BigNumber => {
  const pid = 2;
  const cakeOGPriceUSD = usePriceCakeOGUSD()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? cakeOGPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}


export const usePriceATOM = (): BigNumber => {
  // const pid = 5 // XSC-ATOM LP
  // @ts-ignore
  const priceDataOGATOM = useGetPriceATOMData()
  // @ts-ignore
  const atomPrice = new BigNumber(priceDataOGATOM)
  return atomPrice;
}

export const usePriceATOMusd = (): BigNumber => {
  const pid = 5;
  const priceATOM = usePriceATOM()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? priceATOM.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceETH = (): BigNumber => {
  // const pid = 4 // XSC-ETH LP
  // @ts-ignore
  const priceDataOGETH = useGetPricesETHData()

  // @ts-ignore
  const ethPrice = new BigNumber(priceDataOGETH)

  return ethPrice;

}
export const usePriceEthusd = (): BigNumber => {
  const pid = 4;
  const priceETH = usePriceETH()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? priceETH.times(farm.tokenPriceVsQuote) : ZERO
}


export const usePriceEthBusd = (): BigNumber => {
  const pid = 0;
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
}

// Toasts
export const useToast = () => {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[token.toLowerCase()]
}

// Block
export const useBlock = (): Block => {
  return useSelector((state: State) => state.block)
}
