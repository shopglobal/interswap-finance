import { useEffect, useState } from 'react'

type ApiResponse = { 

}
const emptyApiResponse = {
  "updated_at":1632350471337,"data":{"name":"PancakeSwap Token","symbol":"Cake","price":"19.10126379172274486154506940474","price_BNB":"0.05312213965803121762932995543435"}
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.info/api/v2/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

const useGetCakeOGPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        // get bnb price 
        const emptyResponse = emptyApiResponse
        const res = await response.json()     /// => res.data.price
        // @ts-ignore
        if (Object.keys(res).length === 0) {
          console.log("No price fetched")
          setData(emptyResponse.data.price)
        } else {
          console.log("No price fetched")
          console.log(res)
          setData(res.data.price)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetCakeOGPriceData
