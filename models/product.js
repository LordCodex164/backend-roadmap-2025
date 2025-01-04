const db = require("../utils/db")

const getProductsFromFile = cb => {
    db.execute("SELECT * FROM products")
    .then(([rows, fieldData]) => {
        cb(rows)
    })
    .catch(err => {
        cb(err)
    })
}

module.exports = class Product {
    constructor(t, p, d, i) {
        this.title = t
        this.price = p,
        this.description = d,
        this.imageUrl = i
    }

    save() {
      return db.execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)", 
        [this.title, this.price, this.description, this.imageUrl]
      )
    }
    
    static fetchAll(cb) {
        getProductsFromFile(products => {
            cb(products)
        })
    }
}