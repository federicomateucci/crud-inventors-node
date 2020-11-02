let express = require('express');
let router = express.Router();

/* GET home page. */






router.get('/', function (req, res, next) {
  res.render('index', { title: 'Taller programacion 2', otracosaString: 'soy un string' })
  res.send('Hola');

});


module.exports = router;
