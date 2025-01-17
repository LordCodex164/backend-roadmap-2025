const { getDb } = require("../utils/db")
const { ObjectId } = require("mongodb")

class User {
   constructor(email, username) {
     this.email = email,
     this.username = username
   }

   save(){
     const db = getDb()
     return db.collection("users").insert(this)
     .then(result => {
       return result
     })
     .catch(err => {
      console.log(err)
     })
   }

   static findById(prodId){
    const sProdId = String(prodId)
    const db = getDb()
    return db.collection("users").findOne({_id: new ObjectId(sProdId)})
    .then(result => {
      return result
    })
    .catch(err => {
     console.log(err)
    })
   }
}

module.exports = User