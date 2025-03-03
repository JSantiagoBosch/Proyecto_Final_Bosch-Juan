import fs from "fs/promises"
import { productsModel } from "../models/products.model.js";

class ProductManager {
    constructor() {
        this.products = [],
        this.file = "productos.json";
        this.init();
    }

    async init() {
        try {
            await fs.access(this.file);

        } catch (error) {
            await fs.writeFile(this.file, JSON.stringify([]));
        }

        await this.loadProducts();
    }

    
    async getProducts() {
        
        return await productsModel.find().lean();
    }

    async getProductById(id) {
        

        const product = await productsModel.find({_id:id});
        return product || {"error" : "No se encontro el Producto!"};
    }
    
    async addProduct(product) {
        // await this.loadProducts();
        // const newProduct = {id:this.getId(), ...product};
        // this.products.push(newProduct);
        // await this.saveProducts();

        await productsModel.create({...product})
    }

    async editProduct(id, product) {
        // await this.loadProducts();
        // let actualProduct = this.products.find(item => item.id == id);

        // if(!actualProduct) {
        //     console.error(`Error: Producto con Id ${id} no encontrado`);
        //     return;
        // }

        // Object.assign(actualProduct, product);
        // await this.saveProducts();

        await productsModel.updateOne({_id:id}, {...product});
    }
    
    async deleteProduct(id) {

        // await this.loadProducts();
        // const index = this.products.findIndex(item => item.id == id);

        // if (index == -1) {
        //     console.error(`Error: Producto con Id ${id} no encontrado`);
        //     return;
        // }
        // this.products.splice(index, 1);
        // await this.saveProducts();

        await productsModel.deleteOne({_id:id});
    }

    // async saveProducts() {
    //     try {
    //         await fs.writeFile(this.file, JSON.stringify(this.products, null, 2));
    //     } catch (error) {
    //         console.error("Error al guardar productos:", error);
    //     }
    // }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.file, "utf-8");
            this.products = JSON.parse(data);
            
        } catch (error) {
            console.error("Error al cargar productos:", error);
            this.products = [];
        }
    }

    getId() {
        return this.products.length ? Math.max(...this.products.map(prod => prod.id)) + 1 : 1;
    }
}

export default ProductManager