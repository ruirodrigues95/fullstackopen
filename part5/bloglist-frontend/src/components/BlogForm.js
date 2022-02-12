import { useState } from "react"

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    props.onSubmit(title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="blog-title">Title</label>
        <input
          type="text"
          id="blog-title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="blog-author">Author</label>
        <input
          type="text"
          id="blog-author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="blog-url">Url</label>
        <input
          type="text"
          id="blog-url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  )
}

export default BlogForm