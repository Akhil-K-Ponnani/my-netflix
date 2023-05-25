import React, { useState } from 'react'
import { API_KEY } from '../constants';
import Header from '../components/Header/Header';
import Contents from '../components/Contents/Contents';
import Footer from '../components/Footer/Footer';

function ViewMoviesTrending() {
    const [query, setQuery] = useState('')
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
                <Contents url={`trending/movie/day?api_key=${API_KEY}&language=en-US`} contentType='movie' />
                <Footer />
            </div>
        )
    }
}

export default ViewMoviesTrending
