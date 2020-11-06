let express = require('express');
let router = express.Router();
let virusStats = require('../data/virus')


/* GET home page. */



//console.log( temp);


router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Taller programacion 2 ORT - TP2', otracosaString: 'API DE INVENTORES'})


});


module.exports = router;
