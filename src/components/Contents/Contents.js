import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { IMG_THUMP_BASE_URL } from '../../constants'
import './Contents.css'
import defualtContentPoster from '../../assets/images/content-poster.jpg'

function Contents(props) {
    const [contents, setContents] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState()
    useEffect(() => {
        if (props.query !== query)
            setPage(1)
        axios.get(props.url + (props.query ? '&query=' + props.query : '') + '&page=' + page).then((response) => {
            if (props.query !== query) {
                setContents(response.data.results)
                setQuery(props.query)
            }
            else {
                setContents([...contents, ...response.data.results])
                console.log(props.url + (props.query ? '&query=' + props.query : '') + '&page=' + page);
                console.log(response.data.results);
                setTotalPages(response.data.total_pages)
            }
            if (!props.title && page < 2) {
                setPage(page + 1)
            }
        })
    }, [page, props.url, props.query])
    window.onscroll = () => {
        if (page < totalPages && window.innerHeight + window.scrollY === document.documentElement.offsetHeight) {
            setPage(page + 1)
        }
    }
    return (
        <div className="container-fluid content" style={{ marginTop: !props.title && '45px' }}>
            {(props.title && contents.length !== 0) && <div className="mt-1 title">
                <h4 className="text-white">{props.title}</h4>
                {props.viewAllUrl && <Link to={props.viewAllUrl} className="text-white ml-auto my-auto" style={{ textDecoration: 'none' }}>View All</Link>}
            </div>}
            <div className={`row m-0 ${props.flexPoster ? 'flex-poster' : ''}`}>
                {
                    contents.map((content, index) =>
                        <Link to={`/${props.contentType || (content.media_type === 'movie' ? 'movie' : 'tvshow')}/${content.id}`} className={`col-6 col-md-2 mb-2 ${props.largePoster ? 'large-poster' : 'poster'}`} key={index} style={{ textDecoration: 'none' }}>
                            <img src={(content.poster_path || content.profile_path) ? IMG_THUMP_BASE_URL + (content.poster_path || content.profile_path) : defualtContentPoster} alt={content && (content.title || content.name)} width="100%" />
                            <div className="mt-1 name">{content && (content.title || content.name)}</div>
                            <div className="content-stars text-center">
                                <div class="star-outer">
                                    <div class="star-inner" style={{ width: (content.vote_average / 10) * 100 + '%' }}></div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Contents