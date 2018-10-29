const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const reqTotal = [req.headers].concat([req.body]);
    console.log('GET REQUEST :')
    console.log(JSON.stringify(reqTotal, null, 2));  
    console.log(JSON.stringify(req.query, null, 2));
    res.json(reqTotal);
})

.post('/', (req,res) => {
    const reqTotal = [req.headers].concat([req.body]);
    console.log('POST REQUEST :');
    console.log(JSON.stringify(reqTotal, null, 2));  
    console.log(JSON.stringify(req.query, null, 2));
    res.json(reqTotal);
});

module.exports = router;