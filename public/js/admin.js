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

const updateProduct = async (btn) => {
    const prodId = btn.parentNode.querySelector("[name=productId]").value;
    const crsf = btn.parentNode.querySelector("[name=_csrf").value;
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const imageUrl = document.getElementById("imageUrl").value
    const description = document.getElementById("description").value
    const response = await fetch(`/admin/edit-product/${prodId}`, {
        method: "PUT",
        headers: {
            "csrf-token": crsf,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
    })
    
    const data = await response.json()
    
}

const clickBtn = () => {
    console.log("button clicked")
}