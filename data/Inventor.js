

const fs = require('fs').promises

const PATH = __dirname + '/inventorsMOC.json'

/// METODOS QUE VIENEN CON PROMESAS Y ASYNCRONOS



async function readMocInventor() {
    return JSON.parse(await fs.readFile(PATH, 'utf-8'))

}

async function writeMocInventor(inventors) {
    await fs.writeFile(PATH, JSON.stringify(inventors, null, ' '))
}


async function getAllInventors() {
    return await readMocInventor();

}

async function getInventor(name) {
    let data = await readMocInventor()
    let inventor = data.inventors.find(inv => inv.first.toLowerCase() == name.toLowerCase())
    return inventor
}

async function createInventor(inventor) {
    const data = await getAllInventors();
    data.inventors.push(inventor);
    await writeMocInventor(data);

}

async function updateInventor(inventor) {
    let data = await getAllInventors();
    const indexInventor = data.inventors.findIndex(inv => inv._id == inventor._id);
    data.inventors[indexInventor]._id = inventor._id;
    data.inventors[indexInventor].first = inventor.first;
    data.inventors[indexInventor].last = inventor.last;
    data.inventors[indexInventor].year = inventor.year;
    data.inventors[indexInventor].img = inventor.img;

    await writeMocInventor(data);
}


async function deleteInventor(id) {
    let data = await getAllInventors();
    data.inventors.splice(data.inventors.findIndex(inv => inv._id == id), 1);
    await writeMocInventor(data);


}

module.exports = { getAllInventors, getInventor, createInventor, updateInventor, deleteInventor }
