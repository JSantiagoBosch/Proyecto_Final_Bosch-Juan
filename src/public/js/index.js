const socket = io();

socket.on("realtimeproducts", data => {

    limpiarSelectEliminarProd();
    
    let containerHTML = "";

    data.payload.forEach(item => {
        containerHTML += `<div class="col-md-3">
            <div class="card">
                <img src="${item.thumbnails[0]}" alt="${item.title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Precio: $${item.price}</p>
                </div>
            </div>
        </div>`;

        agregarItemEliminarProd(item);
    });

    containerHTML += "</ul>";
    document.getElementById("content").innerHTML = containerHTML;
})

const agregarProducto = () => {
    
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const code = document.getElementById("code");
    const price = document.getElementById("price");
    const category = document.getElementById("category");
    const image = document.getElementById("image");
    const quantity = document.getElementById("quantity");

    const product = { title: title.value, description: description.value, code: code.value, price: price.value, category: category.value, image: image.value, quantity: quantity.value }

    socket.emit("nuevoProducto", product);

    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    category.value = "";
    image.value = "";
    quantity.value = "";

    document.getElementById("producto_estado1").innerHTML = `
    div class="alert alert-success" role="alert">
        El producto se agrego correctamente!
    </div>`;

}

const eliminarProducto = () => {
    const product_id = document.getElementById("product_id").value;

    socket.emit("eliminarProducto", product_id);

    limpiarSelectEliminarProd();

    document.getElementById("producto_estado2").innerHTML = `
    <div class="alert alert-success" role="alert">
        El producto se elimino correctamente!
    </div>`;

}

const limpiarSelectEliminarProd = () => {
    const productId = document.getElementById("product_id");
    productId.innerHTML = "";
}

const agregarItemEliminarProd = (item) => {

    const productId = document.getElementById("product_id");

    let option = document.createElement("option");
    option.value = item._id;
    option.innerHTML =  item.title;
    productId.appendChild(option);
}