import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { API_KEY } from '../constants';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import Videos from '../components/Videos/Videos';
import ContentsNoLink from '../components/ContentsNoLink/ContentsNoLink';
import Reviews from '../components/Reviews/Reviews';
import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';

function ViewMovie() {
    const [error, setError] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        axios.get('movie/' + id + '?api_key=' + API_KEY + '&language=en-US').then(() => setError(false)).catch(() => setError(true))
    })
    if (error === false) {
        return (
            <div className="page">
                <Header />
                <Banner url={`movie/${id}?api_key=${API_KEY}&language=en-US`} singleContent contentType="movie" />
                <Videos url={`movie/${id}/videos?api_key=${API_KEY}&language=en-US`} />
                <ContentsNoLink title="Cast" url={`movie/${id}/credits?api_key=${API_KEY}&language=en-US`} cast noLink largePoster flexPoster />
                <ContentsNoLink title="Related Movies" url={`movie/${id}/similar?api_key=${API_KEY}&language=en-US`} largePoster flexPoster />
                <Reviews contentUrl={`movie/${id}?api_key=${API_KEY}&language=en-US`} reviewUrl={`movie/${id}/reviews?api_key=${API_KEY}&language=en-US`} />
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div className="page">
                <Header />
                <Error />
                <Footer />
            </div>
        )
    }
}

export default ViewMovie
