import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import ProductManager from "./classes/ProductManager.js";
import mongoose from "mongoose";


const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log("Servidor activo: http://localhost:" + port);
})

const ioServer = new Server(httpServer);

const PM = new ProductManager();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

mongoose.connect("mongodb+srv://juansantibosch:Santi1234@cluster0.qxenf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


ioServer.on("connection", async socket => {
    console.log("Nuevo cliente conectado");
    const products = await PM.getProducts();
    
    socket.emit("realtimeproducts", products);

    socket.on("nuevoProducto", async data => {

        const product = {
            title: data.title, 
            description: data.description, 
            code: data.code, 
            price: data.price, 
            status: true,
            category: data.category, 
            thumbnails: [data.image], 
            quantity: data.quantity
        }
        
        await PM.addProduct(product);

        console.log("Se agrego un producto");

        const products = await PM.getProducts();

        socket.emit("realtimeproducts", products);
    })

    socket.on("eliminarProducto", async data => {
        
        await PM.deleteProduct(data);

        console.log("Se elimino un producto");
        
        socket.emit("realtimeproducts", await PM.getProducts());
    })

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

})