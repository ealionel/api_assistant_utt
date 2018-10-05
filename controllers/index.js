const express = require('express');

const router = express.Router();

router.use('/ue', require('./ListUE.js'));
router.use('/politique', require('./politique'));

module.exports = router;
