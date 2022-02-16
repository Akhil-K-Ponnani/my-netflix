import React, { useState } from 'react'
import { API_KEY } from '../constants';
import Header from '../components/Header/Header';
import Contents from '../components/Contents/Contents';
import Footer from '../components/Footer/Footer';

function ViewTVShowsTrending() {
    const [query, setQuery] = useState('')
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
                <Contents url={`trending/tv/day?api_key=${API_KEY}&language=en-US`} ContentType='tvshow' />
                <Footer />
            </div>
        )
    }
}

export default ViewTVShowsTrending