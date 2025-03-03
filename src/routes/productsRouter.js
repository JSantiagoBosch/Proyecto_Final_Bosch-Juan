import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", async (req, res) => {
    try {
        const products = await PM.getProducts();
        res.json(products)

    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await PM.getProductById(pid);
        res.json(product);

    } catch (error) {
        console.error("Error al obtener el producto", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const product = req.body;
        await PM.addProduct(product);
        res.status(201).json({ estado: "OK", mensaje: "Producto creado correctamente" });
    } catch (error) {
        console.error("Error al crear el producto", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const updatedProduct = req.body;
        await PM.editProduct(pid, updatedProduct);
        res.json({ estado: "OK", mensaje: "Producto actualizado correctamente" });

    } catch (error) {
        console.error("Error el editar el producto: ", error);
        res.status(500).json({ error: "Error al editar el producto" });
    }
});

productsRouter.delete("/:pid", async (req, res) => {

    try {
        const pid = req.params.pid;
        await PM.deleteProduct(pid);
        res.json({ estado: "OK", mensaje: "El producto se eliminó correctamente!" });

    } catch (error) {
        console.error("Error al elimiinar el producto", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

export default productsRouter