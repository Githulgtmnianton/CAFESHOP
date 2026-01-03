// Global variables
let cart = [];
let orders = [];
let selectedCategory = 'all';

const menuItems = [
    { id: 1, name: "Bird's Nest Carbonara", category: 'pasta', price: 165, image: 'images/carbonara.jpg', description: 'Signature creamy carbonara' },
    { id: 2, name: 'Smoked BBQ Ribs', category: 'mains', price: 280, image: 'images/bbqribs.png', description: 'Tender ribs with BBQ glaze' },
    { id: 3, name: 'Spicy Ribs', category: 'mains', price: 280, image: 'images/spicyribs.png', description: 'Fiery glazed pork ribs' },
    { id: 4, name: 'Garlic Parmesan Wings', category: 'wings', price: 360, image: 'images/garlicwings.png', description: 'Crispy wings' },
    { id: 5, name: 'Honey Soy Wings', category: 'wings', price: 360, image: 'images/honeysoy.png', description: 'Sweet savory wings' },
    { id: 6, name: 'Jack Daniels BBQ Ribs', category: 'mains', price: 290, image: 'images/jackdan.png', description: 'Whiskey BBQ sauce' },
    { id: 7, name: 'Fish Fillet', category: 'mains', price: 175, image: 'images/fishfille.png', description: 'Crispy fried fish' },
    { id: 8, name: 'Bacon Wrapped Chicken', category: 'mains', price: 225, image: 'images/baconchick.png', description: 'With bechamel sauce' },
    { id: 9, name: 'Lechon Kawali Kare-Kare', category: 'mains', price: 245, image: 'images/karekare.png', description: 'Pork in peanut sauce' },
    { id: 10, name: 'Porterhouse Steak', category: 'mains', price: 320, image: 'images/porterhouse.png', description: 'Premium beef steak' },
    { id: 11, name: 'Chicken Hollywood', category: 'mains', price: 245, image: 'images/hollywood.png', description: 'Signature chicken' },
    { id: 12, name: 'Adobo Glazed Bowl', category: 'rice', price: 185, image: 'images/adoborice.png', description: 'Filipino adobo rice' },
    { id: 13, name: 'Pepperoni Pizza', category: 'pizza', price: 245, image: 'images/peperoni.png', description: 'Hand-kneaded pizza' },
    { id: 14, name: 'Hawaiian Pizza', category: 'pizza', price: 245, image: 'images/hawainpizza.png', description: 'Ham and pineapple' },
    { id: 15, name: 'Matcha Cream Latte', category: 'coffee', price: 145, image: 'images/matcha late.png', description: 'Signature matcha' },
    { id: 16, name: 'Caramel Macchiato', category: 'coffee', price: 145, image: 'images/machiato.png', description: 'Classic caramel' },
    { id: 17, name: 'Americano', category: 'coffee', price: 120, image: 'images/americano.png', description: 'Bold espresso' },
    { id: 18, name: 'Cappuccino', category: 'coffee', price: 130, image: 'images/capucino.png', description: 'Steamed milk coffee' },
    { id: 19, name: 'Mocha Frappe', category: 'ice-blended', price: 165, image: 'images/mocha.png', description: 'Chocolate blend' },
    { id: 20, name: 'Matcha Oreo Frappe', category: 'ice-blended', price: 175, image: 'images/matcha.png', description: 'Matcha with Oreo' },
    { id: 21, name: 'Frozen Brazo', category: 'desserts', price: 95, image: 'images/brazo.png', description: 'Frozen meringue' },
    { id: 22, name: 'Red Velvet Cake', category: 'desserts', price: 120, image: 'images/velvet cake.png', description: 'Rich red velvet' },
    { id: 23, name: 'Galilea Nachos', category: 'pica-pica', price: 195, image: 'images/nachos.png', description: 'Loaded nachos' }
];

const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'mains', name: 'Mains', icon: '🍖' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'wings', name: 'Wings', icon: '🍗' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'coffee', name: 'Coffee', icon: '☕' },
    { id: 'ice-blended', name: 'Frappe', icon: '🥤' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'pica-pica', name: 'Snacks', icon: '🧀' }
];

// Initialization
function init() {
    renderCategories();
    renderMenu();
    updateCartCount();
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categories');
    let html = '';
    categories.forEach(cat => {
        const activeClass = selectedCategory === cat.id ? 'active' : '';
        html += `<button class="category-btn ${activeClass}" onclick="selectCategory('${cat.id}')">${cat.icon} ${cat.name}</button>`;
    });
    container.innerHTML = html;
}

// Select category
function selectCategory(categoryId) {
    selectedCategory = categoryId;
    renderCategories();
    renderMenu();
}

