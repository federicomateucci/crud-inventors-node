

const fs = require('fs').promises
const conectionMongoDb = require('./conectionMongoDb')
const mongoDb = require('./conectionMongoDb')

const PATH = __dirname + '/inventorsMOC.json'

/// METODOS QUE VIENEN CON PROMESAS Y ASYNCRONOS



async function readMocInventor() {
    return JSON.parse(await fs.readFile(PATH, 'utf-8'))

}

async function writeMocInventor(inventors) {
    await fs.writeFile(PATH, JSON.stringify(inventors, null, ' '))
}


async function getAllInventors() {
    const mongoConnection = await mongoDb.getConnectionToMongoDb()
    const allInventors = await mongoConnection.db('ortnodetp2').collection('inventors').find().toArray();
    return allInventors;

}

async function getInventor(id) {

    const mongoConnection = await mongoDb.getConnectionToMongoDb()

    const inventor = mongoConnection.db('ortnodetp2').collection('inventors').findOne({ "_id": parseInt(id) })


    return inventor
}

async function createInventor(inventor) {

    const mongoConnection = await mongoDb.getConnectionToMongoDb();
    const result = await mongoConnection.db('ortnodetp2').collection('inventors').insertOne(inventor);
    return result
}

async function updateInventor(inventor) {

    const mongoConnection = await mongoDb.getConnectionToMongoDb();
    const query = { _id: parseInt(inventor._id) };
    const newValues = {
        $set: {
            first: inventor.first,
            last: inventor.last,
            year: inventor.year,
            img: inventor.img
        }
    }

    let result = await mongoConnection.db('ortnodetp2').collection('inventors').updateOne(query, newValues);
    return result


}


async function deleteInventor(id) {
    try {

        const mongoConnection = await mongoDb.getConnectionToMongoDb();
        let result = await mongoConnection.db('ortnodetp2').collection('inventors').deleteOne({ _id: parseInt(id) })

        let data = await getAllInventors();
        console.log(data);
        return result;
    } catch (err) {
        throw new Error(err)
    }




}

module.exports = { getAllInventors, getInventor, createInventor, updateInventor, deleteInventor }
