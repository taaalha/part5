import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Togglable from './Togglable'


//Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.
test('clicking the create button calls event handler with correct details', async () => {
    const createBlog = jest.fn()

    const user = {
        username: 'testuser'
    }

    render(
        <Togglable buttonLabel="new note">
          <BlogForm createBlog={createBlog} />
        </Togglable>
    )


    const newNote = screen.getByText('new note')
    await userEvent.click(newNote)
    screen.debug()

    const title = screen.getByRole('textbox', { name: /title:/i })
    const author = screen.getByRole('textbox', { name: /author:/i })
    const url = screen.getByRole('textbox', { name: /url:/i })
    const createButton = screen.getByText('create')

    await userEvent.type(title, 'Test Title')
    await userEvent.type(author, 'Test Author')
    await userEvent.type(url, 'https://google.com')
    await userEvent.click(createButton)

    expect(createBlog).toHaveBeenCalledWith({
        title: 'Test Title',
        author: 'Test Author',
        url: 'https://google.com'
    })
    
})



