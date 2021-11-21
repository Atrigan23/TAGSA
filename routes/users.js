const express = require('express')

const router = express.Router()

const UsersController = require('../controllers/users') 

require('dotenv').config()

router.post('/', UsersController.createUser)

router.get('/:username', UsersController.getUser)



module.exports = router;
