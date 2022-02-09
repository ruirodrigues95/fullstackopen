let _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes
  const result = blogs.reduce(reducer, 0)

  return result
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const max = Math.max(...blogs.map(blog => blog.likes))
  const blog = blogs.find(blog => blog.likes === max)

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const results = _.countBy(blogs, 'author')
  const maxKey = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b)

  return {
    author: maxKey,
    blogs: results[maxKey]
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {}
  }

  const results = _.groupBy(blogs, 'author')
  const maxKey = Object.keys(results).reduce((a, b) => _.sumBy(results[a], 'likes') > _.sumBy(results[b], 'likes') ? a : b)
  const sum = _.sumBy(results[maxKey], 'likes')

  return {
    author: maxKey,
    likes: sum
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}