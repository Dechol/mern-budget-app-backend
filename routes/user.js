const express = require('express')
const router = express.Router()

//controllerfunctions
const { loginUser, signupUser } = require('../controllers/userController')

//routes
router.post('/login', loginUser )
router.post('/signup', signupUser)


module.exports = router