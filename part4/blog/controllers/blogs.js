const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: user._id
  });

  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)

  await user.save()

  response.status(201).json(newBlog)
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user

  // const userBlogs = user.blogs.map(blog => blog.toString())
  const hasBlog = user.blogs.find(blogId => blogId.toString() === id)

  if (!hasBlog) {
    return response.status(403).json({ error: 'no permission to delete '})
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true, runValidators: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter