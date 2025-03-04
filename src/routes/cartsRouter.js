import { Router } from "express";
import CartManager from "../classes/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.get("/", async (req, res) => {
    try {

        const carts = await CM.getCarts();
        res.json(carts);

    } catch (error) {
        res.status(500).json({error: "Error al obtener los carritos!"});
    }
});


cartsRouter.post("/", async (req, res) => {
    try {

        await CM.createCart();
        res.status(201).json({"estado":"OK", "mensaje":"El carrito se creó correctamente!"});

    } catch (error) {
        res.status(500).json({error: "Error al crear el carrito"});
    }
})


cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await CM.getCartById(cid);

        if(!cart) {
            return res.status(404).json({error: "Carrito no encontrado"});
        }

        res.send(cart);

    } catch (error) {
        res.status(500).json({error: "Error al obtener el carrito"});
    }
});


cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {

        const cid = req.params.cid;
        const pid = req.params.pid;

        await CM.addProductToCart(cid, pid);

        res.send({"estado":"OK", "mensaje":"Se agregó el Producto al Carrito!"});

    } catch (error) {
        res.status(500).send({error: "Error al agregar el Producto al Carrito!"});
    }
});

cartsRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body;    
    await CM.addProductsToCart(cid, products);
    res.send({"estado":"OK", "mensaje":"Se actualizó el Carrito!"});
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;    
    await CM.updateProductFromCart(cid, pid, quantity);
    res.send({"estado":"OK", "mensaje":"Se actualizó el Carrito!"});
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await CM.deleteProductFromCart(cid, pid);
    res.send({"estado":"OK", "mensaje":"Se eliminó el Producto del Carrito!"});
})

cartsRouter.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    await CM.deleteAllProductsFromCart(cid);
    res.send({"estado":"OK", "mensaje":"Se vacío el Carrito!"});
})

export default cartsRouter