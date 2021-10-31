import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'

const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
  background-repeat: no-repeat;
  background-position: left top, right top;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 136px;
  text-align: center;
  h1 {  	
    -webkit-text-stroke-width: 1.2px;
    -webkit-text-stroke-color: #8ebf42;
  }
  h2 {  	
    -webkit-text-stroke-width: .4px;
    -webkit-text-stroke-color: #8ebf42;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
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

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page><RocketContainer>
    <div className="bg" />
        <div className="star-field">
        <div className="layer" />
        <div className="layer" />
        <div className="layer" />
        </div>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
        <img src="/images/156x25.svg" alt="SYRUP POOL icon" width={100} height={100} />
        {TranslateString(576, 'Interswap')}
        </Heading>
        <Text as="h2">{TranslateString(578, 'Welcome to Interswap! Automated Market Maker (AMM), and Yield Farm on Binance Smart Chain, and beyond!')}</Text>
      </Hero>
      <div><div> </div>
        <CTACards>
          <EarnAssetCard />
          <div />
          <EarnAPYCard />
          {/* <WinCard /> */}
        </CTACards>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
        <Cards>
          <FarmStakingCard />
          <EarnAPYCard />
          {/* <LotteryCard /> */}
        </Cards>
      </div>
    </RocketContainer>
    </Page>
  )
}


export default Home
