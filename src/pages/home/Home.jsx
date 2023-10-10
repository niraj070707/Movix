import React from 'react'
import "./style.scss"
import Popular from './popular/Popular'
import Trending from './trending/Trending'
import TopRated from './topRated/TopRated'
import HeroBanner from './heroBanner/herobanner'

const Home = () => {
  return (
    <div id='homePage'>
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home