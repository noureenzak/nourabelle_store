// product.js

// Product data
const productData = {
  whiteset: {
    title: "White Set",
    description: "Elegant and modest white two-piece set. Soft fabric, breathable design, perfect for daily wear.",
    image: "images/whiteset1.jpg",
    price: 1500,
  },
  blackset: {
    title: "Black Set",
    description: "Classic black set with a sleek and minimal cut, ideal for any occasion.",
    image: "images/blackset1.jpg",
    price: 1500,
  },
  browncardigan: {
    title: "Brown Cardigan",
    description: "Cozy brown cardigan with flowy fit. Perfect as a layering piece in all seasons.",
    image: "images/browncardigan1.jpg",
    price: 1500,
  },
  blackcardigan: {
    title: "Black Cardigan",
    description: "Timeless black cardigan with soft material and flattering shape.",
    image: "images/blackcardigan1.jpg",
    price: 1500,
  },
  beigeset: {
    title: "Beige Set",
    description: "Soft beige two-piece set with relaxed fit and modern modest cut.",
    image: "images/beigeset1.jpg",
    price: 1500,
  },
  blueset: {
    title: "Blue Set",
    description: "Calm and fresh blue set, light and breathable — perfect for summer days.",
    image: "images/blueset1.jpg",
    price: 1500,
  }
};

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
let productId = params.get("product") || sessionStorage.getItem("lastProductId");

if (productId) {
  sessionStorage.setItem("lastProductId", productId);
  const product = productData[productId];

  if (product) {
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = `Price: ${product.price} EGP`;

  }

  const buyBtn = document.getElementById("buy-button");
  buyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const selectedSize = document.getElementById("size").value;

    const cartItem = {
  name: product.title,
  image: product.image,
  size: selectedSize,
  price: product.price,
};


    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(cartItem);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showPopup();
  });

  function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const count = cart.length;
    const countSpan = document.getElementById("cart-count");
    if (countSpan) {
      countSpan.textContent = count;
    }
  }

  function showPopup() {
    const existing = document.getElementById("cart-popup");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "cart-popup";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    modal.innerHTML = `
      <div style="background-color: white; padding: 2rem; border-radius: 20px; text-align: center; width: 90%; max-width: 350px;">
        <p style="font-size: 1rem; margin-bottom: 1.5rem;">Item added to cart!</p>
        <div style="display: flex; gap: 1rem;">
          <button id="continue-shopping" style="flex: 1; background-color: black; color: white; border: none; padding: 10px; border-radius: 10px;">Continue Shopping</button>
          <button id="go-to-cart" style="flex: 1; background-color: black; color: white; border: none; padding: 10px; border-radius: 10px;">Go to Cart</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("continue-shopping").onclick = () => window.location.href = "products.html";
    document.getElementById("go-to-cart").onclick = () => window.location.href = "cart.html";
  }

  updateCartCount();
}
