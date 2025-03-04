import { Router } from "express";
import ProductManager from "../classes/ProductManager.js"

const viewsRouter = Router();
const PM = new ProductManager();


viewsRouter.get("/", async (req, res) => {

    const {limit, page, query, sort} = req.query;
    
    const products = await PM.getProducts(limit, page, query, sort);

    res.render("home", { title: 'Jubilus', products:products});
});

viewsRouter.get("/product/:pid", async (req, res) => {
    const {pid} = req.params;
    let product = await PM.getProductById(pid);

    res.render("product", {product:product});
})

viewsRouter.get("/cart/:cid", async (req, res) => {
    const {cid} = req.params;
    const cart = await PM.getCart(cid);

    res.render("products", {products})
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    
    res.render("realtimeproducts");
});

export default viewsRouter