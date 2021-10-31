import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'

export interface ExpandableSectionProps {
  masterChefAddress: string
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  masterChefAddress,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Flex style={{marginTop: '-8%'}}  className="blockD" justifyContent="flex-start">
        <Text>MasterChef :</Text>
        <Link style={{position: 'relative', marginRight: 'auto', marginLeft: 'auto', width: '70%'}} external href={masterChefAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </Link>
      </Flex>
      <Flex className="text-center" justifyContent="flex-start">
        <Text>Liquidity Pool :</Text>
        {/* style={{position: 'relative', marginRight: 'auto', marginLeft: 'auto', width: '75%'}} */}
        <StyledLinkExternal external href={bscScanAddress}> {lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex className="text-center" justifyContent="flex-start">
        <Text>Staking LP in Pool :</Text>

        {/* style={{position: 'relative', marginRight: 'auto', marginLeft: 'auto', width: '75%'}} */}
        <StyledLinkExternal href={addLiquidityUrl}> {lpLabel}</StyledLinkExternal>
      </Flex>
      {/* {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Add Liquidity to Stake')}:</Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
        </Flex>
      )} */}
    </Wrapper>
  )
}

export default DetailsSection
