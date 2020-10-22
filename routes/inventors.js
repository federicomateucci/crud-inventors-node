let express = require('express');
let router = express.Router();

/* GET inventors listing. */
router.get('/', function(req, res, next) {
  res.send('Listado de inventores');
});


// GET one inventor
// inventor/54
router.get('/:id',(req,res)=>{
    res.send(`obtiene el inventor = ${req.params.id}`);
});

//POST alta de un inventor

router.post('/',(req,res)=>{
    res.send(`Alta de inventor = ${req.params.id}`);
});

//PUT modificacion de un inventor

router.put('/:id',(req,res)=>{
    res.send(`Modificacion del inventor = ${req.params.id}`)

});

// DELETE elimina un inventor

router.delete('/:id',(req,res)=>{
    res.send(`Elimina un inventor ${req.params.id}`)
});

module.exports = router;
