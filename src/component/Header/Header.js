import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { firebaseAuth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { FirebaseAuthContext } from '../../contexts'
import './Header.css'

function Header(props) {
    const { user, setUser } = useContext(FirebaseAuthContext)
    const history = useHistory()
    const handleClickSearchBtn = () => {
        document.getElementById("search-box-sm").classList.toggle("show")
    }
    const signout = () => {
        signOut(firebaseAuth).then(() => {
            setUser(undefined)
        })
    }
    return (
        <header>
            <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Icon" className="logo" /></Link>
            {props.contentType && <input type="search" name="search" value={props.query} placeholder={`Search ${props.contentType === 'movie' ? 'Movies' : 'TV Shows'}`} className="form-control search-box" style={{ right: user ? "145px" : "100px" }} onChange={(event) => props.setQuery(event.target.value)} />}
            {props.contentType && <i className='fal fa-search search-btn' style={{ right: user ? "140px" : "100px" }} onClick={handleClickSearchBtn}></i>}
            <div className="container-fluid search-sm-bg" id="search-box-sm">
                <input type="search" name="search" value={props.query} placeholder={`Search ${props.contentType === 'movie' ? 'Movies' : 'TV Shows'}`} className="form-control search-box-sm" onChange={(event) => props.setQuery(event.target.value)} />
            </div>
            {user && <Link to="/wishlist" className="fal fa-heart wishlist"></Link>}
            <button className="btn sign-btn" onClick={user ? signout : () => history.push("/signin")}>{user ? "SignOut" : "SignIn"}</button>
        </header>
    )
}

export default Header