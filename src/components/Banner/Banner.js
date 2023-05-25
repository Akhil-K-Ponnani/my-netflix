import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { firebaseAuth, firestore } from '../../firebase'
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import axios from '../../axios'
import { API_KEY, IMG_BASE_URL } from '../../constants'
import './Banner.css'
import defualtBackdrop from '../../assets/images/content-backdrop.jpg'

function Banner(props) {
    const [contents, setContents] = useState()
    const [user, setUser] = useState(null)
    const [contentInWishlist, setContentInWishlist] = useState(false)
    const [wishlist, setWishlist] = useState(null)
    const history = useHistory()
    useEffect(() => {
        axios.get(props.url).then((response) => {
            if (props.singleContent) {
                setContents(response.data)
            }
            else {
                let randomContent = Math.floor(Math.random() * 5)
                axios.get(response.data.results[randomContent].media_type + '/' + response.data.results[randomContent].id + '?api_key=' + API_KEY + '&language=en-US').then((response) => {
                    setContents(response.data)
                })
            }
            firebaseAuth.onAuthStateChanged((user) => {
                setUser(user)
                if (user) {
                    let docRef = doc(firestore, "wishlist", user.uid)
                    getDoc(docRef).then((snapshot) => {
                        if (snapshot.data()) {
                            snapshot.data().contents.forEach((content) => {
                                if (content.id === response.data.id)
                                    setContentInWishlist(true)
                            })
                            setWishlist(snapshot.data())
                        }
                    })
                }
            })
        })
    }, [props.url, props.singleContent])
    const addToList = () => {
        let docRef = doc(firestore, "wishlist", user.uid)
        if (wishlist) {
            wishlist.contents.push({ type: props.contentType, id: contents.id })
            updateDoc(docRef, wishlist).then(() => {
                setContentInWishlist(true)
                setWishlist(wishlist)
            })
        }
        else {
            let wishlist = {
                uid: user.uid,
                mobile: user.phoneNumber,
                contents: [{ type: props.contentType, id: contents.id }]
            }
            setDoc(docRef, wishlist).then(() => {
                setContentInWishlist(true)
                setWishlist(wishlist)
            })
        }
    }
    const removeFromList = () => {
        let docRef = doc(firestore, "wishlist", user.uid)
        if (wishlist.contents.length === 1) {
            deleteDoc(docRef).then(() => {
                setContentInWishlist(false)
                setWishlist(null)
            })
        }
        else {
            for (let i = 0; i < wishlist.contents.length; i++) {
                if (wishlist.contents[i].id === contents.id)
                    wishlist.contents.splice(i, 1)
            }
            updateDoc(docRef, wishlist).then(() => {
                setContentInWishlist(false)
                setWishlist(wishlist)
            })
        }
    }
    if (contents) {
        return (
            <div className="banner mb-3">
                <div className="banner-main" style={{ backgroundImage: `url(${contents && (contents.backdrop_path ? IMG_BASE_URL + contents.backdrop_path : defualtBackdrop)})` }}>
                    <div className="fade-left"></div>
                    <div className="container-fluid content">
                        <h1 className="title">{contents && (contents.title || contents.name)}</h1>
                        {contents && <div className="banner-stars">
                            <div class="star-outer">
                                <div class="star-inner" style={{ width: (contents.vote_average / 10) * 100 + '%' }}></div>
                            </div>
                        </div>}
                        <button onClick={() => window.open(contents.homepage, '_blank')}>Play</button>
                        {props.singleContent ? (user ? <button onClick={contentInWishlist ? removeFromList : addToList}>{contentInWishlist ? 'Remove from List' : 'Add to List'}</button> : <button onClick={() => history.push('/signin')}>Add to List</button>) : <button onClick={() => history.push('/wishlist')}>My List</button>}
                        <p className="description">{contents && contents.overview}</p>
                    </div>
                    <div className="fade-bottom"></div>
                </div>
                <div className="container-fluid">
                    {props.singleContent && <div className="description-sm">{contents && contents.overview}</div>}
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default Banner
