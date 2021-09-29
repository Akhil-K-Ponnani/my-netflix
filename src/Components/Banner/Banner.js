import React from 'react'
import './Banner.css'

function Banner() {
    return (
        <div>
            <div className="banner">
                <div className="content">
                    <h1 className="title">Movie Name</h1>
                    <div className="buttons">
                        <button>Play</button>
                        <button>My List</button>
                    </div>
                    <h1 className="description">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the</h1>
                </div>
                <div className="fade-bottom"></div>
            </div>
        </div>
    )
}

export default Banner
