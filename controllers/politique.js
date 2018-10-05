const express = require('express');

const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const text = fs.readFileSync(`${__dirname}/../politique-confidentialite.txt`, 'utf8');
  console.log('Politique chargée');

  res.send(text);
});

module.exports = router;
