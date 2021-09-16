import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router'
import { useGlobalContext } from '../context'

const NewBlogForm = () => {
  const { addBlog, isAdmin, isLoading, doneLoading } = useGlobalContext()

  useEffect(() => {
    doneLoading()
  }, [])

  const history = useHistory()

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    category: '',
  })

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBlog({ ...blog, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addBlog(blog)
    history.push('/')
  }

  return (
    <div className='container'>
      <h2 className='mb-4'>Add New Blog</h2>
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-md-6'>
          <label className='form-label' htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='form-control'
            required
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
            required
            onChange={onChange}
          />
        </div>
        <div className='col-12'>
          <label className='form-label' htmlFor='content'>
            Content
          </label>
          <textarea
            className='form-control'
            name='content'
            id='content'
            value={blog.content}
            rows='4'
            required
            onChange={onChange}
          ></textarea>
        </div>
        <button className='btn btn-success' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
