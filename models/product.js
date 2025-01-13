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
      return db.collection("products").insertOne(this)
      .then(result => {
        return result
      })
      .catch(err => {
        console.log(err)
      })
    }
}

exports.product = Product

