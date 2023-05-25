import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import './Reviews.css'

function Reviews(props) {
  const [contents, setContents] = useState('')
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    axios.get(props.contentUrl + '&page=' + page).then((response) => {
      setContents(response.data)
    })
    axios.get(props.reviewUrl).then((response) => {
      setReviews([...reviews, ...response.data.results])
      setTotalPages(response.data.total_pages)
    })
  }, [page])
  window.onscroll = () => {
    if (page < totalPages && window.innerHeight + window.scrollY === document.documentElement.offsetHeight) {
      setPage(page + 1)
    }
  }
  return (
    <div className="container-fluid review">
      {(contents && reviews.length !== 0) && <h1 className="title">Rating & Reviews</h1>}
      {(contents && reviews.length !== 0) && <div className="mb-2 rating"><span>{Math.round(((contents.vote_average) / 2) * 10) / 10}</span> from {contents.vote_count} Ratings</div>}
      {
        reviews.map((review, index) =>
          <div className="mb-3" key={index}>
            {review.author_details.avatar_path && <img src={review.author_details.avatar_path.substring(1)} alt="" className="rounded-circle reviewer-img" />}
            <span className="reviewer-name">{review.author}</span>
            <div className="mt-1 review-content">{review.content}</div>
            <div className="reviewed-date mt-1">{new Date(review.updated_at).toDateString()}</div>
          </div>
        )
      }
    </div>
  )
}

export default Reviews