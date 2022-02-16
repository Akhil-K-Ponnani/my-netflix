import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY } from '../constants'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import Contents from '../components/Contents/Contents'
import Footer from '../components/Footer/Footer'

function Movies() {
    const [genres, setGenres] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        axios.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`).then((response) => {
            setGenres(response.data.genres)
        })
    }, [])
    if (query !== '') {
        return (
            <div className='page'>
                <Header setQuery={setQuery} query={query} contentType='movie' />
                <Contents url={`search/movie?api_key=${API_KEY}&language=en-US`} query={query} contentType='movie' />
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div className="page">
                <Header setQuery={setQuery} query={query} contentType='movie' />
                <Banner url={`trending/movie/day?api_key=${API_KEY}&language=en-US`} />
                <Contents title="Trending" url={`trending/movie/day?api_key=${API_KEY}&language=en-US`} viewAllUrl='/movies/trending' contentType='movie' largePoster flexPoster />
                {
                    genres.map((genre, index) =>
                        <Contents title={genre.name} url={`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}`} viewAllUrl={`/movies/genres/${genre.id}`} contentType='movie' key={index} flexPoster />
                    )
                }
                <Footer />
            </div>
        )
    }
}

export default Movies
