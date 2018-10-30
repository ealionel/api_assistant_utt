const express = require('express');

const router = express.Router();

router.use('/api/ue', require('./ListUE.js'));
router.use('/politique', require('./politique'));
router.use('/echo', require('./Echo'));
router.use('/api/auth', require('./Auth'));
router.use('/api/users', require('./Users'));

module.exports = router;
