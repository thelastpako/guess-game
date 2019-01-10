const mongoService = require('./mongoService')

function query(){
    return mongoService.connectToDb()
    .then(db => {
        const collection = db.collection('words');
        return collection.find({}).toArray()
    })
}

module.exports = {
query
}
