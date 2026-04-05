const express = require('express')
const router = express.Router()

// Placeholder — full user routes coming in a later session
router.get('/', (req, res) => {res.json({message: 'users route working'})})

module.exports = router