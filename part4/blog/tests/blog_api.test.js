const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    username: 'root',
    password: '123',
    name: 'Test User'
  }

  await api
    .post('/api/users')
    .send(newUser)

  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: '123'
    })

  token = response.body.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogObjects = helper.initialBlogs.map(blog => {
    const newBlog = new Blog(blog)
    newBlog.user = user._id
    return newBlog
  })

  const promiseArray = blogObjects.map(blog => blog.save())
  user.blogs.concat(promiseArray)
  await Promise.all(promiseArray.concat(user.save()))
})

test('returns blogs in json format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has the id property', async () => {
  const response = await api
    .get('/api/blogs/')

  expect(response.body[0].id).toBeDefined()
})

test('creates a new blog', async () => {
  const newBlog = {
    title: 'New blog test',
    author: 'Rui',
    url: 'http://newblog.test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('New blog test')
})

test('when likes property is missing it defaults to 0', async () => {
  const newBlog = {
    title: 'Likes missing test',
    author: 'Rui',
    url: 'http://newblog.test',
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('when title and url are missing, it responds with 400 Bad Request', async () => {
  const newBlog = {
    author: 'Rui',
    likes: 3
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400)
})

test('fails with 401 Unauthorized if no token is provided', async () => {
  const newBlog = {
    title: 'New blog test',
    author: 'Rui',
    url: 'http://newblog.test',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})