// Render menu items
function renderMenu() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = menuItems.filter(item => 
        (selectedCategory === 'all' || item.category === selectedCategory) && 
        item.name.toLowerCase().includes(searchTerm)
    );

    const grid = document.getElementById('menuGrid');
    let html = '';
    filtered.forEach(item => {
        html += `
            <div class="menu-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-footer">
                        <div class="item-price">₱${item.price}</div>
                        <button class="btn-add" onclick="addToCart(${item.id})">➕ Add</button>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}


// Filter menu based on search
function filterMenu() {
    renderMenu();
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(c => c.id === itemId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ 
            ...item, 
            quantity: 1 
        });
    }

    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    const badge = document.getElementById('cartBadge');
    
    if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Open cart modal
function openCart() {
    document.getElementById('cartModal').classList.add('active');
    renderCart();
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Render cart items
function renderCart() {
    const container = document.getElementById('cartItems');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div style="font-size: 80px; margin-bottom: 20px;">🛒</div>
                <p style="font-size: 20px;">Cart is empty</p>
            </div>
        `;
        document.getElementById('cartForm').classList.add('hidden');
        return;
    }

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₱${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="delete-btn" onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        `;
    });
    container.innerHTML = html;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = `₱${total.toLocaleString()}`;
    document.getElementById('cartForm').classList.remove('hidden');
}


// Update item quantity
function updateQuantity(itemId, change) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index === -1) return;

    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCartCount();
    renderCart();
}

// Remove item from cart
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCart();
}

// Place order
function placeOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const branch = document.getElementById('customerBranch').value;

    if (!name || !phone || !address) {
        alert('Please fill in all details!');
        return;
    }

    const orderNumber = 'CG' + Date.now().toString().slice(-6);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
        id: Date.now(),
        orderNumber,
        items: [...cart],
        customer: { name, phone, address, branch },
        total,
        status: 'pending',
        timestamp: new Date().toLocaleString()
    };

    orders.unshift(order);
    cart = [];

    // Clear form
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';

    closeCart();
    updateCartCount();

    alert(`Order #${orderNumber} placed! 🎉\n\nWe will contact you at ${phone} shortly!`);
}

// Show admin login
function showAdminLogin() {
    document.getElementById('customerView').classList.add('hidden');
    document.getElementById('adminLogin').classList.remove('hidden');
}

// Handle Enter key in admin login
function handleAdminLoginKeyPress(event) {
    if (event.key === 'Enter') {
        adminLoginSubmit();
    }
}

// Admin login submit
function adminLoginSubmit() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        renderAdminDashboard();
    } else {
        alert('Invalid password!');
    }
}

// Back to store
function backToStore() {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('customerView').classList.remove('hidden');
    document.getElementById('adminPassword').value = '';
}

// Render admin dashboard
function renderAdminDashboard() {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pending = orders.filter(order => order.status === 'pending').length;
    const completed = orders.filter(order => order.status === 'completed').length;

    document.getElementById('totalRevenue').textContent = `₱${totalRevenue.toLocaleString()}`;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('completedOrders').textContent = completed;

    renderOrdersList();
}

// Switch tabs in admin dashboard
function switchTab(tab) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'orders') {
        document.getElementById('ordersTab').classList.remove('hidden');
        document.getElementById('menuTab').classList.add('hidden');
        renderOrdersList();
    } else {
        document.getElementById('ordersTab').classList.add('hidden');
        document.getElementById('menuTab').classList.remove('hidden');
        renderMenuList();
    }
}

// Render orders list
function renderOrdersList() {
    const container = document.getElementById('ordersList');
    if (orders.length === 0) {
        container.innerHTML = '<div class="order-card" style="text-align: center; color: #6b7280;">No orders yet</div>';
        return;
    }

    let html = '';
    orders.forEach(order => {
        const statusClass = `status-${order.status}`;
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-number">Order #${order.orderNumber}</div>
                        <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">${order.timestamp}</div>
                        <div style="margin-top: 10px;">
                            <strong>${order.customer.name}</strong><br>
                            <span style="font-size: 14px; color: #6b7280;">${order.customer.phone}</span><br>
                            <span style="font-size: 14px; color: #6b7280;">${order.customer.address}</span><br>
                            <span style="font-size: 14px; color: #6b7280;">Branch: ${order.customer.branch}</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 28px; font-weight: bold; color: #ea580c; margin-bottom: 10px;">
                            ₱${order.total.toLocaleString()}
                        </div>
                        <select onchange="updateOrderStatus(${order.id}, this.value)" 
                                class="order-status ${statusClass}">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                            <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                        </select>
                        <button onclick="deleteOrder(${order.id})" style="margin-top: 10px; width: 100%; background: #dc2626; color: white; border: none; padding: 8px; border-radius: 8px; cursor: pointer;">
                            Delete
                        </button>
                    </div>
                </div>
                <div class="order-items">
        `;

        order.items.forEach(item => {
    html += `
        <div class="order-item-row">
            <img src="${item.image}" alt="${item.name}" class="order-item-img">
            <span>${item.name} x${item.quantity}</span>
            <strong>₱${(item.price * item.quantity).toLocaleString()}</strong>
        </div>
    `;
});

        html += '</div></div>';
    });
    container.innerHTML = html;
}

// Update order status
function updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        renderAdminDashboard();
    }
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Delete this order?')) {
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders.splice(index, 1);
            renderAdminDashboard();
        }
    }
}

// Render menu list in admin
function renderMenuList() {
    const container = document.getElementById('menuList');
    let html = '';
    menuItems.forEach(item => {
        html += `
            <div class="order-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <span style="font-size: 48px;">${item.image}</span>
                        <div>
                            <div style="font-size: 20px; font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                            <div style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">${item.description}</div>
                            <div style="color: #ea580c; font-weight: bold; font-size: 18px;">₱${item.price}</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="deleteMenuItem(${item.id})" style="background: #dc2626; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Delete menu item
function deleteMenuItem(id) {
    if (confirm('Delete this item?')) {
        const index = menuItems.findIndex(item => item.id === id);
        if (index !== -1) {
            menuItems.splice(index, 1);
            renderMenuList();
            renderMenu();
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);