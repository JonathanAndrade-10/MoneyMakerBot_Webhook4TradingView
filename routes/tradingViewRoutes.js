const express = require('express');
const tradingViewController = require('./../controllers/tradingViewController');

const router = express.Router();

router.route('/').post(tradingViewController.createQueueItem);

module.exports = router;
