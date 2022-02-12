import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const results = await blogService.getAll()
      setBlogs(results)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })

      setNotification({
        type: 'success',
        message: 'Logged in successfully'
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({
        type: 'error',
        message: exception.response.data.error
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      const newBlog = { title, author, url }
      const savedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(savedBlog))

      setNotification({
        type: 'success',
        message: `A new blog "${title}" by ${author} added.`
      })
    } catch (exception) {
        setNotification({
          type: 'error',
          message: exception
        })
    }
  }

  const contentToShow = () => {
    if (user !== null) {
      return (
        <>
          <h2>Blogs</h2>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <h2>Create New</h2>
            <BlogForm onSubmit={handleCreateBlog} />
          </div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      )
    }

    return (
      <>
        <h2>Login</h2>
        <LoginForm onSubmit={handleLogin}/>
      </>
    )
  }

  return (
    <div>
      { notification !== null && <Notification notification={notification} />}
      {contentToShow()}
    </div>
  )
}

export default App