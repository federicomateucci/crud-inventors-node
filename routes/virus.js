const express = require('express');

const router = express.Router();
let dataVirus = require('../data/virus.js')

// obtiene el total de infectados por pais//

router.get('/', async (req, res, next) => {
    console.log('LLego al router');
    res.json(await dataVirus.getTotals())
})

module.exports = router;