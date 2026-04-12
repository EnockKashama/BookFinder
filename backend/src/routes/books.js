const express = require('express')
const router = express.Router()

// GET /api/books/lookup?isbn=9780735224292
router.get('/lookup', async (req, res) => {
  const {isbn, title} = req.query

  if (!isbn && !title) {
    return res.status(400).json({error: 'Provide isbn or title query param'})
  }

  const query = isbn ? `isbn:${isbn}` : title
  const url = `https://www.googleapis.com/books/v1/volumes?q=${
      encodeURIComponent(query)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({error: 'Book not found'})
    }

    const book = data.items[0].volumeInfo
    res.json({
      title: book.title,
      authors: book.authors || [],
      cover: book.imageLinks?.thumbnail || null,
      description: book.description || null,
      isbn: isbn || null,
    })
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch book data'})
  }
})

module.exports = router