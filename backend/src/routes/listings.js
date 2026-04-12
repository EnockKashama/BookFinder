const express = require('express')
const router = express.Router()
const db = require('../db')

// GET /api/listings?lat=-33.9249&lng=18.4241&radius=10
router.get('/', async (req, res) => {
  const {lat, lng, radius = 10} = req.query

  try {
    let query = db('book_listings')
                    .join('users', 'book_listings.seller_id', 'users.id')
                    .select(
                        'book_listings.*', 'users.display_name as seller_name',
                        'users.rating as seller_rating',
                        'users.phone_verified as seller_verified')
                    .where('book_listings.status', 'active')

    if (lat && lng) {
      query = query.whereRaw(
          `
        (6371 * acos(
          cos(radians(?)) * cos(radians(lat)) *
          cos(radians(lng) - radians(?)) +
          sin(radians(?)) * sin(radians(lat))
        )) < ?
      `,
          [lat, lng, lat, radius])
    }

    const listings = await query.orderBy('book_listings.created_at', 'desc')
    res.json(listings)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Failed to fetch listings'})
  }
})

// POST /api/listings
router.post('/', async (req, res) => {
  const {
    seller_id,
    isbn,
    title,
    author,
    cover_url,
    description,
    condition,
    price,
    area,
    lat,
    lng
  } = req.body

  if (!title || !condition || !price || !seller_id) {
    return res.status(400).json(
        {error: 'title, condition, price, seller_id required'})
  }

  try {
    const [listing] = await db('book_listings')
                          .insert({
                            seller_id,
                            isbn,
                            title,
                            author,
                            cover_url,
                            description,
                            condition,
                            price,
                            area,
                            lat,
                            lng
                          })
                          .returning('*')

    res.status(201).json(listing)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Failed to create listing'})
  }
})

module.exports = router