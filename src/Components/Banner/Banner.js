import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { IMG_BASE_URL } from '../../constants'
import './Banner.css'
import defualtBackdrop from '../../assets/images/content-backdrop.jpg'

function Banner(props) {
    const [contents, setContents] = useState()
    useEffect(() => {
        axios.get(props.url).then((response) => {
            let randomContent = Math.floor(Math.random() * 5)
            setContents(response.data.results[randomContent])
        })
    }, [])
    return (
        <div className="banner mb-4" style={{ backgroundImage: `url(${contents && (contents.backdrop_path ? IMG_BASE_URL + contents.backdrop_path : defualtBackdrop)})` }}>
            <div className="fade-left"></div>
            <div className="container-fluid content">
                <h1 className="title">{contents && (contents.title || contents.name)}</h1>
                <button>Play</button>
                <button>My List</button>
                <p className="description">{contents && contents.overview}</p>
            </div>
            <div className="fade-bottom"></div>
        </div>
    )
}

export default Banner
