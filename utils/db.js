// const mongoDb = require("mongodb")
// const MongoClient = mongoDb.MongoClient
// const ServerApiVersion = mongoDb.ServerApiVersion
const mongoose = require("mongoose")

const User = require("../models/user")

// let _db 

const url = process.env.MONGO_URL

// const client = new MongoClient(url, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

const mongoConnect = callBack => {
    mongoose.connect(url)
    .then(client => {
        User.findOne().then(user => {
            if(!user){
                User.create({
                    name: "test",
                    email: "test@gmail.com",
                    cart: []
                })
            }
        })
        console.log("connected")        
        callBack(client)
    })
    .catch(err => {
        callBack(err)
    })
}

// const getDb = () => {
//    if(_db) {
//     return _db
//    }
//    throw "No Database found"
// }

exports.mongoConnect = mongoConnect
// exports.getDb = getDb