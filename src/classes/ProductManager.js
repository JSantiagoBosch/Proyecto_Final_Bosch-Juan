import { productsModel } from "../models/products.model.js";

class ProductManager {

    async getProducts(limit = 10, page = 1, query = "", sort = "asc") {
        try {
            const options = {
                limit: limit ?? 10,
                page: page >= 1 ? page : 1,
                query: query ?? "",
                sort: { price: sort === "asc" ? 1 : -1 },
                lean: true
            };

            const filter = query ? { category: query } : {};

            let result;

            if (query) {
                result = await productsModel.paginate(filter, options);
            } else {
                result = await productsModel.paginate(filter, options);
            }

            result = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: (result.hasPrevPage ? "/?limit=" + limit + "&page=" + (result.page - 1) + "&sort=" + sort + "&query=" + query : null),
                nextLink: (result.hasNextPage ? "/?limit=" + limit + "&page=" + (result.page + 1) + "&sort=" + sort + "&query=" + query : null)
            };

            return result;
        } catch (error) {
            return {
                status: "error",
                payload: "Hubo un problema al obtener los productos",
                error: error.message
            };
        }
    }

    async getProductById(id) {

        let product = await productsModel.findOne({ _id: id }).lean();
        return product ? product : { "error": "No se encontro el Producto!" };
    }

    async addProduct(product) {

        const requiredFields = ['title', 'description', 'code', 'price', 'status', 'category', 'quantity'];

        for (let field of requiredFields) {
            if (!product[field]) {
                return {
                    status: 'error',
                    message: `El campo ${field} es obligatorio.`
                };
            }
        }

        try {
            const newProduct = await productsModel.create({ ...product });
            return { status: 'success', message: 'Producto creado exitosamente.', product: newProduct };
        } catch (error) {
            return {
                status: 'error',
                message: 'Error al agregar el producto.',
                error: error.message
            };
        }

    }

    async editProduct(id, product) {

        await productsModel.updateOne({ _id: id }, { ...product });
    }

    async deleteProduct(id) {

        await productsModel.deleteOne({ _id: id });
    }

}

export default ProductManager