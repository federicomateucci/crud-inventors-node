let express = require('express');
let router = express.Router();
let datainventors = require('../data/Inventor.js')



/* GET inventors listing. */
router.get('/', async function (req, res, next) {
    //res.send('Listado de inventores');
    const data = await datainventors.getAllInventors()
    if (data != null) {
        res.status(200).json(data)
    } else {
        res.send(404).send(`No hay datos para mostrar.`)
    }

});


// GET one inventor
// inventor/54
router.get('/:id', async (req, res) => {
    let inventorToShow = await datainventors.getInventor(req.params.id);
    if (inventorToShow != null) {
        res.json(inventorToShow)
    } else {
        res.status(404).send(`No se encuentra un inventor con este id = ${req.params.id}`)
    }



});

//POST alta de un inventor

router.post('/', async (req, res) => {
    const inventor = req.body;
    try {
        const result = await datainventors.createInventor(inventor)
        console.log(result);
        if (result.insertedCount == 1) {
            res.status(201).send(`Se agrego el inventor con id = ${inventor._id}`)
        } else {
            res.status(500).send(`Se produjo un error al intentar crear el inventor ${inventor.first}`)
        }
    } catch (err) {
        res.status(500).send(`Compruebe que el inventor no este ingresado${err}`);
    }
});

//PUT modificacion de un inventor

router.put('/:id', async (req, res) => {


    let inventor = await datainventors.getInventor(req.params.id)
    if (inventor != null) {
        let inventor = req.body;
        try {

            inventor._id = req.params.id;
            const result = await datainventors.updateInventor(inventor);
            if (result.modifiedCount === 1) {
                res.status(200).send(`El inventor con el id ${inventor._id} fue actualizado exitosamente`);
            } else {
                res.status(500).send("Se produjo un error al intentar actualizar el invetor con el id ingresado");
            }
            res.json(result);
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(404).send(`No existe ningun inventor bajo ese id ingresado, compruebe nuevamente y vuelva a intentarlo.`)
    }





});

// DELETE elimina un inventor

router.delete('/:id', async (req, res) => {

    const id = req.params.id;
    const inventor = await datainventors.getInventor(id);
    if (inventor != null) {
        try {
            const result = await datainventors.deleteInventor(id);
            if (result.deletedCount === 1) {
                res.status(200).send(`El inventor con el id ${id} fue removido exitosamente`);
            } else {
                res.status(500).send(`Se produjo un erro al intentar eliminar el inventor con el id ${id}`);
            }
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(404).send(`No es posible eliminar, ya que no se encuentra un inventor con el id ${id}`);

    }


});

module.exports = router;
