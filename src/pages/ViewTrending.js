import React from 'react'
import { API_KEY } from '../constants';
import Header from '../components/Header/Header';
import Contents from '../components/Contents/Contents';
import Footer from '../components/Footer/Footer';

function ViewTrending() {
    return (
        <div className="page">
            <Header />
            <Contents url={`trending/all/day?api_key=${API_KEY}&language=en-US`} />
            <Footer />
        </div>
    )
}

export default ViewTrending
