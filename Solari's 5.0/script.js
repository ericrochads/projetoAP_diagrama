// Carregar produtos da API
function loadProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            let productContainer = document.getElementById('products');
            products.forEach(product => {
                let productCard = `
                    <div class="card" style="width: 18rem;">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">R$${product.price}</p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Adicionar à Sacola</button>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

// Adicionar produtos ao carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, title, price) {
    const item = { productId, title, price, quantity: 1 };
    
    fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1, // Substitua pelo ID do usuário real
            date: new Date().toISOString().split('T')[0], // Data atual no formato AAAA-MM-DD
            products: [{ productId, quantity: 1 }]
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('Produto adicionado ao carrinho:', response);
        alert('Produto adicionado à sacola!');
        updateLocalCart(item);
    })
    .catch(error => console.error('Erro ao adicionar produto ao carrinho:', error));
}

function updateLocalCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(cartItem => cartItem.productId === item.productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}


// Exibir produtos no carrinho
function displayCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Sua sacola está vazia.</p>';
    } else {
        cart.forEach(item => {
            let cartItem = `
            <div class="col-md-4">
                <div class="product" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="product-name">${item.title}</h5>
                        <p class="price">Preço: R$${item.price}</p>
                        <p class="card-text">Quantidade: ${item.quantity}</p>
                        <button class="btn-Finalizar" onclick="removeFromCart(${item.productId})">Remover</button>
                    </div>
                </div>
            </div>    
            `;
            cartItems.innerHTML += cartItem;
        });
    }
}

// Remover produtos do carrinho

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    const updatedCartData = {
        userId: 1, // Substitua pelo ID do usuário real
        date: new Date().toISOString().split('T')[0], // Data atual no formato AAAA-MM-DD
        products: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))
    };

    fetch('https://fakestoreapi.com/carts/1', { // Substitua '1' pelo ID real do carrinho do usuário
        method: 'PUT',
        body: JSON.stringify(updatedCartData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('Produto removido do carrinho:', response);
        displayCart();
        location.reload();
    })
    .catch(error => console.error('Erro ao remover produto do carrinho:', error));
}

// Finalizar compra
function checkout() {
    const cartData = {
        userId: 1, // Substitua pelo ID do usuário real
        date: new Date().toISOString().split('T')[0], // Data atual no formato AAAA-MM-DD
        products: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))
    };

    fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        body: JSON.stringify(cartData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('Compra finalizada:', response);
        alert('Compra finalizada com sucesso!');
        cart = []; // Limpar carrinho após a compra
        localStorage.removeItem('cart'); // Remove carrinho do localStorage
        displayCart();
    })
    .catch(error => console.error('Erro ao finalizar compra:', error));
}

// Inicializar exibição do carrinho ao carregar a página
if (window.location.pathname.endsWith('sacola.html')) {
    displayCart();
}
