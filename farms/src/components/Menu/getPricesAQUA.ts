import { useEffect, useState } from 'react'

type ApiResponse = {
  aquachain: {
    [usd: string]: string
  }
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.coingecko.com/api/v3/simple/price?ids=aquachain&vs_currencies=usd'

const useGetPriceAQUAData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        // get bnb price    
        const res: ApiResponse = await response.json()      /// => res.data.price
        // @ts-ignore
        setData(res.aquachain.usd)
        console.log("aqua: ",res.aquachain.usd)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceAQUAData
