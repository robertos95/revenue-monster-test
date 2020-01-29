const express = require('express');

const apiController = require('../controllers/api');

router = express.Router();

router.get('/movies/:movieId', apiController.getMovie);

module.exports = router;