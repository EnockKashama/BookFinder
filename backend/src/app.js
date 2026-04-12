const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const booksRouter = require('./routes/books')
const listingsRouter = require('./routes/listings')
const usersRouter = require('./routes/users')

const app = express()

// Middleware
app.use(helmet())        // security headers
app.use(cors())          // allow mobile app requests
app.use(express.json())  // parse JSON request bodies

// Health check — your CI/CD pipeline will ping this
app.get(
    '/health',
    (req,
     res) => {res.json({status: 'ok', timestamp: new Date().toISOString()})})

// Routes
app.use('/api/books', booksRouter)
app.use('/api/listings', listingsRouter)
app.use('/api/users', usersRouter)

// 404 handler
app.use((req, res) => {res.status(404).json({error: 'Route not found'})})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

  module.exports = app