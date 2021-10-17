import axios from '../axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import Contents from '../components/Contents/Contents'
import { API_KEY } from '../constants'
import Footer from '../components/Footer/Footer'

function TVShows() {
    useEffect(() => {
        axios.get(`genre/tv/list?api_key=${API_KEY}&language=en-US`).then((response) => {
            setGenres(response.data.genres)
        })
    }, [])
    const [genres, setGenres] = useState([])
    return (
        <div className="page">
            <Header />
            <Banner url={`trending/tv/day?api_key=${API_KEY}&language=en-US&with_networks=213`} />
            <Contents title="Trending" url={`trending/tv/day?api_key=${API_KEY}&language=en-US&with_networks=213`} viewAllUrl='/tvshows/trending' largePoster flexPoster />
            {
                genres.map((genre, index) =>
                    <Contents title={genre.name} url={`discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}&with_networks=213`} viewAllUrl={`/tvshows/genres/${genre.id}`} key={index} flexPoster />
                )
            }
            <Footer />
        </div>
    )
}

export default TVShows