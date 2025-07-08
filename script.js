// Scroll smoothly to products
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Redirect to product page with query
function goToProduct(productId) {
  window.location.href = `product.html?product=${productId}`;
}

// Scroll left/right arrows
function scrollProducts(direction) {
  const container = document.getElementById("product-scroll");
  container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

// Hover + mobile swap logic
function setupSwap(productId, images) {
  const img = document.getElementById(productId);
  let index = 0;
  let timer = null;

  img.addEventListener("mouseenter", () => {
    index = (index + 1) % images.length;
    img.src = `images/${images[index]}`;
  });

  img.addEventListener("mouseleave", () => {
    img.src = `images/${images[0]}`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && window.innerWidth <= 768) {
        timer = setTimeout(() => {
          index = (index + 1) % images.length;
          img.src = `images/${images[index]}`;
        }, 2000);
      } else {
        clearTimeout(timer);
        img.src = `images/${images[0]}`;
      }
    });
  }, { threshold: 0.8 });

  observer.observe(img);
}

// Apply to all products
setupSwap("whiteset", ["whiteset1.jpg", "whiteset2.jpg", "whiteset3.jpg"]);
setupSwap("blackset", ["blackset1.jpg", "blackset2.jpg"]);
setupSwap("browncardigan", ["browncardigan1.jpg", "browncardigan2.jpg"]);
setupSwap("blackcardigan", ["blackcardigan1.jpg", "blackcardigan2.jpg"]);

//contact us popup 
  document.addEventListener('DOMContentLoaded', () => {
    const contactLink = document.querySelector('.nav-right a[href="#contact"]');
    const modal = document.getElementById('contact-modal');
    const closeBtn = modal.querySelector('.modal-close');

    // Open modal on contact us click
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal when clicking outside modal-content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
