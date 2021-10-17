import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Contents from '../components/Contents/Contents'
import Header from '../components/Header/Header'
import { API_KEY } from '../constants'
import Footer from '../components/Footer/Footer'

function ViewMoviesGenre() {
    const { id } = useParams()
    useEffect(() => {
        axios.get(`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}`).then((response) => {
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
                        totalContents.push(<Contents url={`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}&page=${page}`} />);
                    }
                    return <div>{totalContents}</div>;
                })()
            }
            <Footer />
        </div>
    )
}

export default ViewMoviesGenre
