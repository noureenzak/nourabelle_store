// admin-script.js - Complete Admin Panel Functionality

// ==================== PRODUCT DATA ====================
let products = [
  {
    id: 'whiteset',
    name: 'White Set',
    price: 1500,
    stock: 15,
    category: 'sets',
    description: 'Elegant and modest white two-piece set. Soft fabric, breathable design, perfect for daily wear.',
    image: 'images/whiteset1.jpg'
  },
  {
    id: 'blackset',
    name: 'Black Set',
    price: 1500,
    stock: 12,
    category: 'sets',
    description: 'Classic black set with a sleek and minimal cut, ideal for any occasion.',
    image: 'images/blackset1.jpg'
  },
  {
    id: 'browncardigan',
    name: 'Brown Cardigan',
    price: 1500,
    stock: 8,
    category: 'cardigans',
    description: 'Cozy brown cardigan with flowy fit. Perfect as a layering piece in all seasons.',
    image: 'images/browncardigan1.jpg'
  },
  {
    id: 'blackcardigan',
    name: 'Black Cardigan',
    price: 1500,
    stock: 10,
    category: 'cardigans',
    description: 'Timeless black cardigan with soft material and flattering shape.',
    image: 'images/blackcardigan1.jpg'
  },
  {
    id: 'beigeset',
    name: 'Beige Set',
    price: 1500,
    stock: 14,
    category: 'sets',
    description: 'Soft beige two-piece set with relaxed fit and modern modest cut.',
    image: 'images/beigeset1.jpg'
  },
  {
    id: 'blueset',
    name: 'Blue Set',
    price: 1500,
    stock: 11,
    category: 'sets',
    description: 'Calm and fresh blue set, light and breathable — perfect for summer days.',
    image: 'images/blueset1.jpg'
  }
];

// Sample orders data
let orders = [
  {
    id: 'ORD001',
    customerName: 'Sara Ahmed',
    items: [
      { name: 'White Set', size: 'Medium', price: 1500, quantity: 1 }
    ],
    total: 1550,
    status: 'pending',
    date: '2025-01-28',
    address: 'Cairo, Egypt',
    phone: '+201234567890'
  },
  {
    id: 'ORD002',
    customerName: 'Mona Hassan',
    items: [
      { name: 'Brown Cardigan', size: 'Large', price: 1500, quantity: 1 }
    ],
    total: 1560,
    status: 'processing',
    date: '2025-01-27',
    address: 'Alexandria, Egypt',
    phone: '+201987654321'
  }
];

// ==================== AUTHENTICATION ====================
const SECRET_KEY = 'nourabelle2025';
let isAuthenticated = false;

function checkAuth() {
  const secretInput = document.getElementById('secret-key');
  if (secretInput) {
    secretInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (secretInput.value === SECRET_KEY) {
          login();
        } else {
          secretInput.style.borderColor = '#ff6b6b';
          secretInput.placeholder = 'Wrong key';
          setTimeout(() => {
            secretInput.style.borderColor = '';
            secretInput.placeholder = 'admin key';
            secretInput.value = '';
          }, 2000);
        }
      }
    });
  }
}

function login() {
  isAuthenticated = true;
  document.getElementById('fake-404').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'block';
  updateDashboardStats();
  loadProducts();
  loadOrders();
}

function logout() {
  isAuthenticated = false;
  document.getElementById('fake-404').style.display = 'block';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('secret-key').value = '';
}

// ==================== NAVIGATION ====================
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.admin-section');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSection = tab.dataset.section;
      
      // Remove active class from all tabs and sections
      navTabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding section
      tab.classList.add('active');
      document.getElementById(`${targetSection}-section`).classList.add('active');
    });
  });
}

// ==================== DASHBOARD STATS ====================
function updateDashboardStats() {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;

  document.getElementById('total-orders').textContent = totalOrders;
  document.getElementById('pending-orders').textContent = pendingOrders;
  document.getElementById('total-revenue').textContent = totalRevenue.toLocaleString();
  document.getElementById('total-products').textContent = totalProducts;
}

