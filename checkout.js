// checkout.js

// -------------------- Update Cart Count in Navbar --------------------
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return;

  let cart = [];
  if (sessionStorage.getItem('cart')) {
    cart = JSON.parse(sessionStorage.getItem('cart'));
  }

  cartCountEl.textContent = cart.length;
  cartCountEl.style.display = cart.length > 0 ? 'inline-block' : 'none';

  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.style.color = cart.length > 0 ? 'var(--btn)' : 'inherit';
  }
}

// -------------------- Populate Summary Prices --------------------
function updateCheckoutSummary() {
  const subtotalSpan = document.getElementById("checkout-subtotal");
  const shippingSpan = document.getElementById("checkout-shipping");
  const totalSpan = document.getElementById("checkout-total");

  const storedSubtotal = sessionStorage.getItem("nourabelle_subtotal") || 0;
  const storedShipping = sessionStorage.getItem("nourabelle_shipping") || 0;
  const total = parseFloat(storedSubtotal) + parseFloat(storedShipping);

  subtotalSpan.textContent = parseFloat(storedSubtotal).toFixed(2);
  shippingSpan.textContent = parseFloat(storedShipping).toFixed(2);
  totalSpan.textContent = total.toFixed(2);
}

// -------------------- Handle "Other" City Field --------------------
function setupOtherCityInput() {
  const citySelect = document.getElementById("city");
  const otherCityGroup = document.getElementById("other-city-group");
  const otherCityInput = document.getElementById("other-city");

  if (!citySelect || !otherCityGroup || !otherCityInput) return;

  citySelect.addEventListener("change", () => {
    if (citySelect.value === "other") {
      otherCityGroup.style.display = "block";
      otherCityInput.required = true;
    } else {
      otherCityGroup.style.display = "none";
      otherCityInput.required = false;
    }
  });
}

// -------------------- Handle Form Submission --------------------
function setupFormSubmit() {
  const form = document.querySelector(".checkout-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optionally: validate fields, send to backend, etc.

    // Clear sessionStorage cart and redirect
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("nourabelle_subtotal");
    sessionStorage.removeItem("nourabelle_shipping");

    // Redirect to thank you page
    window.location.href = "thankyou.html";
  });
}

// -------------------- Initialize --------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateCheckoutSummary();
  setupOtherCityInput();
  setupFormSubmit();
});
