import React from 'react'
import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import Contents from '../components/Contents/Contents'
import { API_KEY } from '../constants'
import Footer from '../components/Footer/Footer'

function Home() {
    return (
        <div className="page">
            <Header />
            <Banner url={`trending/all/day?api_key=${API_KEY}&language=en-US`} />
            <Contents title="Netflix Originals" url={`discover/tv?api_key=${API_KEY}&with_networks=213`} viewAllUrl='/tvshows' largePoster flexPoster />
            <Contents title="Trending" url={`trending/all/day?api_key=${API_KEY}&language=en-US`} viewAllUrl='/trending' largePoster flexPoster />
            <Contents title="Netflix Movies" url={`discover/movie?api_key=${API_KEY}`} viewAllUrl='/movies' largePoster flexPoster />
            <Footer/>
        </div>
    )
}

export default Home