import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebaseAuth, firestore } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import axios from '../../axios'
import { API_KEY, IMG_THUMP_BASE_URL } from '../../constants'
import './Wishlist.css'
import defualtContentPoster from '../../assets/images/content-poster.jpg'

function Wishlist(props) {
    const [contents, setContents] = useState([])
    const [contentIndex, setContentIndex] = useState(0)
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                let docRef = doc(firestore, "wishlist", user.uid)
                getDoc(docRef).then((snapshot) => {
                    if (snapshot.data()) {
                        axios.get(snapshot.data().contents[contentIndex].type + '/' + snapshot.data().contents[contentIndex].id + '?api_key=' + API_KEY + '&language=en-US').then((response) => {
                            response.data.media_type = snapshot.data().contents[contentIndex].type
                            setContents([...contents, response.data])
                            if (contentIndex < snapshot.data().contents.length - 1)
                                setContentIndex(contentIndex + 1)
                        })
                    }
                })
            }
        })
    }, [contentIndex])
    return (
        <div className="container-fluid wishlist" style={{ marginTop: !props.title && '45px' }}>
            {contents.length > 0 ? <div className="row m-0">
                {
                    contents.map((content, index) =>
                        <Link to={`/${content.media_type === 'movie' ? 'movie' : 'tvshow'}/${content.id}`} className="col-6 col-md-2 mb-2 poster" key={index} style={{ textDecoration: 'none' }}>
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
            </div> : <div className="wishlist-empty">Wishlist is Empty<br /><Link to="/" className="btn btn-sm">Home</Link></div>}
        </div>
    )

}

export default Wishlist