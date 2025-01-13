const getDb = require("../utils/db").getDb

class Product {
    constructor(title, production, price, imageUrl){
      this.title = title,
      this.production = production,
      this.price = price,
      this.imageUrl = imageUrl
    }

    save(){
      const db = getDb()
      console.log("db", db)
      return db.collection("products").insertOne(this)
      .then(result => {
        console.log("product created")
        return result
      })
      .catch(err => {
        console.log(err)
      })
    }
}

exports.product = Product

