let currentProductId;
let currentProductTitle;
let currentProductPrice;

function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            currentProductId = product.id;
            currentProductTitle = product.title;
            currentProductPrice = product.price;

            document.getElementById('product-title').innerText = product.title;
            document.getElementById('product-price').innerText = `R$${product.price}`;

            let imagesHtml = `
                <div class="carousel-item active">
                    <img src="${product.image}" class="d-block w-100" alt="${product.title}">
                </div>
            `;
            document.querySelector('#product-images .carousel-inner').innerHTML = imagesHtml;

            let optionsHtml = `
                <div class="form-group">
                    <label for="size">Tamanho:</label>
                    <select id="size" class="form-control">
                        <option>P</option>
                        <option>M</option>
                        <option>G</option>
                        <option>GG</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="color">Cor:</label>
                    <select id="color" class="form-control">
                        <option>Preto</option>
                        <option>Branco</option>
                        <option>Azul</option>
                        <option>Vermelho</option>
                    </select>
                </div>
            `;
            document.getElementById('product-options').innerHTML = optionsHtml;
        })
        .catch(error => console.error('Erro ao carregar produto:', error));

    loadRelatedProducts();
}

function loadRelatedProducts() {
    fetch('https://fakestoreapi.com/products?limit=6')
        .then(res => res.json())
        .then(products => {
            let relatedProductsContainer = document.getElementById('related-products');
            products.forEach(product => {
                let productCard = `
                    <div class="col-md-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">R$${product.price}</p>
                                <a href="produto.html?id=${product.id}" class="btn btn-primary">Ver Produto</a>
                            </div>
                        </div>
                    </div>
                `;
                relatedProductsContainer.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Erro ao carregar produtos relacionados:', error));
}

function addToCart(productId, title, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ productId, title, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado à sacola!');
}