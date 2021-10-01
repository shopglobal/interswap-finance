import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBusd, usePriceCakeOGBusd, usePriceEthusd, usePriceATOMusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { orderBy } from 'lodash'
// import { gsap, TimelineLite, TimelineMax, TweenMax, CSSPlugin } from "gsap/all";

import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'


// const tl = new TimelineMax({ repeat: -1})
// const tlSky = new TimelineMax({ repeat: -1})
const style1 = {
  stopColor: "#F37121",
}
const style2 = {
  stopColor: "#F37121",
}
const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  .text3 {    
    -webkit-text-stroke-width: .22px;
    -webkit-text-stroke-color: #8ebf42;
  }
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const RocketContainer = styled.div`
  .bg {
    background: url("/images/pools/galaxy.png") no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -3;
}
.bg:before {
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    opacity: 0.3;
}
@keyframes sf-fly-by-1 {
    from {
        transform: translateZ(-600px);
        opacity: 0.5;
    }
    to {
        transform: translateZ(0);
        opacity: 0.5;
    }
}
@keyframes sf-fly-by-2 {
    from {
        transform: translateZ(-1200px);
        opacity: 0.5;
    }
    to {
        transform: translateZ(-600px);
        opacity: 0.5;
    }
}
@keyframes sf-fly-by-3 {
    from {
        transform: translateZ(-1800px);
        opacity: 0.5;
    }
    to {
        transform: translateZ(-1200px);
        opacity: 0.5;
    }
}
.star-field {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    perspective: 600px;
    -webkit-perspective: 600px;
    z-index: -1;
}
.star-field .layer {
    box-shadow: -411px -476px #cccccc, 777px -407px #d4d4d4, -387px -477px #fcfcfc, -91px -235px #d4d4d4, 491px -460px #f7f7f7, 892px -128px #f7f7f7, 758px -277px #ededed, 596px 378px #cccccc, 647px 423px whitesmoke, 183px 389px #c7c7c7,
        524px -237px #f0f0f0, 679px -535px #e3e3e3, 158px 399px #ededed, 157px 249px #ededed, 81px -450px #ebebeb, 719px -360px #c2c2c2, -499px 473px #e8e8e8, -158px -349px #d4d4d4, 870px -134px #cfcfcf, 446px 404px #c2c2c2,
        440px 490px #d4d4d4, 414px 507px #e6e6e6, -12px 246px #fcfcfc, -384px 369px #e3e3e3, 641px -413px #fcfcfc, 822px 516px #dbdbdb, 449px 132px #c2c2c2, 727px 146px #f7f7f7, -315px -488px #e6e6e6, 952px -70px #e3e3e3,
        -869px -29px #dbdbdb, 502px 80px #dedede, 764px 342px #e0e0e0, -150px -380px #dbdbdb, 654px -426px #e3e3e3, -325px -263px #c2c2c2, 755px -447px #c7c7c7, 729px -177px #c2c2c2, -682px -391px #e6e6e6, 554px -176px #ededed,
        -85px -428px #d9d9d9, 714px 55px #e8e8e8, 359px -285px #cfcfcf, -362px -508px #dedede, 468px -265px #fcfcfc, 74px -500px #c7c7c7, -514px 383px #dbdbdb, 730px -92px #cfcfcf, -112px 287px #c9c9c9, -853px 79px #d6d6d6,
        828px 475px #d6d6d6, -681px 13px #fafafa, -176px 209px #f0f0f0, 758px 457px #fafafa, -383px -454px #ededed, 813px 179px #d1d1d1, 608px 98px whitesmoke, -860px -65px #c4c4c4, -572px 272px #f7f7f7, 459px 533px #fcfcfc,
        624px -481px #e6e6e6, 790px 477px #dedede, 731px -403px #ededed, 70px -534px #cccccc, -23px 510px #cfcfcf, -652px -237px whitesmoke, -690px 367px #d1d1d1, 810px 536px #d1d1d1, 774px 293px #c9c9c9, -362px 97px #c2c2c2,
        563px 47px #dedede, 313px 475px #e0e0e0, 839px -491px #e3e3e3, -217px 377px #d4d4d4, -581px 239px #c2c2c2, -857px 72px #cccccc, -23px 340px #dedede, -837px 246px white, 170px -502px #cfcfcf, 822px -443px #e0e0e0, 795px 497px #e0e0e0,
        -814px -337px #cfcfcf, 206px -339px #f2f2f2, -779px 108px #e6e6e6, 808px 2px #d4d4d4, 665px 41px #d4d4d4, -564px 64px #cccccc, -380px 74px #cfcfcf, -369px -60px #f7f7f7, 47px -495px #e3e3e3, -383px 368px #f7f7f7, 419px 288px #d1d1d1,
        -598px -50px #c2c2c2, -833px 187px #c4c4c4, 378px 325px whitesmoke, -703px 375px #d6d6d6, 392px 520px #d9d9d9, -492px -60px #c4c4c4, 759px 288px #ebebeb, 98px -412px #c4c4c4, -911px -277px #c9c9c9;
    transform-style: preserve-3d;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 4px;
    width: 4px;
    border-radius: 2px;
}
.star-field .layer:nth-child(1) {
    animation: sf-fly-by-1 5s linear infinite;
}
.star-field .layer:nth-child(2) {
    animation: sf-fly-by-2 5s linear infinite;
}
.star-field .layer:nth-child(3) {
    animation: sf-fly-by-3 5s linear infinite;
}

  .astronaut {
  width: 260px;
  height: 340px;
  background-repeat: no-repeat;
  margin: 60px auto 0;

  -webkit-background-size: 260px 20px;
  -moz-background-size: 260px 20px;
  background-size: 260px 20px;
  background-position: 0 0, 0 20px, 0 40px, 0 60px, 0 80px, 0 100px, 0 120px, 0 140px, 0 160px, 0 180px, 0 200px, 0 220px, 0 240px, 0 260px, 0 280px, 0 300px, 0 320px, 0 340px; 
  background-image: -webkit-linear-gradient( left, transparent 0%, transparent 15.384615384%, #fff 15.384615385%, #fff 84.615384615%, transparent 84.615384616% ), -webkit-linear-gradient( left, transparent 0%, transparent 7.692307692%, #fff 7.692307693%, #fff 84.615384615%, #E7E3E7 84.615384616%, #E7E3E7 92.307692307%, transparent 92.307692307% ), -webkit-linear-gradient( left, #fff 0%, #fff 15.384615384%, #000 15.384615385%, #000 76.923076923%, #fff 76.923076924%, #fff 92.307692306%, #E7E3E7 92.307692307% ), -webkit-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 23.07692307%, #CECBCE 23.07692308%, #CECBCE 53.84615384%, #000 53.84615385%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 15.38461538%, #CECBCE 15.38461539%, #CECBCE 23.07692307%, #000 23.07692308%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, #E7E3E7 0%, #E7E3E7 7.692307692%, #fff 7.692307693%, #fff 15.38461538%, #000 15.38461539%, #000 76.92307692%, #fff 76.92307693%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -webkit-linear-gradient( left, transparent 0%, transparent 7.692307692%, #E7E3E7 7.692307693%, #E7E3E7 15.38461538%, #fff 15.38461539%, #fff 84.61538461%, #E7E3E7 84.61538462%, #E7E3E7 92.30769230%, transparent 92.30769231% ), -webkit-linear-gradient( left, transparent 0%, transparent 30.76923076%, #210C00 30.76923077%, #210C00 76.92307692%, transparent 76.92307693% ), -webkit-linear-gradient( left, transparent 0%, transparent 23.07692307%, #C64D00 23.07692308%, #C64D00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #C64D00 76.92307693%, #C64D00 84.61538461%, transparent 84.61538462% ), -webkit-linear-gradient( left, transparent 0%, transparent 23.07692307%, #210C00 23.07692308%, #210C00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 61.53846153%, #001C63 61.53846154%, #001C63 69.23076923%, #FF6500 69.23076924%, #FF6500 76.92307692%, #210C00 76.92307693%, #210C00 84.61538461%, transparent 84.61538462% ), -webkit-linear-gradient( left, transparent 0%, transparent 23.07692307%, #E7C3A5 23.07692308%, #E7C3A5 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #E7C3A5 76.92307693%, #E7C3A5 84.61538461%, transparent 84.61538462% ), -webkit-linear-gradient( left, transparent 0%, transparent 30.76923076%, #FF6500 30.76923077%, #FF6500 76.92307692%, transparent 76.92307693% ), -webkit-linear-gradient( left, transparent 0%, transparent 30.76923076%, #8C3800 30.76923077%, #8C3800 76.92307692%, transparent 76.92307693% ), -webkit-linear-gradient( left, transparent 0%, transparent 30.76923076%, #fff 30.76923077%, #fff 46.15384615%, transparent 46.15384616%, transparent 61.53846153%, #fff 61.53846154%, #fff 76.92307692%, transparent 76.92307693% );
  background-image: -moz-linear-gradient( left, transparent 0%, transparent 15.384615384%, #fff 15.384615385%, #fff 84.615384615%, transparent 84.615384616% ), -moz-linear-gradient( left, transparent 0%, transparent 7.692307692%, #fff 7.692307693%, #fff 84.615384615%, #E7E3E7 84.615384616%, #E7E3E7 92.307692307%, transparent 92.307692307% ), -moz-linear-gradient( left, #fff 0%, #fff 15.384615384%, #000 15.384615385%, #000 76.923076923%, #fff 76.923076924%, #fff 92.307692306%, #E7E3E7 92.307692307% ), -moz-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 23.07692307%, #CECBCE 23.07692308%, #CECBCE 53.84615384%, #000 53.84615385%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 15.38461538%, #CECBCE 15.38461539%, #CECBCE 23.07692307%, #000 23.07692308%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, #E7E3E7 0%, #E7E3E7 7.692307692%, #fff 7.692307693%, #fff 15.38461538%, #000 15.38461539%, #000 76.92307692%, #fff 76.92307693%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -moz-linear-gradient( left, transparent 0%, transparent 7.692307692%, #E7E3E7 7.692307693%, #E7E3E7 15.38461538%, #fff 15.38461539%, #fff 84.61538461%, #E7E3E7 84.61538462%, #E7E3E7 92.30769230%, transparent 92.30769231% ), -moz-linear-gradient( left, transparent 0%, transparent 30.76923076%, #210C00 30.76923077%, #210C00 76.92307692%, transparent 76.92307693% ), -moz-linear-gradient( left, transparent 0%, transparent 23.07692307%, #C64D00 23.07692308%, #C64D00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #C64D00 76.92307693%, #C64D00 84.61538461%, transparent 84.61538462% ), -moz-linear-gradient( left, transparent 0%, transparent 23.07692307%, #210C00 23.07692308%, #210C00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 61.53846153%, #001C63 61.53846154%, #001C63 69.23076923%, #FF6500 69.23076924%, #FF6500 76.92307692%, #210C00 76.92307693%, #210C00 84.61538461%, transparent 84.61538462% ), -moz-linear-gradient( left, transparent 0%, transparent 23.07692307%, #E7C3A5 23.07692308%, #E7C3A5 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #E7C3A5 76.92307693%, #E7C3A5 84.61538461%, transparent 84.61538462% ), -moz-linear-gradient( left, transparent 0%, transparent 30.76923076%, #FF6500 30.76923077%, #FF6500 76.92307692%, transparent 76.92307693% ), -moz-linear-gradient( left, transparent 0%, transparent 30.76923076%, #8C3800 30.76923077%, #8C3800 76.92307692%, transparent 76.92307693% ), -moz-linear-gradient( left, transparent 0%, transparent 30.76923076%, #fff 30.76923077%, #fff 46.15384615%, transparent 46.15384616%, transparent 61.53846153%, #fff 61.53846154%, #fff 76.92307692%, transparent 76.92307693% );
  background-image: -o-linear-gradient( left, transparent 0%, transparent 15.384615384%, #fff 15.384615385%, #fff 84.615384615%, transparent 84.615384616% ), -o-linear-gradient( left, transparent 0%, transparent 7.692307692%, #fff 7.692307693%, #fff 84.615384615%, #E7E3E7 84.615384616%, #E7E3E7 92.307692307%, transparent 92.307692307% ), -o-linear-gradient( left, #fff 0%, #fff 15.384615384%, #000 15.384615385%, #000 76.923076923%, #fff 76.923076924%, #fff 92.307692306%, #E7E3E7 92.307692307% ), -o-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 23.07692307%, #CECBCE 23.07692308%, #CECBCE 53.84615384%, #000 53.84615385%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 15.38461538%, #CECBCE 15.38461539%, #CECBCE 23.07692307%, #000 23.07692308%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, #E7E3E7 0%, #E7E3E7 7.692307692%, #fff 7.692307693%, #fff 15.38461538%, #000 15.38461539%, #000 76.92307692%, #fff 76.92307693%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -o-linear-gradient( left, transparent 0%, transparent 7.692307692%, #E7E3E7 7.692307693%, #E7E3E7 15.38461538%, #fff 15.38461539%, #fff 84.61538461%, #E7E3E7 84.61538462%, #E7E3E7 92.30769230%, transparent 92.30769231% ), -o-linear-gradient( left, transparent 0%, transparent 30.76923076%, #210C00 30.76923077%, #210C00 76.92307692%, transparent 76.92307693% ), -o-linear-gradient( left, transparent 0%, transparent 23.07692307%, #C64D00 23.07692308%, #C64D00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #C64D00 76.92307693%, #C64D00 84.61538461%, transparent 84.61538462% ), -o-linear-gradient( left, transparent 0%, transparent 23.07692307%, #210C00 23.07692308%, #210C00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 61.53846153%, #001C63 61.53846154%, #001C63 69.23076923%, #FF6500 69.23076924%, #FF6500 76.92307692%, #210C00 76.92307693%, #210C00 84.61538461%, transparent 84.61538462% ), -o-linear-gradient( left, transparent 0%, transparent 23.07692307%, #E7C3A5 23.07692308%, #E7C3A5 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #E7C3A5 76.92307693%, #E7C3A5 84.61538461%, transparent 84.61538462% ), -o-linear-gradient( left, transparent 0%, transparent 30.76923076%, #FF6500 30.76923077%, #FF6500 76.92307692%, transparent 76.92307693% ), -o-linear-gradient( left, transparent 0%, transparent 30.76923076%, #8C3800 30.76923077%, #8C3800 76.92307692%, transparent 76.92307693% ), -o-linear-gradient( left, transparent 0%, transparent 30.76923076%, #fff 30.76923077%, #fff 46.15384615%, transparent 46.15384616%, transparent 61.53846153%, #fff 61.53846154%, #fff 76.92307692%, transparent 76.92307693% );
  background-image: -ms-linear-gradient( left, transparent 0%, transparent 15.384615384%, #fff 15.384615385%, #fff 84.615384615%, transparent 84.615384616% ), -ms-linear-gradient( left, transparent 0%, transparent 7.692307692%, #fff 7.692307693%, #fff 84.615384615%, #E7E3E7 84.615384616%, #E7E3E7 92.307692307%, transparent 92.307692307% ), -ms-linear-gradient( left, #fff 0%, #fff 15.384615384%, #000 15.384615385%, #000 76.923076923%, #fff 76.923076924%, #fff 92.307692306%, #E7E3E7 92.307692307% ), -ms-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 23.07692307%, #CECBCE 23.07692308%, #CECBCE 53.84615384%, #000 53.84615385%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 15.38461538%, #CECBCE 15.38461539%, #CECBCE 23.07692307%, #000 23.07692308%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, #E7E3E7 0%, #E7E3E7 7.692307692%, #fff 7.692307693%, #fff 15.38461538%, #000 15.38461539%, #000 76.92307692%, #fff 76.92307693%, #fff 92.30769230%, #E7E3E7 92.30769231% ), -ms-linear-gradient( left, transparent 0%, transparent 7.692307692%, #E7E3E7 7.692307693%, #E7E3E7 15.38461538%, #fff 15.38461539%, #fff 84.61538461%, #E7E3E7 84.61538462%, #E7E3E7 92.30769230%, transparent 92.30769231% ), -ms-linear-gradient( left, transparent 0%, transparent 30.76923076%, #210C00 30.76923077%, #210C00 76.92307692%, transparent 76.92307693% ), -ms-linear-gradient( left, transparent 0%, transparent 23.07692307%, #C64D00 23.07692308%, #C64D00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #C64D00 76.92307693%, #C64D00 84.61538461%, transparent 84.61538462% ), -ms-linear-gradient( left, transparent 0%, transparent 23.07692307%, #210C00 23.07692308%, #210C00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 61.53846153%, #001C63 61.53846154%, #001C63 69.23076923%, #FF6500 69.23076924%, #FF6500 76.92307692%, #210C00 76.92307693%, #210C00 84.61538461%, transparent 84.61538462% ), -ms-linear-gradient( left, transparent 0%, transparent 23.07692307%, #E7C3A5 23.07692308%, #E7C3A5 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #E7C3A5 76.92307693%, #E7C3A5 84.61538461%, transparent 84.61538462% ), -ms-linear-gradient( left, transparent 0%, transparent 30.76923076%, #FF6500 30.76923077%, #FF6500 76.92307692%, transparent 76.92307693% ), -ms-linear-gradient( left, transparent 0%, transparent 30.76923076%, #8C3800 30.76923077%, #8C3800 76.92307692%, transparent 76.92307693% ), -ms-linear-gradient( left, transparent 0%, transparent 30.76923076%, #fff 30.76923077%, #fff 46.15384615%, transparent 46.15384616%, transparent 61.53846153%, #fff 61.53846154%, #fff 76.92307692%, transparent 76.92307693% );
  background-image: linear-gradient( left, transparent 0%, transparent 15.384615384%, #fff 15.384615385%, #fff 84.615384615%, transparent 84.615384616% ), linear-gradient( left, transparent 0%, transparent 7.692307692%, #fff 7.692307693%, #fff 84.615384615%, #E7E3E7 84.615384616%, #E7E3E7 92.307692307%, transparent 92.307692307% ), linear-gradient( left, #fff 0%, #fff 15.384615384%, #000 15.384615385%, #000 76.923076923%, #fff 76.923076924%, #fff 92.307692306%, #E7E3E7 92.307692307% ), linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 23.07692307%, #CECBCE 23.07692308%, #CECBCE 53.84615384%, #000 53.84615385%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 15.38461538%, #CECBCE 15.38461539%, #CECBCE 23.07692307%, #000 23.07692308%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, #fff 0%, #fff 7.692307692%, #000 7.692307693%, #000 84.61538461%, #fff 84.61538462%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, #E7E3E7 0%, #E7E3E7 7.692307692%, #fff 7.692307693%, #fff 15.38461538%, #000 15.38461539%, #000 76.92307692%, #fff 76.92307693%, #fff 92.30769230%, #E7E3E7 92.30769231% ), linear-gradient( left, transparent 0%, transparent 7.692307692%, #E7E3E7 7.692307693%, #E7E3E7 15.38461538%, #fff 15.38461539%, #fff 84.61538461%, #E7E3E7 84.61538462%, #E7E3E7 92.30769230%, transparent 92.30769231% ), linear-gradient( left, transparent 0%, transparent 30.76923076%, #210C00 30.76923077%, #210C00 76.92307692%, transparent 76.92307693% ), linear-gradient( left, transparent 0%, transparent 23.07692307%, #C64D00 23.07692308%, #C64D00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #C64D00 76.92307693%, #C64D00 84.61538461%, transparent 84.61538462% ), linear-gradient( left, transparent 0%, transparent 23.07692307%, #210C00 23.07692308%, #210C00 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 61.53846153%, #001C63 61.53846154%, #001C63 69.23076923%, #FF6500 69.23076924%, #FF6500 76.92307692%, #210C00 76.92307693%, #210C00 84.61538461%, transparent 84.61538462% ), linear-gradient( left, transparent 0%, transparent 23.07692307%, #E7C3A5 23.07692308%, #E7C3A5 30.76923076%, #FF6500 30.76923077%, #FF6500 46.15384615%, #fff 46.15384616%, #fff 53.84615384%, #FF6500 53.84615385%, #FF6500 76.92307692%, #E7C3A5 76.92307693%, #E7C3A5 84.61538461%, transparent 84.61538462% ), linear-gradient( left, transparent 0%, transparent 30.76923076%, #FF6500 30.76923077%, #FF6500 76.92307692%, transparent 76.92307693% ), linear-gradient( left, transparent 0%, transparent 30.76923076%, #8C3800 30.76923077%, #8C3800 76.92307692%, transparent 76.92307693% ), linear-gradient( left, transparent 0%, transparent 30.76923076%, #fff 30.76923077%, #fff 46.15384615%, transparent 46.15384616%, transparent 61.53846153%, #fff 61.53846154%, #fff 76.92307692%, transparent 76.92307693% );
}
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  padding: 32px 0px;
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-left: 16px;
  padding-right: 16px;
  .text {    
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #8ebf42;
  }
  .text2 {    
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #8ebf42;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Farms: React.FC = () => {

  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const cakeOGPrice = usePriceCakeOGBusd()
  const atomPrice = usePriceATOMusd()
  const bnbPrice = usePriceBnbBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const ethPrice = usePriceEthusd()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  console.log("DOM loaded")
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
  const stackedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, 'apy', 'desc')
      case 'multiplier':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.multiplier.slice(0, -1)), 'desc')
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay): FarmWithStakedValue[] => {
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
        // cakePriceInQuote * cakeRewardPerYear / lpTotalInQuoteToken
        let apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apy = cakePriceVsBNB.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apy = ethPrice.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          apy = cakeRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE_OG) {
          apy = cakeOGPrice.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ATOM) {
          apy = atomPrice.times(cakeRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const cakeApy =
            farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }

        let liquidity = farm.lpTotalInQuoteToken

        if (!farm.lpTotalInQuoteToken) {
          liquidity = null
        }
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          liquidity = bnbPrice.times(farm.lpTotalInQuoteToken)
        }
        if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          liquidity = cakePrice.times(farm.lpTotalInQuoteToken)
        }
        if (farm.quoteTokenSymbol === QuoteToken.CAKE_OG) {
          liquidity = cakeOGPrice.times(farm.lpTotalInQuoteToken).times(bnbPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ETH_OG) {
          liquidity = cakeOGPrice.times(farm.lpTotalInQuoteToken).times(10000000)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ATOM) {
          liquidity = atomPrice.times(farm.lpTotalInQuoteToken)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          liquidity = ethPrice.times(farm.lpTotalInQuoteToken)
        }

        return { ...farm, apy, liquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
            return true
          }

          return false
        })
      }
      return farmsToDisplayWithAPY
    },
    [bnbPrice, farmsLP, query, cakePrice, ethPrice, cakeOGPrice, atomPrice],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const isActive = !pathname.includes('history')
  let farmsStaked = []
  if (isActive) {
    farmsStaked = stackedOnly ? farmsList(stackedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((farm) => {
    const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value:
          farm.apy &&
          farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        quoteTokenAdresses,
        quoteTokenSymbol,
        tokenAddresses,
        cakePrice,
        cakeOGPrice,
        ethPrice,
        atomPrice,
        originalValue: farm.apy,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bnbPrice={bnbPrice}
                cakePrice={cakePrice}
                cakeOGPrice={cakeOGPrice}
                ethPrice={ethPrice}
                atomPrice={atomPrice}
                account={account}
                removed={false}
              />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                bnbPrice={bnbPrice}
                cakePrice={cakePrice}
                cakeOGPrice={cakeOGPrice}
                ethPrice={ethPrice}
                atomPrice={atomPrice}
                account={account}
                removed
              />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header><div className="text">
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          {TranslateString(999, 'Farms')}
        </Heading></div><div className="text2">
        <Heading size="lg" color="text">
          {TranslateString(999, 'Stake Liquidity Pool (LP) tokens to earn rewards tokens on Binance Smart Chain with every block that is mined!')}
        </Heading></div>
      </Header>
      <Page> 
      <RocketContainer>       
        <div className="bg" />
        <div className="star-field">
        <div className="layer" />
        <div className="layer" />
        <div className="layer" />
        </div>
      <ControlContainer> 
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
              <div className="text3"><Text> {TranslateString(1116, 'Staked only')}</Text></div>
            </ToggleWrapper>
            <FarmTabButtons />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer></RocketContainer>
        {renderContent()}
        {/* <StyledImage src="/images/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
      </Page>
    </>
  )
}

export default Farms
