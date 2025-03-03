import { Router } from "express";
import ProductManager from "../classes/ProductManager.js"

const viewsRouter = Router();
const PM = new ProductManager();


viewsRouter.get("/", async (req, res) => {
    
    const products = await PM.getProducts();
    res.render("home", { title: 'Jubilus', products});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    
    res.render("realtimeproducts");
});

export default viewsRouter