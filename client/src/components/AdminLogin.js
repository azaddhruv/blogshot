import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const AdminLogin = () => {
  const { adminLogin } = useGlobalContext()
  const history = useHistory()
  const [user, setUser] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios({
        method: 'POST',
        url: '/blog/admin/login',
        data: user,
      })
      if (result.data.admin) {
        setUser({ username: '', password: '' })
        history.push('/')
        adminLogin(result.data.admin)
      }
    } catch (e) {
      toast.error('Admin Not Found')
      setUser({ username: '', password: '' })
    }
  }

  return (
    <form
      className='form d-flex flex-column align-items-center'
      onSubmit={handleSubmit}
    >
      <div className='my-3'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input
          className='form-control'
          type='username'
          id='username'
          name='username'
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          className='form-control'
          type='password'
          id='password'
          name='password'
          value={user.password}
          onChange={handleChange}
        />
      </div>
      <button type='submit' className='btn btn-success'>
        Submit
      </button>
    </form>
  )
}

export default AdminLogin
