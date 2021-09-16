const reducer = (state, action) => {
  if (action.type === 'GET_BLOGS') {
    return { ...state, isLoading: false, blogs: action.payload }
  }

  if (action.type === 'ADD_BLOG') {
    return { ...state, isLoading: false }
  }

  if (action.type === 'FIND_BLOG') {
    const tempBlog = state.blogs
    const found = tempBlog.find((el) => el._id === action.payload)
    console.log('found')
    return { ...state, current: found }
  }

  if (action.type === 'GET_ADMIN') {
    return { ...state, admin: action.payload, isAdmin: true }
  }

  if (action.type === 'ADMIN_LOGIN') {
    return { ...state, admin: action.payload, isAdmin: true, isLoading: false }
  }

  if (action.type === 'LOADING') {
    return { ...state, isLoading: false }
  }

  if (action.type === 'GET_ADMIN') {
    return { ...state, isAdmin: true, admin: action.payload }
  }

  if (action.type === 'DELETE_BLOG') {
    const tempBlog = state.blogs
    const newblogs = tempBlog.filter((blog) => blog._id !== action.payload)
    return { ...state, blogs: newblogs }
  }

  if (action.type === 'LOGOUT') {
    return { ...state, isAdmin: false, admin: null }
  }

  return { ...state }
}

export default reducer
