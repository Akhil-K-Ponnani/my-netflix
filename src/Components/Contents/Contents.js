import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Youtube from 'react-youtube'
import axios from '../../axios'
import { API_KEY, IMG_THUMP_BASE_URL } from '../../constants'
import './Contents.css'
import defualtContentPoster from '../../assets/images/content-poster.jpg'

function Contents(props) {
    const [contents, setContents] = useState([])
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
        axios.get(props.url).then((response) => {
            setContents(response.data.results)
        })
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const handleContent = (id) => {
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log(response.data);
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
            }
            else {
                console.log('Array Empty');
            }
        })
    }
    return (
        <div className="container-fluid content">
            {props.title && <div className="mt-1 title">
                <h4 className="text-white">{props.title}</h4>
                <Link to={props.viewAllUrl} className="text-white ml-auto my-auto" style={{ textDecoration: 'none' }}>View All</Link>
            </div>}
            <div className={`row m-0 ${props.flexPoster ? 'flex-poster' : ''}`}>
                {
                    contents.map((content, index) =>
                        <div className={`col-6 col-md-2 mb-2 ${props.largePoster ? 'large-poster' : 'poster'}`} key={index}>
                            <img src={content.poster_path ? IMG_THUMP_BASE_URL + content.poster_path : defualtContentPoster} alt={content && (content.title || content.name)} width="100%" />
                            <div className="mt-1 name">{content && (content.title || content.name)}</div>
                        </div>
                    )
                }
            </div>
            {urlId && <Youtube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default Contents