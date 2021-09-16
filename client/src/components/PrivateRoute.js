import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalContext } from '../context'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAdmin, isLoading, getAdmin } = useGlobalContext()

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAdmin ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
