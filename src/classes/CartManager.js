import fs from "fs/promises";
import { cartModel } from "../models/cart.model.js";

class CartManager {
    constructor() {
        // this.file = "carrito.json",
        //     this.carts = [],
        //     this.init();
    }

    // async init() {
    //     try {
    //         await fs.access(this.file);
    //     } catch (error) {
    //         await this.saveCarts();
    //     }
    // }


    async getCarts() {
        // try {
        //     const data = await fs.readFile(this.file, "utf-8");
        //     this.carts = JSON.parse(data);
        // } catch (error) {
        //     console.error("Error al leer el archivo", error);
        //     this.carts = [];
        // }

        return await cartModel.find().lean();
    }


    async getCartById(id) {
        // await this.getCarts();
        // const cart = this.carts.find(item => item.id == id);
        // return cart || null;

        return await cartModel.find({_id:id}).lean();
    }


    async createCart() {
        // await this.getCarts();
        // const newCart = { id: this.getId(), products: [] };
        // this.carts.push(newCart);
        // await this.saveCarts();
        // return newCart;

        await cartModel.create({products:[]})
    }

    async addCartProduct(cid, pid) {
        // await this.getCarts();
        // const cart = this.carts.find(item => item.id == cid);

        // if (!cart) {
        //     return { error: "Carrito no encontrado" };
        // }

        // const product = cart.products.find(item => item.product == pid)

        // if (product) {
        //     product.quantity += 1;
        // } else {
        //     cart.products.push({ product: pid, quantity: 1 });
        // }

        // await this.saveCarts();
        // return cart;

        const cart = await cartModel.findOne({_id:cid}).lean();

        const product = cart.products.find(item => item.product == pid);

        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cartModel.updateOne({_id:cid}, {products:cart.products})
    }

    // async saveCarts() {
    //     try {

    //         await fs.writeFile(this.file, JSON.stringify(this.carts, null, 2));

    //     } catch (error) {
    //         console.error("Error al escribir el archivo: ", error);

    //     }
    // }

    // getId() {
    //     return this.carts.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
    // }
}

export default CartManager