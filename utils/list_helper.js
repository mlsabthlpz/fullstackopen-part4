const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const max = (a, b) => {
  return Math.max(a,b)
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const sum = (a, b) => { return a + b }
  return likes.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLocation = likes.indexOf(likes.reduce(max, 0))
  return blogs[maxLocation] ? blogs[maxLocation] : 'No blogs'
}

const mostBlogs = (blogs) => {
  if (blogs.length > 1) {
    const authorCounts = _.countBy(blogs.map(blog => blog.author))
    const numBlogs = Object.values(authorCounts)
    const maxValue = numBlogs.reduce(max, 0)
    const author = _.findKey(authorCounts, (blogCount) => blogCount === maxValue)

    return { author: author, blogs: maxValue }
  }
  else {
    return blogs[0] ? { author: blogs[0].author, blogs: 1 } : 'No blogs'
  }
}

const mostLikes = (blogs) => {
  const authors = Array.from(new Set(blogs.map(blog => blog.author)))
  const authorLikes = [] //authors.map(author => { return { author: author, likes: 0 } })
  authors.forEach(author => {
    const blogsByAuthor = blogs.filter(blog => blog.author === author)
    const likesForAuthor = totalLikes(blogsByAuthor)
    authorLikes.push( { author: author, likes: likesForAuthor } )
  })
  return favoriteBlog(authorLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}