const mongoDb = require("mongodb")
const MongoClient = mongoDb.MongoClient
const ServerApiVersion = mongoDb.ServerApiVersion

let _db 

const url = process.env.MONGO_URL

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const mongoConnect = callBack => {
    client.connect(url)
    .then(client => {
        console.log("connected")
        _db = client.db("shop")
        callBack(client)
    })
    .catch(err => {
        callBack(err)
    })
}

const getDb = () => {
   if(_db) {
    return _db
   }
   throw "No Database found"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
