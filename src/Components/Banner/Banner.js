import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { API_KEY, IMAGE_URL } from '../../Constants/Constants'
import './Banner.css'

function Banner() {
    const [contents, setContents] = useState()
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=> {
            setContents(response.data.results[0])
        })
    }, [])
    return (
        <div>
            <div className="banner" style={{backgroundImage:`url(${contents && IMAGE_URL+contents.backdrop_path})`}}>
                <div className="content">
                    <h1 className="title">{contents && (contents.title || contents.name)}</h1>
                    <div className="buttons">
                        <button>Play</button>
                        <button>My List</button>
                    </div>
                    <h1 className="description">{contents && contents.overview}</h1>
                </div>
                <div className="fade-bottom"></div>
            </div>
        </div>
    )
}

export default Banner
