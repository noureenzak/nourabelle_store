// -------------------- CART INITIALIZATION --------------------
let cart = [];

// Load cart from sessionStorage
if (sessionStorage.getItem('cart')) {
  cart = JSON.parse(sessionStorage.getItem('cart'));
}

function saveCart() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = cart.length;
    cartCountEl.style.display = cart.length > 0 ? 'inline-block' : 'none';

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.style.color = cart.length > 0 ? 'var(--btn)' : 'inherit';
    }
  }
}

// -------------------- ADD TO CART FUNCTION --------------------
function addToCart(productId, productName, productPrice, productImage, selectedSize) {
  const item = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice),
    image: productImage,
    size: selectedSize
  };

  cart.push(item);
  saveCart();
  updateCartCount();
  showMiniCartPreview();
  alert(`${productName} (Size: ${selectedSize}) added to cart!`);
}

// -------------------- MINI CART PREVIEW --------------------
function showMiniCartPreview() {
  const previewContainer = document.getElementById("mini-cart-preview");
  if (!previewContainer) return;

  previewContainer.innerHTML = "";
  let subtotal = 0;
  const deliveryFee = 50;

  cart.forEach(item => {
    subtotal += item.price;
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("mini-cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50">
      <div>
        <p>${item.name} (Size: ${item.size})</p>
        <p>${item.price} EGP</p>
      </div>
    `;
    previewContainer.appendChild(itemDiv);
  });

  const total = subtotal + deliveryFee;
  const totalsDiv = document.createElement("div");
  totalsDiv.classList.add("mini-cart-totals");
  totalsDiv.innerHTML = `
    <p>Subtotal: ${subtotal.toFixed(2)} EGP</p>
    <p>Delivery: ${deliveryFee} EGP</p>
    <p><strong>Total: ${total.toFixed(2)} EGP</strong></p>
    <a href="cart.html" class="buy-now-button">Proceed Now</a>
  `;
  previewContainer.appendChild(totalsDiv);
  previewContainer.style.display = "block";
}


// -------------------- Return Policy Modal Logic --------------------
document.addEventListener('click', function (e) {
  const modal = document.getElementById('policy-modal');
  const showBtn = document.getElementById('show-policy');
  const closeBtn = document.querySelector('.close-modal');

  if (showBtn && e.target === showBtn) {
    e.preventDefault();
    modal.style.display = 'flex';
  }

  if (closeBtn && e.target === closeBtn) {
    modal.style.display = 'none';
  }

  if (modal && e.target === modal) {
    modal.style.display = 'none';
  }
});

// -------------------- Final Checkout Button Logic --------------------
const finalCheckoutBtn = document.querySelector('.pay-now-btn');
if (finalCheckoutBtn) {
  finalCheckoutBtn.addEventListener('click', () => {
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked')?.value || "cash";
    alert(`Thank you! Your order with ${selectedPayment} payment was placed.`);
    cart = [];
    saveCart();
    updateCartCount();
    window.location.href = "index.html";
  });
}

// -------------------- CART PAGE RENDERING --------------------
function renderCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const emptyCart = document.getElementById("empty-cart");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-box">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h3>${item.name}</h3>
          </div>
          <div class="cart-item-right">
            <button class="remove-btn" data-index="${index}">×</button>
            <p class="cart-item-size">Size: ${item.size}</p>
            <p class="cart-item-price">${item.price} EGP</p>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("total").textContent = (subtotal + 50).toFixed(2);
  cartSummary.style.display = "block";
  emptyCart.style.display = "none";

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCartPage();
      if (document.getElementById("mini-cart-preview")) {
        showMiniCartPreview();
      }
    });
  });
}

// -------------------- SHIPPING CONFIG --------------------
const shippingCosts = {
  cairo: 50,
  alexandria: 60,
  giza: 55,
  other: 80
};

// -------------------- ADVANCED CART RENDERING (Optional) --------------------
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const emptyCart = document.getElementById('empty-cart');

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  }

  emptyCart.style.display = 'none';
  cartSummary.style.display = 'block';

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item-box">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
        </div>
        <div class="cart-item-right">
          <button class="remove-btn" data-index="${index}">×</button>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-price">${item.price} EGP</p>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  const shippingSelect = document.getElementById('shipping-city');
  const selectedCity = shippingSelect?.value || 'other';
  const shippingCost = shippingCosts[selectedCity] || 80;

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('shipping').textContent = shippingCost.toFixed(2);
  document.getElementById('total').textContent = (subtotal + shippingCost).toFixed(2);

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCart();
    });
  });

  document.getElementById('shipping-city')?.addEventListener('change', () => {
    renderCart();
  });

  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    const shippingCity = document.getElementById('shipping-city').value;

    if (!shippingCity) {
      alert('Please select your city for shipping');
      return;
    }

    sessionStorage.setItem('checkoutInfo', JSON.stringify({
      paymentMethod,
      shippingCity,
      shippingCost: shippingCosts[shippingCity]
    }));

    window.location.href = 'checkout.html';
  });
}

// -------------------- FINAL SETUP --------------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById("cart-items")) {
    renderCart(); // or use renderCartPage();
  }
});
