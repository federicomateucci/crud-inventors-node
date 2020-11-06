const mongoCliConnection = require('mongodb').MongoClient
const uriMyMongoDb = 'mongodb+srv://admin:tp2node@fedemongodbcloud.2bz8b.mongodb.net/ortnodetp2?retryWrites=true&w=majority'
const mongoClient = new mongoCliConnection(uriMyMongoDb, { useUnifiedTopology: true, useNewUrlParse: true })

async function getConnectionToMongoDb() {

    return await mongoClient.connect()
        .catch(err => console.log(err));
}

module.exports={
    getConnectionToMongoDb
}