
import { cartModel } from "../models/cart.model.js";

class CartManager {

    async getCarts() {
        
        return await cartModel.find().lean().populate("products.product");
    }


    async getCartById(id) {

        try {
            const cart = await cartModel.findOne({ _id: id })
                .populate('products.product')
                .lean();
    
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            return cart;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener el carrito');
        }

        // return await cartModel.findOne({_id:id}).lean();
    }


    async createCart() {

        const newCart = await cartModel.create({products:[]});
        return newCart;
    }

    async addProductToCart(cid, pid) {

        let cart = await cartModel.findOne({_id:cid}).lean();

        let product = cart.products.find(item => item.product._id == pid);

        if (product) {
            product.quantity += 1;
        } else {
            product = { product: pid, quantity: 1 }
            cart.products.push(product);
        }

        await cartModel.updateOne({_id: cid}, {products: cart.products})

        return{status: 'success', message: 'Producto agregado al carrito'};
    }

    async addProductsToCart(cid, products) {
        let cart = await cartModel.findOne({_id:cid}).lean();

        if (!cart) {
            return {
                status: 'error',
                message: 'Carrito no encontrado.'
            };
        }
        
        products.forEach(item => {            
            let product = cart.products.find(item2 => item2.product == item.product);                    

            if (product) {
                product.quantity += item.quantity;                        
            } else {
                cart.products.push({product:item.product, quantity:item.quantity});
            }            
        });

        await cartModel.updateOne({_id: cid}, {products: cart.products});

        return { status: 'success', message: 'Productos agregados correctamente al carrito' };
    }


    async updateProductFromCart(cid, pid, quantity) {
        let cart = await cartModel.findOne({_id:cid}).lean();
        let product = cart.products.find(item => item.product._id == pid);        

        if (product) {
            product.quantity += quantity;
        } else {
            product = {product:pid, quantity:quantity};
            cart.products.push(product);
        }

        await cartModel.updateOne({_id:cid}, {products:cart.products});
    }
    

    async deleteProductFromCart(cid, pid) {
        let cart = await cartModel.findOne({_id:cid}).lean();
        let products = cart.products.filter(item => item.product != pid);
            
        await cartModel.updateOne({_id:cid}, {products:products});
    }

    async deleteAllProductsFromCart(cid) {            
        await cartModel.updateOne({_id:cid}, {products:[]});
    }

}

export default CartManager