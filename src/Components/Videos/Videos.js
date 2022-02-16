import React, { useEffect, useState } from 'react';
import axios from '../../axios'
import Youtube from 'react-youtube'
import './Videos.css'

function Videos(props) {
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState()
    useEffect(() => {
        axios.get(props.url).then((response) => {
            setVideos(response.data.results.reverse())

        })
    })
    const opts = {
        playerVars: {
            autoplay: 1,
        }
    };
    return (
        <div className="container-fluid video">
            {(videos.length !== 0) && <h4 className="text-white">Videos</h4>}
            <div className="row m-0">
                {
                    videos.map((video, index) =>
                        <div className="col-md-3 poster" key={index}>
                            <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt="" width="100%" />
                            <i class="fal fa-play-circle play-btn" data-toggle="modal" data-target="#play-video" onClick={() => setSelectedVideo(video)}></i>
                            <div className="mt-1 name">{video.name}</div>
                        </div>
                    )
                }
            </div>
            <div class="modal fade" id="play-video" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <Youtube videoId={selectedVideo && selectedVideo.key} opts={opts} className="play-video" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos
