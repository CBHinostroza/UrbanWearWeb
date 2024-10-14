const cartBtn = document.getElementById("cart-btn");
const modal = document.getElementById("cartModal");
const closeModal = document.querySelector(".close");
const cartTableBody = document.querySelector(".cart-container tbody");
const cartSummary = document.querySelector(".cart-summary");
const cartBadge = document.querySelector('.badge');
const loginBtn = document.querySelector('a[href="#login"]');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.querySelector('.close-login');
const loginForm = document.getElementById('loginForm');
let loggedIn = false;

let cartItems = [];

const products = [
  {
    id: 1,
    name: "Camisa",
    price: 90,
    image: "images/camisaVerde.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 2,
    name: "Aviadora Cuero",
    price: 250,
    image: "images/casacaCuero.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 3,
    name: "Jacket Bass",
    price: 230,
    image: "images/casacaCueroMarron.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 7,
    name: "Pant Calvin Klein",
    price: 130,
    image: "images/jeanCargo.png",
    featured: true,
    specialOffer: false,
  },
  {
    id: 8,
    name: "Rare Duck Active",
    price: 119,
    image: "images/poleraRoja.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 9,
    name: "Crewneck Tultex",
    price: 119,
    image: "images/poleraVerde.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 10,
    name: "Hoddie The Beatles",
    price: 130,
    image: "images/polerabeatles.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 11,
    name: "Hoddie Motorcycle",
    price: 120,
    image: "images/poleraPloma.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 12,
    name: "Therman Wabe Zone",
    price: 90,
    image: "images/poloMangaLarga.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 13,
    name: "T-Shirt Vintage",
    price: 60,
    image: "images/poloNegro.png",
    featured: true,
    specialOffer: false,
  },
  {
    id: 14,
    name: "T-Shirt Quaihollow",
    price: 65,
    image: "images/poloRojo.png",
    featured: false,
    specialOffer: false,
  },
  {
    id: 15,
    name: "Cap Dekalb",
    price: 34,
    image: "images/gorro.png",
    featured: true,
    specialOffer: false,
  },
  {
    id: 16,
    name: "Pack Vintage",
    price: 750,
    image: "images/estilo2.png",
    featured: false,
    specialOffer: true,
  },
  {
    id: 17,
    name: "Pach Stewer",
    price: 670,
    image: "images/estilo1.png",
    featured: false,
    specialOffer: true,
  },
  {
    id: 18,
    name: "Pack Facherito",
    price: 780,
    image: "images/estilo3.png",
    featured: false,
    specialOffer: true,
  },
];

function displayProducts() {
  const productContainer = document.querySelector(".products");
  const featuredContainer = document.querySelector(".featured-products");
  const offersContainer = document.querySelector(".offers");

  products.forEach((product) => {
    const productHtml = `
            <div class="product-item">
              <img src="${product.image}" alt="${product.name}" />
              <h3>${product.name}</h3>
              <p>S/. ${product.price.toFixed(2)}</p>
              <div class="product-footer" >
                <button class="btn" onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}, image: '${product.image}', quantity: 1 })">
                  <i class="fas fa-shopping-cart"></i>
                </button> 
                <button class="btn btn-primary" onclick="openProductDetail(${product.id})">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>`;

    if (productContainer != null) {
      productContainer.appendChild(createElementFromHTML(productHtml));
    }

    if (featuredContainer != null && product.featured) {
      featuredContainer.appendChild(createElementFromHTML(productHtml));
    }

    if (offersContainer != null && product.specialOffer) {
      offersContainer.appendChild(createElementFromHTML(productHtml));
    }
  });
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

window.onload = function () {
  loadCartFromLocalStorage();
  displayProducts();
  updateCart();
};

cartBtn.onclick = function () {
  modal.style.display = "block";
  updateCart();
};

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
};

function addToCart(product) {
  // Mostrar el mensaje de notificación
  const notification = document.getElementById("notification");
  notification.style.display = "block";

  // Ocultar el mensaje después de 2 segundos
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);

  const existingProduct = cartItems.find((item) => item.id === product.id);
  if (existingProduct) {
    if(product.quantity){
      existingProduct.quantity += product.quantity;
    }else{
      existingProduct.quantity++;
    }
    
  } else {
    cartItems.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCart();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCart();
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cartItems");
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
  }
}

