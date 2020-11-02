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

router.put('/:id', async (req, res) => {
    let inventor = req.body;
    inventor._id = req.params.id;
    await datainventors.updateInventor(inventor);

    res.json(await datainventors.getAllInventors(req.params.id));
});

// DELETE elimina un inventor

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    await datainventors.deleteInventor(id);
    res.send(`Se elimino el inventor con el id ${id} `)
});

module.exports = router;
