import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const togglableRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      //blogService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  

    try {      
      const user = await loginService.login({        
        username, password,      
      })     
      window.localStorage.setItem(        
        'loggedBlogUser', JSON.stringify(user)      
      )
      blogService.setToken(user.token) 
      setUser(user)      
      setUsername('')      
      setPassword('')    
    } catch (exception) {      
      setErrorMessage(  {
      text: 'Wrong Username or Password',
      color: 'red',
      fontWeight: 'bold',
      fontSize: '16px',
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px'})      
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000)    
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    try{
      window.localStorage.removeItem(        
        'loggedBlogUser'     
      ) 
      setUser(null)
    }
    catch (exception) { 
      setErrorMessage('some error')
      setTimeout(() => {        
        setErrorMessage(null)      
      }, 5000) 
    }


  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    togglableRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(  {
        text: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        color: 'green',
        fontWeight: 'bold',
        fontSize: '16px',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px'})  
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (error){
      console.log("error in addBlog function")
      setErrorMessage('Error adding blog') 
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={togglableRef}>
      <form onSubmit={addBlog}>

        <div>
          title:
          <input
            value={title}
            name = "title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input 
            value={author}
            name = "Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          URL:
          <input 
            value={url}
            name = "URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

      <button type="submit">create</button>

      </form> 
    </Togglable> 
  )


  return (
    <div>
      <h2>blogs application</h2>

      <Notification message={errorMessage} />


    {user && <div>
       <p>{user.name} logged in</p>
       <button onClick={handleLogout}>logout</button>
       <h2>create new</h2>
       {blogForm()}
      </div>
    }
      <h2>Saved blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App