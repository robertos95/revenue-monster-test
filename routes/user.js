const express = require('express');

const userController = require('../controllers/user');

router = express.Router();

router.get('/index', userController.getIndex);

router.get('/movies/:movieId', userController.getMovie);

module.exports = router;