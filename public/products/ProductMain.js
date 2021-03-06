const socket = io();


socket.on("newProduct", product => {
    $("#table").append(`
    <tr>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td><img style="width:50px;" src="${product.photo}" alt=""></td>
        <td><input style="width:100px;" name="quantity" type="number"></td>
        <td style="display:flex;justify-content: center;">
        <form action="/cart/addToCart" method="POST">
            <input type="hidden" name="name" value="${product.name}">
            <input type="hidden" name="price" value="${product.price}">
            <input type="hidden" name="description" value="${product.description}">
            <input type="hidden" name="photo" value="${product.photo}">
            <button style="margin: 0 10px;white-space: nowrap;width:106px" type="submit" class="btn btn-primary">
                Add to cart
            </button>
        </form>
              <button style="margin: 0 10px;white-space: nowrap;width:106px" type="submit" onclick="window.location.href='/products/update/${product.id}';" class="btn btn-success">Update</button>
            <form action="/products/${product.id}" method="POST">
              <button style="margin: 0 10px;white-space: nowrap;width:106px" type="submit" class="btn btn-danger">Delete</button>
             </form>
             </td>
          </tr>`)
})

socket.on("error", () => {
    alert("Hubo un error")
})

$("#form-product").submit(e => {
    e.preventDefault();
    createProduct()
})

function createProduct() {
    let product = {
        id: 0,
        name: $("#name")[0].value,
        price: $("#price")[0].value,
        category: $("#category")[0].value,
        photo: $("#photo")[0].value
    }
    socket.emit("newProduct", product);
}