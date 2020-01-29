const express = require('express');

const adminController = require('../controllers/admin');

router = express.Router();

router.put('/movie/:movieId', adminController.putMovie);

module.exports = router;