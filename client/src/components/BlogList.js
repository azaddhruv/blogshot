import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
import Blog from './Blog'

const BlogList = () => {
  const { blogs, isLoading, getBlogs } = useGlobalContext()

  useEffect(() => {
    getBlogs()
  }, [])

  return !isLoading && blogs.length !== 0 ? (
    <main className='container-sm mt-5'>
      <div className='container disc mb-5'>
        <div className='disc-wrap'>
          <h3 className='mb-4'>Writer : Dhruv Kumar Azad</h3>
          <p>
            All of the blogs you see on this page is written by Dhruv, who
            created and manages this website
          </p>
          <p>For more details, visit about section</p>
        </div>
      </div>
      <section className='d-flex flex-column align-items-center'>
        {blogs.map((blog) => {
          const { _id } = blog
          return <Blog key={_id} {...blog} />
        })}
      </section>
    </main>
  ) : (
    <h1>Loading...</h1>
  )
}

export default BlogList
