// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteContract }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const firstPart = quoteTokenAdresses[chainId]
  const secondPart = quoteContract[chainId]
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
