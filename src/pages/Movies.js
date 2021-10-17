import axios from '../axios'
import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner/Banner'
import Contents from '../components/Contents/Contents'
import Header from '../components/Header/Header'
import { API_KEY } from '../constants'
import Footer from '../components/Footer/Footer'

function Movies() {
    useEffect(() => {
        axios.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response) => {
            setGenres(response.data.genres)
        })
    }, [])
    const [genres, setGenres] = useState([])
    return (
        <div className="page">
            <Header />
            <Banner url={`trending/movie/day?api_key=${API_KEY}&language=en-US`} />
            <Contents title="Trending" url={`trending/movie/day?api_key=${API_KEY}&language=en-US`} viewAllUrl='/movies/trending' largePoster flexPoster />
            {
                genres.map((genre, index) =>
                    <Contents title={genre.name} url={`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}`} viewAllUrl={`/movies/genres/${genre.id}`} key={index} flexPoster />
                )
            }
            <Footer />
        </div>
    )
}

export default Movies
