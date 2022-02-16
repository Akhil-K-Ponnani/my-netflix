import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../axios'
import { API_KEY } from '../constants'
import Header from '../components/Header/Header'
import Contents from '../components/Contents/Contents'
import Error from '../components/Error/Error'
import Footer from '../components/Footer/Footer'

function ViewMoviesGenre() {
    const { id } = useParams()
    const [query, setQuery] = useState('')
    const [error, setError] = useState(false)
    useEffect(() => {
        axios.get('discover/movie?api_key=' + API_KEY + '&language=en-US&with_genres=' + id).then((response) => {
            if (response.data.results.length > 0)
                setError(false)
            else
                setError(true)
        })
    })
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
        if (error === false) {
            return (
                <div className="page">
                    <Header setQuery={setQuery} query={query} contentType='movie' />
                    <Contents url={`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}`} contentType='movie' />
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div className="page">
                    <Header setQuery={setQuery} query={query} contentType='movie' />
                    <Error />
                    <Footer />
                </div>
            )
        }
    }
}

export default ViewMoviesGenre
