import { useEffect, useState } from 'react'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.info/api/v2/tokens/0x2170ed0880ac9a755fd29b2688956bd959f933f8'

const useGetPriceETHData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        // get bnb price    
        const res: ApiResponse = await response.json()      /// => res.data.price
        // @ts-ignore
        setData(res.data.price)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceETHData
