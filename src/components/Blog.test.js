import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

//Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.
test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://reacttestinglibrary.com/docs/example-input-event',
    likes: 0
  }
    const component = render(
        <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).not.toHaveTextContent(
        'Test Author'
    )
    expect(component.container).not.toHaveTextContent(
        'https://reacttestinglibrary.com/docs/example-input-event'
    )
    expect(component.container).not.toHaveTextContent(
        'likes'
    )
})

//Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
test('clicking the button shows url and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'https://reacttestinglibrary.com/docs/example-input-event',
        likes: 0,
        user: [{username: 'testuser'}]
    }
    
    const user = {
        username: 'TestUser'
    }
    
   render(
        <Blog blog={blog} user={user} />
    )

    const button = screen.getByText('view')
    userEvent.click(button)

    const hideButton = await screen.findByText('hide')
    expect(hideButton).toBeInTheDocument()

    expect(screen.getByText('Test Author')).toBeDefined()
    expect(screen.getByText('https://reacttestinglibrary.com/docs/example-input-event')).toBeDefined()
    expect(screen.getByText(/likes/)).toBeDefined()
})

//Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'https://reacttestinglibrary.com/docs/example-input-event',
        likes: 0,
        user: [{username: 'testuser'}]
    }

    const user = {
        username: 'testuser'
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={user} onLike={mockHandler} />
    )

    const button = screen.getByText('view')
    await userEvent.click(button)

    const likeButton = await screen.findByText('like')
    expect(likeButton).toBeInTheDocument()
    screen.debug()

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)
    screen.debug()

    expect(mockHandler.mock.calls).toHaveLength(2)
})

    