const express = require('express')
const { createTran, getTrans, getTran, deleteTran, updateTran } = require('../controllers/tranControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all tran routes
router.use(requireAuth)

//GET all transaction
router.get('/', getTrans)
//GET single transaction
router.get('/:id', getTran)
//POST new transaction
router.post('/', createTran)
//DELETE a transaction
router.delete('/:id', deleteTran)
//POST new transaction
router.patch('/:id', updateTran)

module.exports = router