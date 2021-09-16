import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useParams, withRouter } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const BlogUpdateForm = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: '',
    date: new Date().toString(),
  })
  const history = useHistory()
  const { _id } = useParams()
  const { blogs, isLoading, getBlogs, doneLoading } = useGlobalContext()

  const fillBlog = async () => {
    const res = await axios({
      method: 'GET',
      url: `/blog/${_id}`,
    })
    if (res.data.blog) {
      await setBlog(res.data.blog)
      doneLoading()
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    fillBlog()
  }, [])

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBlog({ ...blog, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios({
        method: 'PUT',
        url: `/blog/${_id}`,
        data: blog,
      })
      toast.success('Blog updated successfully')
      history.push('/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className='container'>
          <h1 className='mb-3'>Update Blog</h1>
          <form className='row g-3' onSubmit={handleSubmit}>
            <div className='col-md-6'>
              <label className='form-label' htmlFor='title'>
                Title
              </label>
              <input
                className='form-control'
                type='text'
                id='title'
                name='title'
                value={blog.title}
                onChange={onChange}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label' htmlFor='category'>
                Category
              </label>
              <input
                className='form-control'
                type='text'
                id='category'
                name='category'
                value={blog.category}
                onChange={onChange}
              />
            </div>
            <div className='col-12'>
              <label className='form-label' htmlFor='content'>
                Content
              </label>
              <textarea
                name='content'
                id='content'
                value={blog.content}
                cols='30'
                rows='10'
                onChange={onChange}
                className='form-control'
              ></textarea>
            </div>
            <button className='btn btn-success' type='submit'>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  )
}

export default withRouter(BlogUpdateForm)
