
const quantity = document.querySelector('#quantity');
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id'),
    name: params.get('name'),
    price: params.get('price'),
    image: params.get('image')
  };
}

function displayProductDetail() {
  const product = getQueryParams();
  console.log("qua", quantity.value);
  if (product.name) {
    document.querySelector('.product-image img').src = product.image;
    document.querySelector('.product-image img').alt = product.name;
    document.querySelector('.product-info h1').textContent = product.name;
    document.querySelector('.price').textContent = `S/. ${parseFloat(product.price).toFixed(2)}`;
    document.querySelector('.add-to-cart').addEventListener('click', () => {
      product.id = parseInt(product.id);
      product.price = parseFloat(product.price.toString());
      product.quantity = parseInt(quantity.value);
      addToCart(product);
    });
    // Puedes añadir una descripción aquí si lo deseas
  }
}


window.onload = function () {
  loadCartFromLocalStorage();
  displayProductDetail();
  updateCart();
};