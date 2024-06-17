function increaseQuantity(button) {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent, 10);
    quantity++;
    quantityElement.textContent = quantity;
    updateTotal();
}

function decreaseQuantity(button) {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent, 10);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotal();
    }
}

function updateTotal() {
    let subtotal = 0;
    const priceElements = document.querySelectorAll('.price');
    const quantityElements = document.querySelectorAll('.quantity-number');
    priceElements.forEach((priceElement, index) => {
        const price = parseFloat(priceElement.textContent.replace('R$', '').replace(',', '.'));
        const quantity = parseInt(quantityElements[index].textContent, 10);
        subtotal += price * quantity;
    });

    const impostos = subtotal * 0.1;
    const frete = 20;
    const total = subtotal + impostos + frete;

    document.querySelector('.summary-table td:nth-child(2)').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.querySelector('.summary-table tr:nth-child(2) td:nth-child(2)').textContent = `R$ ${impostos.toFixed(2).replace('.', ',')}`;
    document.querySelector('.summary-table tr:nth-child(3) td:nth-child(2)').textContent = `R$ ${frete.toFixed(2).replace('.', ',')}`;
    document.querySelector('.total-row td:nth-child(2)').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

document.addEventListener('DOMContentLoaded', updateTotal);
