const express = require('express');

const router = express.Router();

router.use('/ue', require('./ListUE.js'));
router.use('/politique', require('./politique'));
router.use('/echo', require('./Echo'));
router.use('/auth', require('./Auth'));
router.use('/user', require('./Users'));

module.exports = router;
