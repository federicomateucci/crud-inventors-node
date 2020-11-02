let express = require('express');
let router = express.Router();
let datainventors = require('../data/Inventor.js')



/* GET inventors listing. */
router.get('/', async function (req, res, next) {
    //res.send('Listado de inventores');
    const data = await datainventors.getAllInventors()
    res.json(data)
});


// GET one inventor
// inventor/54
router.get('/:id', async (req, res) => {


    res.json(await datainventors.getInventor(req.params.id));

});

//POST alta de un inventor

router.post('/', async (req, res) => {
    const inventor = req.body;
    await datainventors.createInventor(inventor)
    const inventorPersistido = await datainventors.getInventor(inventor.first)
    res.json(inventorPersistido)
});

//PUT modificacion de un inventor

router.put('/:id', (req, res) => {
    res.send(`Modificacion del inventor = ${req.params.id}`)

});

// DELETE elimina un inventor

router.delete('/:id', (req, res) => {
    res.send(`Elimina un inventor ${req.params.id}`)
});

module.exports = router;
