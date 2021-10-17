import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer>
            <div className="links">
                <Link to="/" className="link">Home</Link>
                <Link to="/movies" className="link">Movies</Link>
                <Link to="/tvshows" className="link">TV Shows</Link>
                <Link to="/about" className="link">About Us</Link>
                <a href="mailto:akhilkponnanivj45@gmail.com" className="link">Contact Us</a>
            </div>
            <span className="copyright">&copy; 2021 Copyright: &nbsp;</span>All rights reserved
        </footer>
    )
}

export default Footer
