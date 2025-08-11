// Shipping costs
    const shippingCosts = {
      cairo: 50,
      alexandria: 60,
      giza: 55,
      other: 80
    };

    // Get cart from sessionStorage
    function getCart() {
      return JSON.parse(sessionStorage.getItem('cart') || '[]');
    }

    // Save cart to sessionStorage
    function saveCart(cart) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }

    // Update cart count in navbar
    function updateCartCount() {
      const cart = getCart();
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
      }
    }

    // Display cart items
    function displayCartItems() {
      const cart = getCart();
      const cartItemsContainer = document.getElementById('cart-items');
      const emptyCart = document.getElementById('empty-cart');
      const cartContent = document.getElementById('cart-content');

      if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
      }

      emptyCart.style.display = 'none';
      cartContent.style.display = 'block';

      cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-index="${index}">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-info">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-size">Size: ${item.size}</p>
          </div>
          <div class="item-actions">
            <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity">${item.quantity || 1}</span>
            <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <div class="item-total">
            <span class="total-price">${((item.price) * (item.quantity || 1)).toFixed(2)} EGP</span>
            <button class="remove-btn" onclick="removeItem(${index})" title="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      `).join('');

      updateTotals();
    }

    // Update item quantity
    function updateQuantity(index, change) {
      const cart = getCart();
      if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + change;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        saveCart(cart);
        displayCartItems();
      }
    }

    // Remove item from cart
    function removeItem(index) {
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      displayCartItems();
      
      // Show notification
      showNotification('Item removed from cart');
    }

    // Clear entire cart
    function clearCart() {
      if (confirm('Are you sure you want to clear your cart?')) {
        sessionStorage.removeItem('cart');
        updateCartCount();
        displayCartItems();
        showNotification('Cart cleared');
      }
    }

    // Calculate and update totals
    function updateTotals() {
      const cart = getCart();
      const citySelect = document.getElementById('city-select');
      const subtotalEl = document.getElementById('subtotal-amount');
      const shippingEl = document.getElementById('shipping-amount');
      const totalEl = document.getElementById('total-amount');
      const checkoutBtn = document.getElementById('checkout-btn');

      const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      let shipping = 0;
      let shippingText = 'Select city';
      
      if (citySelect.value) {
        shipping = shippingCosts[citySelect.value] || 80;
        shippingText = `${shipping.toFixed(2)} EGP`;
        checkoutBtn.disabled = false;
      } else {
        checkoutBtn.disabled = true;
      }

      const total = subtotal + shipping;

      subtotalEl.textContent = `${subtotal.toFixed(2)} EGP`;
      shippingEl.textContent = shippingText;
      totalEl.textContent = `${total.toFixed(2)} EGP`;

      // Store totals for checkout page
      sessionStorage.setItem('nourabelle_subtotal', subtotal.toString());
      sessionStorage.setItem('nourabelle_shipping', shipping.toString());
    }

    // Show notification
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--btn);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 2500);
    }

    // Policy modal handlers
    function setupPolicyModal() {
      const modal = document.getElementById('policy-modal');
      const showBtn = document.getElementById('show-policy');
      const closeBtn = document.querySelector('.close-modal');

      showBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
      updateCartCount();
      displayCartItems();
      setupPolicyModal();

      // City selection change
      document.getElementById('city-select').addEventListener('change', updateTotals);

      // Clear cart button
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);

      // Checkout button
      document.getElementById('checkout-btn').addEventListener('click', function() {
        const cart = getCart();
        const citySelect = document.getElementById('city-select');
        
        if (cart.length === 0) {
          alert('Your cart is empty');
          return;
        }
        
        if (!citySelect.value) {
          alert('Please select your city for shipping calculation');
          citySelect.focus();
          return;
        }

        // Redirect to checkout
        window.location.href = 'checkout.html';
      });
    });

    // Make functions global for inline event handlers
    window.updateQuantity = updateQuantity;
    window.removeItem = removeItem;
    // unified-cart.js - Global cart management system
// Include this file in ALL pages that need cart functionality

class CartManager {
  constructor() {
    this.storageKey = 'nourabelle_cart';
    this.init();
  }

  init() {
    // Update cart count immediately when page loads
    this.updateCartCount();
    
    // Listen for storage changes across tabs/pages
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.updateCartCount();
      }
    });

    // Custom event for same-page cart updates
    window.addEventListener('cartUpdated', () => {
      this.updateCartCount();
    });
  }

  getCart() {
    try {
      return JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    } catch (e) {
      console.error('Error parsing cart data:', e);
      return [];
    }
  }

  saveCart(cart) {
    try {
      sessionStorage.setItem(this.storageKey, JSON.stringify(cart));
      // Trigger custom event for same-page updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      // Also trigger storage event manually for same page
      this.updateCartCount();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  addToCart(item) {
    const cart = this.getCart();
    
    // Check if item already exists (same product and size)
    const existingIndex = cart.findIndex(
      cartItem => cartItem.name === item.name && cartItem.size === item.size
    );

    if (existingIndex > -1) {
      // Update quantity if item exists
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      // Add new item
      cart.push({
        ...item,
        quantity: 1,
        id: Date.now() + Math.random() // Unique ID for each cart item
      });
    }

    this.saveCart(cart);
    return cart;
  }

  removeFromCart(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      this.saveCart(cart);
    }
    return cart;
  }

  updateQuantity(index, newQuantity) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      if (newQuantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = newQuantity;
      }
      this.saveCart(cart);
    }
    return cart;
  }

  clearCart() {
    sessionStorage.removeItem(this.storageKey);
    this.updateCartCount();
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }

  getCartItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  }

  updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
    const cartIcons = document.querySelectorAll('.cart-icon');
    const itemCount = this.getCartItemCount();

    cartCountElements.forEach(element => {
      if (element) {
        element.textContent = itemCount;
        element.style.display = itemCount > 0 ? 'inline-block' : 'none';
      }
    });

    cartIcons.forEach(icon => {
      if (icon) {
        icon.style.color = itemCount > 0 ? 'var(--btn)' : 'inherit';
      }
    });
  }

  showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'error' ? '#ef4444' : 'var(--btn)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 500;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add slide animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }
}

// Create global cart manager instance
const cartManager = new CartManager();

// Global functions for backward compatibility
function updateCartCount() {
  cartManager.updateCartCount();
}

function addToCart(item) {
  return cartManager.addToCart(item);
}

function getCart() {
  return cartManager.getCart();
}

function saveCart(cart) {
  return cartManager.saveCart(cart);
}

// Export for ES6 modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CartManager;
}