
const connection = require('./conectionMongoDb');
const encriptador = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken')


async function getAllUsers() {
    const connectionMongoDb = await connection.getConnectionToMongoDb();
    const users = await connectionMongoDb.db('ortnodetp2').collection('users').find().toArray();
    return users
}

async function getUserById(id) {
    const connectionMongoDb = await connection.getConnectionToMongoDb();
    id = new ObjectId(id)
    const userById = await connectionMongoDb.db('ortnodetp2').collection('users').findOne({ _id: id });
    return userById
}
async function findByEmail(email) {
    const connectionMongoDb = await connection.getConnectionToMongoDb();
    const result = await connectionMongoDb.db('ortnodetp2').collection('users').findOne({ email: email });
    return result;
}

async function createUser(user) {
    const connectionMongoDb = await connection.getConnectionToMongoDb();

    if (!user.hasOwnProperty("username") || !user.hasOwnProperty("email") || !user.hasOwnProperty("password"))
        throw "Campos faltantes";
    user.password = await encryptPassword(user.password);
    const result = await connectionMongoDb.db('ortnodetp2').collection('users').insertOne(user);
    return result;
}
async function confirmLoginUserPass(email, pass) {
    const connectionMongoDb = await connection.getConnectionToMongoDb();
    const userFinded = await findByEmail(email)
    if (!userFinded) {
        throw new Error('Error al loguearse..')
    }

    const isMatch = await encriptador.compare(pass, userFinded.password) // compara la password ingresad con la guardada DesHasheada
    if (!isMatch) {
        throw new Error('Error al loguearse..')
    }
    return userFinded;
}

async function encryptPassword(pass) {
    const salt = await encriptador.genSalt(8);
    const passEncrypted = await encriptador.hash(pass, salt)
    return passEncrypted;

}
async function generateToken(user) {
    const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' })
    return token;


}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    confirmLoginUserPass,
    findByEmail,
    generateToken
}