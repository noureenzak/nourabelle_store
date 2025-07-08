// product.js

// Product data object
const productData = {
  whiteset: {
    title: "White Set",
    description: "Elegant and modest white two-piece set. Soft fabric, breathable design, perfect for daily wear.",
    image: "images/whiteset1.jpg",
    buyLink: "https://buy.stripe.com/test_whiteset"
  },
  blackset: {
    title: "Black Set",
    description: "Classic black set with a sleek and minimal cut, ideal for any occasion.",
    image: "images/blackset1.jpg",
    buyLink: "https://buy.stripe.com/test_blackset"
  },
  browncardigan: {
    title: "Brown Cardigan",
    description: "Cozy brown cardigan with flowy fit. Perfect as a layering piece in all seasons.",
    image: "images/browncardigan1.jpg",
    buyLink: "https://buy.stripe.com/test_browncardigan"
  },
  blackcardigan: {
    title: "Black Cardigan",
    description: "Timeless black cardigan with soft material and flattering shape.",
    image: "images/blackcardigan1.jpg",
    buyLink: "https://buy.stripe.com/test_blackcardigan"
  }
};

// Parse URL query to get product name
const query = new URLSearchParams(window.location.search);
const productId = query.get("product");

// Load product content if valid
if (productId && productData[productId]) {
  const data = productData[productId];
  document.getElementById("product-title").textContent = data.title;
  document.getElementById("product-description").textContent = data.description;
  document.getElementById("product-image").src = data.image;
  document.getElementById("buy-button").href = data.buyLink;
} else {
  // If product not found
  document.querySelector(".product-detail").innerHTML = "<p style='text-align:center;'>Product not found.</p>";
}
