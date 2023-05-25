import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

function Error() {
    return (
        <div className="error">
            <div className="error-content container m-0">
                <h1 className="title">404</h1>
                <div className="description">Page Not Found</div>
                <Link to="/" className="btn">Home</Link>
            </div>
        </div>
    )
}

export default Error