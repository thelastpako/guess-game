const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://pakokap:vivavivala864@ds253284.mlab.com:53284/words_db';

const dbName = 'words_db';

var dbConnection = null;

function connectToDb() {
    if (dbConnection) return Promise.resolve(dbConnection);

    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, { useNewUrlParser: true },(err, client) => {
            if (err) return reject('Cannot connect to Mongo');
            dbConnection = client.db(dbName);
            resolve(dbConnection)
        });

    });
}


module.exports = {
    connectToDb
}