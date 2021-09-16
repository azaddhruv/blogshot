import React, { useEffect } from 'react'
import { AppProvider, useGlobalContext } from './context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import NewBlog from './pages/NewBlog'
import BlogUpdate from './pages/BlogUpdate'
import AdminLogin from './components/AdminLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <div className='content-container'>
        <ToastContainer />
        <Router>
          <AppProvider>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <PrivateRoute path='/newblog' component={NewBlog} />
              <PrivateRoute path='/blog/:_id/update' component={BlogUpdate} />
              <Route path='/login' component={AdminLogin} />
              <Route path='*' component={NotFound} />
            </Switch>
          </AppProvider>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
