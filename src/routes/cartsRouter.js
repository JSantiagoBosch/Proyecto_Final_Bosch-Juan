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

        const newCart = await CM.createCart();
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

        res.json(cart);

    } catch (error) {
        res.status(500).json({error: "Error al obtener el carrito"});
    }
});


cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {

        const cid = req.params.cid;
        const pid = req.params.pid;

        await CM.addCartProduct(cid, pid);

        res.json({"estado":"OK", "mensaje":"Se agregó el Producto al Carrito!"});

    } catch (error) {
        res.status(500).json({error: "Error al agregar el Producto al Carrito!"});
    }
});

export default cartsRouter