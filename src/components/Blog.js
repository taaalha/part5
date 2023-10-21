import { useState } from 'react'


const Blog = ({blog, onLike, onDelete, user}) => {
  console.log('blog is', blog)
  console.log('user is', user)
  const [showDetails, setShowDetails] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  const buttonStyle = {
    backgroundColor: isHovered ? '#87CEEB' : '',
    color: 'black',
    cursor: 'pointer',
    transition: 'background-color 0.3s' 
  }



  return (
  <div style={blogStyle} className='blog'> 
    {blog.title} <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button> <br />
    {showDetails && (
        <div>
          <div>{blog.url} <br /> </div>
          <div id="likes"> likes {blog.likes} <button onClick={onLike} className='likeButton'> like </button>  </div>
          {blog.author} <br />
          {blog.user.length >0 && blog.user[0].username === user.username && 
          <button 
          style={buttonStyle} 
          onClick={onDelete}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
            remove
          </button>}
          
        </div>
          )}
  </div>        
)

}
export default Blog