const express = require('express');
const router = express.Router();

router.use('/ue', require('./ListUE.js'));

module.exports = router;
