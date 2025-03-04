import { Router } from "express";
import ProductManager from "../classes/ProductManager.js"
import CartManager from "../classes/CartManager.js";

const viewsRouter = Router();
const PM = new ProductManager();
const CM = new CartManager();


viewsRouter.get("/", async (req, res) => {

    const {limit, page, query, sort} = req.query;
    
    const products = await PM.getProducts(limit, page, query, sort);

    res.render("home", { 
        title: 'Jubilus', 
        products});
});

viewsRouter.get("/product/:pid", async (req, res) => {
    const {pid} = req.params;
    let product = await PM.getProductById(pid);

    res.render("product", {product});
})

viewsRouter.get("/cart/:cid", async (req, res) => {
    const {cid} = req.params;
    const cart = await CM.getCartById(cid);

    res.render("cart", {cart})
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    
    res.render("realtimeproducts");
});

export default viewsRouter