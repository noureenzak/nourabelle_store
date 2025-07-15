// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const subtotalSpan = document.getElementById("checkout-subtotal");
  const shippingSpan = document.getElementById("checkout-shipping");
  const totalSpan = document.getElementById("checkout-total");

  const storedSubtotal = localStorage.getItem("nourabelle_subtotal") || 0;
  const storedShipping = localStorage.getItem("nourabelle_shipping") || 0;
  const total = parseFloat(storedSubtotal) + parseFloat(storedShipping);

  subtotalSpan.textContent = parseFloat(storedSubtotal).toFixed(2);
  shippingSpan.textContent = parseFloat(storedShipping).toFixed(2);
  totalSpan.textContent = total.toFixed(2);

  // Form submission
  const form = document.querySelector(".checkout-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // You can send form data to backend here if needed

    // Clear cart after confirming
    localStorage.removeItem("nourabelle_cart");
    localStorage.removeItem("nourabelle_subtotal");
    localStorage.removeItem("nourabelle_shipping");

    window.location.href = "thankyou.html";
  });
});
