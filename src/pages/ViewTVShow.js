import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { API_KEY } from '../constants';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import ContentsNoLink from '../components/ContentsNoLink/ContentsNoLink';
import Videos from '../components/Videos/Videos';
import Reviews from '../components/Reviews/Reviews';
import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';

function ViewTVShow() {
    const [error, setError] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        axios.get('tv/' + id + '?api_key=' + API_KEY + '&language=en-US').then(() => setError(false)).catch(() => setError(true))
    })
    if (error === false) {
        return (
            <div className="page">
                <Header />
                <Banner url={`tv/${id}?api_key=${API_KEY}&language=en-US`} singleContent contentType="tv" />
                <ContentsNoLink title="Seasons" url={`tv/${id}?api_key=${API_KEY}&language=en-US`} season largePoster />
                <Videos url={`tv/${id}/videos?api_key=${API_KEY}&language=en-US`} />
                <ContentsNoLink title="Cast" url={`tv/${id}/credits?api_key=${API_KEY}&language=en-US`} cast largePoster flexPoster />
                <ContentsNoLink title="Related Movies" url={`tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`} largePoster flexPoster />
                <Reviews contentUrl={`tv/${id}?api_key=${API_KEY}&language=en-US`} reviewUrl={`tv/${id}/reviews?api_key=${API_KEY}&language=en-US`} />
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

export default ViewTVShow
