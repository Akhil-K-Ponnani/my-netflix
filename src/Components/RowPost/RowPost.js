import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import axios from '../../axios'
import { API_KEY, IMAGE_URL } from '../../Constants/Constants'
import './RowPost.css'

function RowPost(props) {
    const [contents, setContents] = useState([])
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
        axios.get(props.url).then((response)=> {
            console.log(response.data);
            setContents(response.data.results)
        })
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const handleContent = (id)=> {
          console.log(id);
          axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=> {
              console.log(response.data);
              if (response.data.results.length != 0) {
                  setUrlId(response.data.results[0])
              }
              else {
                  console.log('Array Empty');
              }
          })
      }
    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="posters">
                {
                    contents.map((content)=>
                    <img src={`${IMAGE_URL+content.poster_path}`} alt="Poster" className={props.isSmall ? "smallPoster" : "poster"} onClick={()=>handleContent(content.id)} />
                    )
                }
            </div>
            {urlId && <Youtube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default RowPost