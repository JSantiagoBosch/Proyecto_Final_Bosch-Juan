document.addEventListener('DOMContentLoaded', async function() {
    let cartId = sessionStorage.getItem('cartId');

    const addToCartButtons = document.querySelectorAll('.addToCartBtn');

    if (!cartId) {
        try {
            const response = await fetch('/api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al crear el carrito');
            }

            const data = await response.json();

            if (!data.cartId) {
                throw new Error('El ID del carrito no se encontro');
            }

            cartId = data.cartId;
            sessionStorage.setItem('cartId', cartId);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear el carrito');
            return;
        }
    }

    console.log('ID del carrito:', cartId);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(cartId, productId);
        });
    });

    async function addToCart(cartId, productId) {
        try {
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el producto al carrito');
            }

            alert('Producto agregado al carrito');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al agregar el producto al carrito');
        }
    }
});
