const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector("[name=productId]").value;
    const crsf = btn.parentNode.querySelector("[name=_csrf").value;
    fetch(`/admin/product/${prodId}`, {
        method: "DELETE",
        headers: {
            "csrf-token": crsf
        }
    })
    .then(result => {
        let div = document.getElementById("product-item")
        div.parentNode.removeChild(div)
        console.log(1, result)
    })
    .catch(err => {
        console.log(1.1, err)
    })
}

const updateProduct = (btn) => {
    const prodId = btn.parentNode.querySelector("[name=productId]").value;
    const crsf = btn.parentNode.querySelector("[name=_csrf").value;
    const title = document.getElementById("title")
    const price = document.getElementById("price")
    const imageUrl = document.getElementById("imageUrl")
    const description = document.getElementById("description")
    fetch(`/admin/edit-product/${prodId}`, {
        method: "PUT",
        headers: {
            "csrf-token": crsf
        },
        body:{
            title,
            price,
            imageUrl,
            description
        }
    })
    .then(result => {
        return result.json()
    })
    .then(data => {
        
    })
    .catch(err => {
        console.log(1.1, err)
    })
}

const clickBtn = () => {
    console.log("button clicked")
}