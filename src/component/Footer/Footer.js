import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseAuthContext } from '../../contexts'
import './Footer.css'

function Footer() {
    const { user } = useContext(FirebaseAuthContext)
    return (
        <footer>
            <div className="links">
                <Link to="/" className="link">Home</Link>
                <Link to="/movies" className="link">Movies</Link>
                <Link to="/tvshows" className="link">TV Shows</Link>
                <Link to={user ? "/wishlist" : "/signin"} className="link">{user ? "Wishlist" : "SignIn"}</Link>
                <a href="mailto:akhilkponnanivj45@gmail.com" className="link">Contact Us</a>
            </div>
            <span className="copyright">&copy; 2021 Copyright: &nbsp;</span>All rights reserved
        </footer>
    )
}

export default Footer
