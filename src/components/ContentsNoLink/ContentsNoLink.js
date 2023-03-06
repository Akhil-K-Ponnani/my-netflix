import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { IMG_THUMP_BASE_URL } from '../../constants'
import './ContentsNoLink.css'
import defualtContentPoster from '../../assets/images/content-poster.jpg'

function ContentsNoLink(props) {
    const [contents, setContents] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [query, setQuery] = useState()
    useEffect(() => {
        if (props.query !== query)
            setPage(1)
        axios.get(props.url + (props.query ? '&query=' + props.query : '') + '&page=' + page).then((response) => {
            if (props.cast) {
                setContents(response.data.cast)
            }
            else if (props.season) {
                setContents(response.data.seasons)
            }
            else if (props.query !== query) {
                setContents(response.data.results)
                setQuery(props.query)
            }
            else {
                setContents([...contents, ...response.data.results])
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
        <div className="container-fluid content-no-link" style={{ marginTop: !props.title && '45px' }}>
            {(props.title && contents.length !== 0) && <div className="mt-1 title">
                <h4 className="text-white">{props.title}</h4>
            </div>}
            <div className={`row m-0 ${props.flexPoster ? 'flex-poster' : ''}`}>
                {
                    contents.map((content, index) =>
                        <div key={index} className={`col-6 col-md-2 mb-2 ${props.largePoster ? 'large-poster' : 'poster'}`} key={index} style={{ textDecoration: 'none' }}>
                            <img src={(content.poster_path || content.profile_path) ? IMG_THUMP_BASE_URL + (content.poster_path || content.profile_path) : defualtContentPoster} alt={content && (content.title || content.name)} width="100%" />
                            <div className="mt-1 name">{content && (content.title || content.name)}</div>
                            {content.vote_average && <div className="content-stars text-center">
                                <div class="star-outer">
                                    <div class="star-inner" style={{ width: (content.vote_average / 10) * 100 + '%' }}></div>
                                </div>
                            </div>}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ContentsNoLink