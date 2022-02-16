import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { API_KEY } from '../constants'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import Contents from '../components/Contents/Contents'
import Footer from '../components/Footer/Footer'

function TVShows() {
    const [genres, setGenres] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        axios.get(`genre/tv/list?api_key=${API_KEY}&language=en-US`).then((response) => {
            setGenres(response.data.genres)
        })
    }, [])
    if (query !== '') {
        return (
            <div className='page'>
                <Header setQuery={setQuery} query={query} contentType='tvshow' />
                <Contents url={`search/tv?api_key=${API_KEY}&language=en-US`} query={query} contentType='tvshow' />
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div className="page">
                <Header setQuery={setQuery} query={query} contentType='tvshow' />
                <Banner url={`trending/tv/day?api_key=${API_KEY}&language=en-US`} />
                <Contents title="Trending" url={`trending/tv/day?api_key=${API_KEY}&language=en-US&with_networks=213`} viewAllUrl='/tvshows/trending' contentType='tvshow' largePoster flexPoster />
                {
                    genres.map((genre, index) =>
                        <Contents title={genre.name} url={`discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genre.id}&with_networks=213`} viewAllUrl={`/tvshows/genres/${genre.id}`} contentType='tvshow' key={index} flexPoster />
                    )
                }
                <Footer />
            </div>
        )
    }
}

export default TVShows