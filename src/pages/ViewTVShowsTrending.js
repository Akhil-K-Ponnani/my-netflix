import axios from '../axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header';
import { API_KEY } from '../constants';
import Contents from '../components/Contents/Contents';
import Footer from '../components/Footer/Footer';

function ViewTVShowsTrending() {
    useEffect(() => {
        axios.get(`trending/tv/day?api_key=${API_KEY}&language=en-US`).then((response) => {
            setTotalPages(response.data.total_pages)
        })
    }, [])
    const [totalPages, setTotalPages] = useState('')
    return (
        <div className="page">
            <Header />
            {
                (() => {
                    let totalContents = [];
                    for (let page = 1; page <= totalPages; page++) {
                        totalContents.push(<Contents url={`trending/tv/day?api_key=${API_KEY}&language=en-US&page=${page}`} />);
                    }
                    return <div>{totalContents}</div>;
                })()
            }
            <Footer />
        </div>
    )
}

export default ViewTVShowsTrending