function updateCart() {
  cartTableBody.innerHTML = "";
  let subtotal = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="product-image"><img style="height:40px;" src="${
        item.image
      }" alt="${item.name}" /></td>
      <td class="product-name">${item.name}</td>
      <td><input style="max-width:50px" type="number" value="${
        item.quantity
      }" min="1" onchange="updateQuantity(${item.id}, this.value)" /></td>
      <td>S/. ${item.price.toFixed(2)}</td>
      <td>S/. ${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-secondary" onclick="removeFromCart(${
          item.id
        })">Eliminar</button>
        <button class="btn" onclick="openProductDetail(${
          item.id
        })">Detalles</button>
      </td>
    `;
    cartTableBody.appendChild(row);
    subtotal += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  if (cartItems.length > 0) {
    cartBadge.style.display = 'block';
    cartBadge.textContent = cartItems.length;
  } else {
    cartBadge.style.display = 'none';
  }

  const shipping = 20;
  const total = subtotal + shipping;

  cartSummary.innerHTML = `
    <h3>Resumen del Pedido</h3>
    <div class="summary-item"><span>Subtotal: </span><span>S/. ${subtotal.toFixed(
      2
    )}</span></div>
    <div class="summary-item"><span>Envío: </span><span>S/. ${shipping.toFixed(
      2
    )}</span></div>
    <div class="summary-item"><strong>Total: </strong><strong>S/. ${total.toFixed(
      2
    )}</strong></div>
        <div style="display:flex;justify-content: space-between;">
        <button class="btn">Proceder al Pago</button>
        <button class="btn btn-secondary" onclick="modal.style.display='none'">Seguir Comprando</button>
        </div>
  `;
}

function openProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const params = new URLSearchParams({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // window.open('detalleproducto.html?' + params.toString());
    //localStorage.setItem('cartItems', JSON.stringify(product));
    window.location.href = "detalleproducto.html?" + params.toString();
  }
}

function updateQuantity(productId, quantity) {
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    product.quantity = parseInt(quantity);
    updateCart();
  }
}

// loginForm.onsubmit = function (e) {
//   e.preventDefault();

//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   if (username === "ADMIN" && password === "ADMIN") {
//     loggedIn = true;
//     loginModal.style.display = "none";
//     loginBtn.innerHTML = '<i class="fas fa-user"></i> ADMIN';
//     loginBtn.href = "javascript:void(0);";
//   } else {
//     alert('Credenciales incorrectas');
//   }
// }

// function logout() {
//   loggedIn = false;
//   loginBtn.innerHTML = 'Iniciar Sesión';
//   loginBtn.href = "#login";
//   loginBtn.onclick = null;
// }

// loginBtn.onclick = function () {
//   loginModal.style.display = "block";
// }

// closeLoginModal.onclick = function () {
//   loginModal.style.display = "none";
// } 

document.querySelector('a[href="#login"]').addEventListener('click', function () {
  document.getElementById('loginModal').style.display = 'block';
});

// Cerrar modal de inicio de sesión
document.querySelector('.close-login').addEventListener('click', function () {
  document.getElementById('loginModal').style.display = 'none';
});

// Validar credenciales de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'ADMIN' && password === 'ADMIN') {
      // Guardar el usuario en localStorage
      localStorage.setItem('user', username);

      // Cambiar el texto de "Iniciar Sesión" por el nombre de usuario
      actualizarInterfazUsuario(username);

      // Cerrar el modal
      document.getElementById('loginModal').style.display = 'none';
  } else {
      alert('Credenciales incorrectas');
  }
});

// Función para actualizar la interfaz al iniciar sesión
function actualizarInterfazUsuario(username) {
  const nav = document.querySelector('nav ul');
  const loginItem = document.querySelector('a[href="#login"]').parentElement;

  // Crear ícono de usuario con el nombre
  loginItem.innerHTML = `
  <a href="#" id="user-icon">
      <i class="fas fa-user"></i> ${username}
  </a>
  <ul class="user-menu" style="display: none;">
      <li>
          <a id="logout" style="position: absolute; background-color: #dc3545; color: white; padding: 5px 10px; border-radius: 5px; z-index: 1000;cursor:pointer">
              logout
          </a>
      </li>
  </ul>
`;

  // Mostrar el menú al hacer clic en el ícono de usuario
  document.getElementById('user-icon').addEventListener('click', function () {
      const userMenu = document.querySelector('.user-menu');
      userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
  });

  // Manejar el cierre de sesión
  document.getElementById('logout').addEventListener('click', function () {
      localStorage.removeItem('user');
      //restaurarInterfazLogin();
      location.reload();
  });
}

// Función para restaurar la interfaz al cerrar sesión
function restaurarInterfazLogin() {
  const loginItem = document.querySelector('a[href="#login"]').parentElement;

  loginItem.innerHTML = '<a href="#login">Iniciar Sesión</a>';

  // Volver a asignar el evento para abrir el modal
  document.querySelector('a[href="#login"]').addEventListener('click', function () {
      document.getElementById('loginModal').style.display = 'block';
  });
}

// Verificar si hay un usuario guardado en localStorage al cargar la página
window.addEventListener('load', function () {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
      actualizarInterfazUsuario(savedUser);
  }
});

