import React, { useState, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
const AppContext = React.createContext()

const initialState = {
  blogs: [],
  isLoading: true,
  isError: false,
  isAdmin: false,
  admin: null,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //get blogs
  const getBlogs = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/blog',
      })
      if (res.data.blog) {
        dispatch({ type: 'GET_BLOGS', payload: res.data.blog })
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  //add blog
  const addBlog = async (blog) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/blog',
        data: blog,
      })
      if (res) {
      }
      toast.success('Blog Added successfully')
      dispatch({ type: 'ADD_BLOG' })
    } catch (err) {
      toast.error(err.message)
    }
  }

  //loading done
  const doneLoading = async () => {
    dispatch({ type: 'LOADING' })
  }

  //admin login
  const adminLogin = async (admin) => {
    toast.success(`${admin} logged in`)
    dispatch({ type: 'ADMIN_LOGIN', payload: admin })
  }

  //get current admin
  const getAdmin = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/blog/currentadmin',
      })
      if (res.data.admin) {
        return dispatch({ type: 'GET_ADMIN', payload: res.data.admin })
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  //delete blog
  const deleteBlog = async (id) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `/blog/${id}`,
      })
      toast.success('Blog Deleted successfully')
      dispatch({ type: 'DELETE_BLOG', payload: id })
    } catch (err) {
      toast.error(err.message)
    }
  }

  //logout
  const logout = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/blog/admin/logout',
      })
      dispatch({ type: 'LOGOUT' })
      toast.success('Logged out successfully')
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        getBlogs,
        addBlog,
        doneLoading,
        adminLogin,
        getAdmin,
        deleteBlog,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