// ==================== PRODUCTS MANAGEMENT ====================
function loadProducts() {
  const productsList = document.getElementById('products-list');
  const filter = document.getElementById('product-filter').value;
  
  let filteredProducts = products;
  if (filter !== 'all') {
    filteredProducts = products.filter(product => product.category === filter);
  }

  productsList.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-price">${product.price} EGP</p>
        <p class="product-stock">Stock: ${product.stock}</p>
        <p class="product-category">${product.category}</p>
        <div class="product-actions">
          <button class="btn btn-edit" onclick="editProduct('${product.id}')">Edit</button>
          <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Fill the edit modal with product data
  document.getElementById('edit-product-id').value = product.id;
  document.getElementById('edit-product-name').value = product.name;
  document.getElementById('edit-product-price').value = product.price;
  document.getElementById('edit-product-stock').value = product.stock;
  document.getElementById('edit-product-category').value = product.category;
  document.getElementById('edit-product-description').value = product.description;

  // Show modal
  document.getElementById('edit-modal').style.display = 'flex';
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    products = products.filter(p => p.id !== productId);
    loadProducts();
    updateDashboardStats();
    showNotification('Product deleted successfully');
  }
}

function setupProductForm() {
  const addForm = document.getElementById('add-product-form');
  const editForm = document.getElementById('edit-product-form');
  const imageInput = document.getElementById('product-image');
  const imagePreview = document.getElementById('image-preview');

  // Image preview for add form
  imageInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Add product form submission
  addForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addForm);
    
    const newProduct = {
      id: formData.get('name').toLowerCase().replace(/\s+/g, ''),
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
      description: formData.get('description'),
      image: 'images/placeholder.jpg' // In real implementation, handle file upload
    };

    products.push(newProduct);
    addForm.reset();
    imagePreview.innerHTML = '';
    loadProducts();
    updateDashboardStats();
    showNotification('Product added successfully');
  });

  // Edit product form submission
  editForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(editForm);
    const productId = formData.get('id');
    
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        category: formData.get('category'),
        description: formData.get('description')
      };
      
      closeModal();
      loadProducts();
      updateDashboardStats();
      showNotification('Product updated successfully');
    }
  });
}

// ==================== ORDERS MANAGEMENT ====================
function loadOrders() {
  const ordersList = document.getElementById('orders-list');
  const filter = document.getElementById('order-filter').value;
  
  let filteredOrders = orders;
  if (filter !== 'all') {
    filteredOrders = orders.filter(order => order.status === filter);
  }

  ordersList.innerHTML = filteredOrders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <h3>Order #${order.id}</h3>
        <span class="order-status status-${order.status}">${order.status.toUpperCase()}</span>
      </div>
      <div class="order-details">
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Total:</strong> ${order.total} EGP</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <div class="order-items">
          <strong>Items:</strong>
          ${order.items.map(item => `
            <div class="order-item">
              ${item.name} (${item.size}) x${item.quantity} - ${item.price} EGP
            </div>
          `).join('')}
        </div>
        <div class="order-actions">
          <select onchange="updateOrderStatus('${order.id}', this.value)" class="status-select">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    updateDashboardStats();
    showNotification(`Order ${orderId} status updated to ${newStatus}`);
  }
}

// ==================== MODAL MANAGEMENT ====================
function setupModals() {
  const editModal = document.getElementById('edit-modal');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-cancel');

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close modal when clicking outside
  editModal?.addEventListener('click', (e) => {
    if (e.target === editModal) {
      closeModal();
    }
  });
}

function closeModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

// ==================== UTILITIES ====================
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    z-index: 10000;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function setupFilters() {
  const productFilter = document.getElementById('product-filter');
  const orderFilter = document.getElementById('order-filter');
  
  productFilter?.addEventListener('change', loadProducts);
  orderFilter?.addEventListener('change', loadOrders);
}

function setupRefreshButtons() {
  document.getElementById('refresh-products')?.addEventListener('click', loadProducts);
  document.getElementById('refresh-orders')?.addEventListener('click', loadOrders);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupNavigation();
  setupProductForm();
  setupModals();
  setupFilters();
  setupRefreshButtons();

  // Logout button
  document.getElementById('logout-btn')?.addEventListener('click', logout);

  // Load data if authenticated (for testing)
  if (isAuthenticated) {
    updateDashboardStats();
    loadProducts();
    loadOrders();
  }
});

// Make functions globally available
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.updateOrderStatus = updateOrderStatus;