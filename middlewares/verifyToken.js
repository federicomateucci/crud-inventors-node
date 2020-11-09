const jwt = require('jsonwebtoken');
const userFile = require('../data/user')

async function verifyingToken(req, res, next) {
    console.log(req.header.authorization);
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const tokenDecoded = jwt.verify(token, 'secret');
        const user = userFile.getUserById(tokenDecoded._id);

        console.log(user);
        next();
    } catch (err) {
        res.status(401).send(err.message)

    }


}

module.exports = {
    verifyingToken
}