import { useState } from 'react'


const Blog = ({blog}) => {

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}> 
    {blog.title} <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button> <br />
    {showDetails && (
        <div>
          <div>{blog.url} <br /> </div>
          <div> likes {blog.likes} <button>like</button>  </div>
          {blog.author}
        </div>
          )}
  </div>  
)

}
export default Blog