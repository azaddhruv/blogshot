import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Blog = ({ title, content, category, date, _id }) => {
  const { deleteBlog, isAdmin } = useGlobalContext()
  return (
    <div className='card p-3 mb-4'>
      <div className='card-body'>
        <h2 className='card-title fw-bolder'>{title}</h2>
        <h4 className='card-subtitle mb-4 fw-bold'>Category : {category}</h4>
        <p className='content card-text'>{content}</p>
        <p className='date fw-bold'>Posted on {date}</p>
        {isAdmin && (
          <button
            className='btn btn-danger card-link'
            onClick={() => deleteBlog(_id)}
          >
            Delete
          </button>
        )}
        {isAdmin && (
          <Link
            className='btn btn-success card-link'
            to={`/blog/${_id}/update`}
          >
            Update
          </Link>
        )}
      </div>
    </div>
  )
}

export default Blog
