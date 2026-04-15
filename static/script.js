/* script.js - Commerce Logic & Interactivity */

// --- Constants & Data ---
const PROVINCES = [
    { name: "An Giang", fee: 45000, time: "3-4 ngày" },
    { name: "Bà Rịa - Vũng Tàu", fee: 35000, time: "2-3 ngày" },
    { name: "Bạc Liêu", fee: 45000, time: "3-4 ngày" },
    { name: "Bắc Giang", fee: 85000, time: "4-5 ngày" },
    { name: "Bắc Kạn", fee: 95000, time: "5-6 ngày" },
    { name: "Bắc Ninh", fee: 85000, time: "4-5 ngày" },
    { name: "Bến Tre", fee: 40000, time: "3-4 ngày" },
    { name: "Bình Dương", fee: 30000, time: "2-3 ngày" },
    { name: "Bình Định", fee: 40000, time: "2-3 ngày" },
    { name: "Bình Phước", fee: 35000, time: "2-3 ngày" },
    { name: "Bình Thuận", fee: 30000, time: "2-3 ngày" },
    { name: "Cà Mau", fee: 50000, time: "4-5 ngày" },
    { name: "Cao Bằng", fee: 110000, time: "5-6 ngày" },
    { name: "Cần Thơ", fee: 40000, time: "3-4 ngày" },
    { name: "Đà Nẵng", fee: 45000, time: "2-3 ngày" },
    { name: "Đắk Lắk", fee: 25000, time: "1-2 ngày" },
    { name: "Đắk Nông", fee: 25000, time: "1-2 ngày" },
    { name: "Điện Biên", fee: 120000, time: "6-7 ngày" },
    { name: "Đồng Nai", fee: 30000, time: "2-3 ngày" },
    { name: "Đồng Tháp", fee: 40000, time: "3-4 ngày" },
    { name: "Gia Lai", fee: 30000, time: "1-2 ngày" },
    { name: "Hà Giang", fee: 120000, time: "6-7 ngày" },
    { name: "Hà Nam", fee: 85000, time: "4-5 ngày" },
    { name: "Hà Nội", fee: 80000, time: "4-5 ngày" },
    { name: "Hà Tĩnh", fee: 65000, time: "3-4 ngày" },
    { name: "Hải Dương", fee: 85000, time: "4-5 ngày" },
    { name: "Hải Phòng", fee: 85000, time: "4-5 ngày" },
    { name: "Hậu Giang", fee: 45000, time: "3-4 ngày" },
    { name: "Hòa Bình", fee: 90000, time: "4-5 ngày" },
    { name: "Hưng Yên", fee: 85000, time: "4-5 ngày" },
    { name: "Khánh Hòa", fee: 30000, time: "1-2 ngày" },
    { name: "Kiên Giang", fee: 50000, time: "4-5 ngày" },
    { name: "Kon Tum", fee: 35000, time: "1-2 ngày" },
    { name: "Lai Châu", fee: 120000, time: "6-7 ngày" },
    { name: "Lạng Sơn", fee: 100000, time: "5-6 ngày" },
    { name: "Lào Cai", fee: 110000, time: "5-6 ngày" },
    { name: "Lâm Đồng", fee: 0, time: "1-2 ngày" },
    { name: "Long An", fee: 35000, time: "2-3 ngày" },
    { name: "Nam Định", fee: 85000, time: "4-5 ngày" },
    { name: "Nghệ An", fee: 70000, time: "3-4 ngày" },
    { name: "Ninh Bình", fee: 85000, time: "4-5 ngày" },
    { name: "Ninh Thuận", fee: 25000, time: "1-2 ngày" },
    { name: "Phú Thọ", fee: 90000, time: "4-5 ngày" },
    { name: "Phú Yên", fee: 35000, time: "2-3 ngày" },
    { name: "Quảng Bình", fee: 60000, time: "3-4 ngày" },
    { name: "Quảng Nam", fee: 50000, time: "2-3 ngày" },
    { name: "Quảng Ngãi", fee: 45000, time: "2-3 ngày" },
    { name: "Quảng Ninh", fee: 95000, time: "5-6 ngày" },
    { name: "Quảng Trị", fee: 55000, time: "3-4 ngày" },
    { name: "Sóc Trăng", fee: 45000, time: "3-4 ngày" },
    { name: "Sơn La", fee: 110000, time: "5-6 ngày" },
    { name: "Tây Ninh", fee: 35000, time: "2-3 ngày" },
    { name: "Thái Bình", fee: 85000, time: "4-5 ngày" },
    { name: "Thái Nguyên", fee: 90000, time: "4-5 ngày" },
    { name: "Thanh Hóa", fee: 75000, time: "3-4 ngày" },
    { name: "Thừa Thiên Huế", fee: 50000, time: "2-3 ngày" },
    { name: "Tiền Giang", fee: 40000, time: "3-4 ngày" },
    { name: "TP Hồ Chí Minh", fee: 30000, time: "2-3 ngày" },
    { name: "Trà Vinh", fee: 45000, time: "3-4 ngày" },
    { name: "Tuyên Quang", fee: 100000, time: "5-6 ngày" },
    { name: "Vĩnh Long", fee: 40000, time: "3-4 ngày" },
    { name: "Vĩnh Phúc", fee: 85000, time: "4-5 ngày" },
    { name: "Yên Bái", fee: 100000, time: "5-6 ngày" }
];

// --- Application State ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let isDarkMode = localStorage.getItem('theme') === 'dark';
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let selectedShippingFee = 0;
let selectedPaymentMethod = '';
let selectedPaymentType = 'full';

// --- Selectors ---
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const totalPriceEl = document.getElementById('total-price');
const subtotalEl = document.getElementById('subtotal');
const shippingFeeEl = document.getElementById('shipping-fee');
const deliveryTimeEl = document.getElementById('delivery-time');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const cartBtn = document.getElementById('cart-btn');
const backToHome = document.getElementById('back-to-home');
const logoBtn = document.getElementById('logo-btn');
const homeSection = document.getElementById('home-section');
const cartSection = document.getElementById('cart-section');
const searchInput = document.getElementById('search-input');
const toastContainer = document.getElementById('toast-container');
const provinceSelect = document.getElementById('cust-province');
const adminSection = document.getElementById('admin-section');
const adminBtn = document.getElementById('admin-btn');
const adminProductList = document.getElementById('admin-product-list');
const adminOrderList = document.getElementById('admin-order-list');
const productForm = document.getElementById('product-form');
const ordersSection = document.getElementById('orders-section');
const ordersBtn = document.getElementById('orders-btn');
const myOrdersList = document.getElementById('my-orders-list');

// Auth Selectors
const authBtn = document.getElementById('auth-btn');
const userDisplayName = document.getElementById('user-display-name');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');
const loginContainer = document.getElementById('login-form-container');
const registerContainer = document.getElementById('register-form-container');
const forgotContainer = document.getElementById('forgot-form-container');
const resetContainer = document.getElementById('reset-form-container');
const profileContainer = document.getElementById('profile-container');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProvinces();
    initPaymentHandlers();
    initAuthHandlers();
    fetchProducts();
    updateCartUI();
    updateAuthUI();
    checkForReset();
    initAdminHandlers();
    
    const checkoutBtn = document.querySelector('#cart-section .btn-primary');
    if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);

    if (provinceSelect) {
        provinceSelect.addEventListener('change', (e) => {
            const provinceName = e.target.value;
            const province = PROVINCES.find(p => p.name === provinceName);
            if (province) {
                selectedShippingFee = province.fee;
                deliveryTimeEl.textContent = `Dự kiến giao hàng: ${province.time}`;
                updateCartUI();
            }
        });
    }
});

function initProvinces() {
    if (!provinceSelect) return;
    PROVINCES.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name;
        provinceSelect.appendChild(opt);
    });
}

function initPaymentHandlers() {
    const cards = document.querySelectorAll('.payment-card');
    const subBtns = document.querySelectorAll('.sub-opt-btn');
    const bankOptions = document.getElementById('bank-sub-options');
    const bankDetails = document.getElementById('bank-details');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedPaymentMethod = card.dataset.method;
            if (selectedPaymentMethod === 'bank') {
                bankOptions.style.display = 'flex';
                bankDetails.style.display = 'block';
            } else {
                bankOptions.style.display = 'none';
                bankDetails.style.display = 'none';
            }
        });
    });

    subBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPaymentType = btn.dataset.type;
        });
    });
}

// --- Auth Interactivity ---
function initAuthHandlers() {
    authBtn.addEventListener('click', () => {
        authModal.style.display = 'flex';
        showAuthForm(currentUser ? 'profile' : 'login');
    });

    closeAuth.addEventListener('click', () => authModal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === authModal) authModal.style.display = 'none'; });

    document.getElementById('to-register').addEventListener('click', (e) => { e.preventDefault(); showAuthForm('register'); });
    document.getElementById('to-login').addEventListener('click', (e) => { e.preventDefault(); showAuthForm('login'); });
    document.getElementById('to-forgot').addEventListener('click', (e) => { e.preventDefault(); showAuthForm('forgot'); });
    document.getElementById('back-to-login').addEventListener('click', (e) => { e.preventDefault(); showAuthForm('login'); });

    document.getElementById('login-submit').addEventListener('click', handleLogin);
    document.getElementById('reg-submit').addEventListener('click', handleRegister);
    document.getElementById('forgot-submit').addEventListener('click', handleForgot);
    document.getElementById('reset-submit').addEventListener('click', handleReset);
    document.getElementById('logout-submit').addEventListener('click', handleLogout);
}

function showAuthForm(type) {
    [loginContainer, registerContainer, forgotContainer, resetContainer, profileContainer].forEach(c => c.style.display = 'none');
    if (type === 'login') loginContainer.style.display = 'block';
    else if (type === 'register') registerContainer.style.display = 'block';
    else if (type === 'forgot') forgotContainer.style.display = 'block';
    else if (type === 'reset') resetContainer.style.display = 'block';
    else if (type === 'profile') {
        profileContainer.style.display = 'block';
        if (currentUser) {
            document.getElementById('profile-user-name').textContent = currentUser.name;
            document.getElementById('profile-user-email').textContent = currentUser.email;
        }
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!email || !password) return alert("Vui lòng nhập đủ thông tin!");

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.status === 'success') {
            currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(currentUser));
            updateAuthUI();
            authModal.style.display = 'none';
            showToast("Chào mừng bạn quay trở lại!");
        } else {
            alert(data.message);
        }
    } catch (err) { alert("Lỗi kết nối server!"); }
}

async function handleRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirm = document.getElementById('reg-confirm-password').value.trim();

    if (!name || !email || !password) return alert("Vui lòng nhập đủ!");
    if (password !== confirm) return alert("Mật khẩu không khớp!");

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (data.status === 'success') {
            alert("Đăng ký thành công! Hãy đăng nhập nhé.");
            showAuthForm('login');
        } else { alert(data.message); }
    } catch (err) { alert("Lỗi kết nối!"); }
}

async function handleForgot() {
    const email = document.getElementById('forgot-email').value.trim();
    if (!email) return alert("Nhập email!");
    const res = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const data = await res.json();
    alert(data.message);
}

function checkForReset() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('email') && urlParams.has('token')) {
        authModal.style.display = 'flex';
        showAuthForm('reset');
    }
}

async function handleReset() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');
    const password = document.getElementById('reset-password').value.trim();
    const confirm = document.getElementById('reset-confirm').value.trim();

    if (!token) return alert("Liên kết không hợp lệ!");
    if (!password) return alert("Nhập mật khẩu mới!");
    if (password !== confirm) return alert("Mật khẩu không khớp!");

    try {
        const res = await fetch('/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, token })
        });
        const data = await res.json();
        if (data.status === 'success') {
            alert(data.message);
            // Clear URL
            window.history.replaceState({}, document.title, "/");
            showAuthForm('login');
        } else {
            alert(data.message);
        }
    } catch (err) { alert("Lỗi khi reset mật khẩu!"); }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('user');
    updateAuthUI();
    authModal.style.display = 'none';
    
    // Clear all inputs
    const authInputs = document.querySelectorAll('#auth-modal input');
    authInputs.forEach(input => {
        input.value = '';
        if (input.type === 'text' && (input.id.includes('password') || input.id.includes('pass'))) {
             input.type = 'password'; // Reset toggle state
        }
    });

    showToast("Đã đăng xuất.");
}

window.togglePass = (id, icon) => {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
};

function updateAuthUI() {
    if (currentUser) {
        userDisplayName.textContent = currentUser.name;
        userDisplayName.style.display = 'inline-block';
        ordersBtn.style.display = 'inline-block';
        if (currentUser.role === 'admin') {
            adminBtn.style.display = 'inline-block';
        } else {
            adminBtn.style.display = 'none';
        }
    } else {
        userDisplayName.style.display = 'none';
        adminBtn.style.display = 'none';
        ordersBtn.style.display = 'none';
    }
}

// --- Admin Dashboard Logic ---
function initAdminHandlers() {
    if (!adminBtn) return;
    
    adminBtn.addEventListener('click', () => showSection('admin'));
    
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    const cancelBtn = document.getElementById('p-cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetProductForm);
    }
}

function switchAdminTab(tab) {
    const prodContent = document.getElementById('admin-products-content');
    const orderContent = document.getElementById('admin-orders-content');
    const prodTabBtn = document.getElementById('tab-products-btn');
    const orderTabBtn = document.getElementById('tab-orders-btn');

    if (tab === 'products') {
        prodContent.style.display = 'block';
        orderContent.style.display = 'none';
        prodTabBtn.classList.add('active');
        orderTabBtn.classList.remove('active');
        fetchAdminProducts();
    } else {
        prodContent.style.display = 'none';
        orderContent.style.display = 'block';
        prodTabBtn.classList.remove('active');
        orderTabBtn.classList.add('active');
        fetchOrders();
    }
}

async function fetchAdminProducts() {
    const res = await fetch('/products');
    const data = await res.json();
    renderAdminProducts(data);
}

function renderAdminProducts(items) {
    if (!adminProductList) return;
    adminProductList.innerHTML = items.map(p => `
        <tr>
            <td style="padding: 1rem;"><img src="static/${p.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td style="padding: 1rem;">
                <div style="font-weight: 600;">${p.name}</div>
                <div style="font-size: 0.8rem; color: var(--accent-color);">${p.price.toLocaleString()}đ</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${p.category}</div>
            </td>
            <td style="padding: 1rem;">
                <button class="action-btn edit-btn" onclick="editProduct(${p.id})"><i data-lucide="edit-2" size="14"></i> Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})"><i data-lucide="trash-2" size="14"></i> Xóa</button>
            </td>
        </tr>
    `).join('');
    lucide.createIcons();
}

async function handleProductSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value;
    const formData = new FormData();
    formData.append('name', document.getElementById('p-name').value);
    formData.append('price', document.getElementById('p-price').value);
    formData.append('category', document.getElementById('p-category').value);
    
    const imageFile = document.getElementById('p-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    } else if (!id) {
        return alert("Vui lòng chọn ảnh cho sản phẩm mới!");
    }

    const url = id ? `/api/products/${id}` : '/api/products';
    const method = id ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, { method, body: formData });
        const data = await res.json();
        if (data.status === 'success') {
            showToast(data.message);
            resetProductForm();
            fetchAdminProducts();
            fetchProducts(); // Update Home grid too
        } else {
            alert(data.message);
        }
    } catch (err) { alert("Lỗi khi lưu sản phẩm!"); }
}

function editProduct(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    
    document.getElementById('edit-product-id').value = p.id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-category').value = p.category;
    document.getElementById('admin-form-title').textContent = "Chỉnh sửa sản phẩm";
    document.getElementById('p-submit-btn').textContent = "Cập nhật sản phẩm";
    document.getElementById('p-cancel-btn').style.display = 'inline-block';
    document.getElementById('p-image-name').textContent = `Ảnh hiện tại: ${p.image.split('/').pop()}`;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetProductForm() {
    document.getElementById('edit-product-id').value = '';
    productForm.reset();
    document.getElementById('admin-form-title').textContent = "Thêm sản phẩm mới";
    document.getElementById('p-submit-btn').textContent = "Lưu sản phẩm";
    document.getElementById('p-cancel-btn').style.display = 'none';
    document.getElementById('p-image-name').textContent = '';
}

async function deleteProduct(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này sẽ xóa vĩnh viễn cả file ảnh!")) return;
    
    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.status === 'success') {
            showToast(data.message);
            fetchAdminProducts();
            fetchProducts();
        } else {
            alert(data.message);
        }
    } catch (err) { alert("Lỗi khi xóa sản phẩm!"); }
}

async function fetchOrders() {
    const res = await fetch('/api/orders');
    const data = await res.json();
    renderAdminOrders(data);
}

function renderAdminOrders(orders) {
    if (!adminOrderList) return;
    if (orders.length === 0) {
        adminOrderList.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">Chưa có đơn hàng nào.</td></tr>';
        return;
    }

    const statusConfig = {
        'Chờ xử lý': { bg: '#fef3c7', color: '#92400e', icon: 'clock' },
        'Đang giao':  { bg: '#dbeafe', color: '#1e40af', icon: 'truck' },
        'Đã giao':    { bg: '#d1fae5', color: '#065f46', icon: 'check-circle' },
        'Đã hủy':     { bg: '#fee2e2', color: '#991b1b', icon: 'x-circle' }
    };

    adminOrderList.innerHTML = orders.map(o => {
        const st = statusConfig[o.status] || statusConfig['Chờ xử lý'];
        const itemNames = o.items.map(i => `${i.name} x${i.quantity}`).join('\n');

        // Build action buttons based on current status
        let actionBtns = '';
        if (o.status === 'Chờ xử lý') {
            actionBtns = `
                <button class="action-btn order-confirm-btn" onclick="updateOrderStatus(${o.id}, 'Đang giao')" title="Xác nhận & giao hàng">
                    <i data-lucide="truck" size="13"></i> Xác nhận
                </button>
                <button class="action-btn order-cancel-btn" onclick="updateOrderStatus(${o.id}, 'Đã hủy')" title="Hủy đơn hàng">
                    <i data-lucide="x-circle" size="13"></i> Hủy
                </button>`;
        } else if (o.status === 'Đang giao') {
            actionBtns = `
                <button class="action-btn order-done-btn" onclick="updateOrderStatus(${o.id}, 'Đã giao')" title="Đánh dấu đã giao">
                    <i data-lucide="check-circle" size="13"></i> Đã giao
                </button>
                <button class="action-btn order-cancel-btn" onclick="updateOrderStatus(${o.id}, 'Đã hủy')" title="Hủy đơn hàng">
                    <i data-lucide="x-circle" size="13"></i> Hủy
                </button>`;
        } else if (o.status === 'Đã hủy' || o.status === 'Đã giao') {
            actionBtns = `
                <button class="action-btn order-pending-btn" onclick="updateOrderStatus(${o.id}, 'Chờ xử lý')" title="Khôi phục về Chờ xử lý">
                    <i data-lucide="rotate-ccw" size="13"></i> Khôi phục
                </button>`;
        }

        return `
        <tr class="order-row" data-order-id="${o.id}">
            <td>
                <div style="font-size: 0.75rem; font-family: monospace; color: var(--text-muted);">#${o.id}</div>
            </td>
            <td>
                <div style="font-weight: 600; font-size: 0.9rem;">${o.customer?.name || '—'}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${o.customer?.phone || ''}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${o.customer?.address}, ${o.customer?.province}">${o.customer?.address}, ${o.customer?.province}</div>
            </td>
            <td>
                <div style="font-size: 0.85rem; font-weight: 600;">${o.items.length} sản phẩm</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); cursor: pointer; text-decoration: underline;" title="${itemNames}" onclick="showOrderDetail(${o.id})">Xem chi tiết ▾</div>
            </td>
            <td>
                <div style="font-weight: 700; color: var(--accent-color); white-space: nowrap;">${o.total.toLocaleString()}đ</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${(o.payment?.method || '').toUpperCase()}</div>
            </td>
            <td>
                <div style="font-size: 0.8rem; white-space: nowrap;">${o.time}</div>
            </td>
            <td>
                <span class="order-status-badge" style="background: ${st.bg}; color: ${st.color};">
                    <i data-lucide="${st.icon}" size="12"></i> ${o.status}
                </span>
            </td>
            <td>
                <div class="order-action-group">
                    ${actionBtns}
                    <button class="action-btn order-delete-btn" onclick="deleteOrder(${o.id})" title="Xóa vĩnh viễn đơn hàng">
                        <i data-lucide="trash-2" size="13"></i> Xóa
                    </button>
                </div>
            </td>
        </tr>`;
    }).join('');
    lucide.createIcons();
}

window.showOrderDetail = function(orderId) {
    // fetch fresh orders from current rendered list
    const row = adminOrderList.querySelector(`[data-order-id="${orderId}"]`);
    if (!row) return;
    const titleEl = row.querySelector('td:nth-child(2) div');
    alert(`Chi tiết đơn hàng #${orderId}\n` + row.querySelector('[title]').getAttribute('title'));
};

window.updateOrderStatus = async function(orderId, newStatus) {
    const confirmMsg = {
        'Đang giao': `Xác nhận giao đơn hàng #${orderId}?`,
        'Đã giao':   `Đánh dấu đơn hàng #${orderId} đã giao xong?`,
        'Đã hủy':    `Bạn chắc chắn muốn HỦY đơn hàng #${orderId}?`,
        'Chờ xử lý': `Khôi phục đơn hàng #${orderId} về "Chờ xử lý"?`
    };
    if (!confirm(confirmMsg[newStatus] || 'Xác nhận thao tác?')) return;

    try {
        const res = await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.status === 'success') {
            showToast(data.message, 'success');
            fetchOrders();
        } else {
            showToast(data.message, 'error');
        }
    } catch (err) {
        showToast('Lỗi kết nối server!', 'error');
    }
};

window.deleteOrder = async function(orderId) {
    if (!confirm(`XÓA VĨNH VIỄN đơn hàng #${orderId}?\nThao tác này không thể hoàn tác!`)) return;
    try {
        const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.status === 'success') {
            showToast(data.message, 'success');
            fetchOrders();
        } else {
            showToast(data.message, 'error');
        }
    } catch (err) {
        showToast('Lỗi kết nối server!', 'error');
    }
};


// --- User Order Tracking ---
async function fetchMyOrders() {
    if (!currentUser) return;
    try {
        const res = await fetch(`/api/my-orders?email=${encodeURIComponent(currentUser.email)}`);
        const data = await res.json();
        renderMyOrders(data);
    } catch (err) {
        myOrdersList.innerHTML = '<p style="text-align: center; padding: 3rem; color: red;">Lỗi khi tải đơn hàng.</p>';
    }
}

function renderMyOrders(orders) {
    if (!myOrdersList) return;
    if (orders.length === 0) {
        myOrdersList.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <i data-lucide="package-open" style="color: var(--text-muted); margin-bottom: 1rem;" size="64"></i>
                <h3 style="color: var(--text-muted); margin-bottom: 0.5rem;">Chưa có đơn hàng nào</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Hãy bắt đầu mua sắm để theo dõi đơn hàng tại đây!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    const statusColors = {
        'Chờ xử lý': { bg: '#fef3c7', color: '#92400e', icon: 'clock' },
        'Đang giao': { bg: '#dbeafe', color: '#1e40af', icon: 'truck' },
        'Đã giao': { bg: '#d1fae5', color: '#065f46', icon: 'check-circle' },
        'Đã hủy': { bg: '#fee2e2', color: '#991b1b', icon: 'x-circle' }
    };
    
    myOrdersList.innerHTML = orders.map(o => {
        const st = statusColors[o.status] || statusColors['Chờ xử lý'];
        const itemsHtml = o.items.map(item => `
            <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                <img src="static/${item.image}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px;">
                <div style="flex: 1;">
                    <div style="font-size: 0.85rem; font-weight: 500;">${item.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">x${item.quantity}</div>
                </div>
                <div style="font-size: 0.85rem; font-weight: 600; color: var(--accent-color);">${item.price.toLocaleString()}đ</div>
            </div>
        `).join('');
        
        return `
        <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                <div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">Mã ĐH: #${o.id}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${o.time}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; background: ${st.bg}; color: ${st.color}; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                    <i data-lucide="${st.icon}" size="14"></i>
                    ${o.status}
                </div>
            </div>
            ${itemsHtml}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                    <i data-lucide="map-pin" size="14" style="vertical-align: middle;"></i>
                    ${o.customer.address}, ${o.customer.province}
                </div>
                <div>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">Tổng: </span>
                    <span style="font-size: 1.1rem; font-weight: 700; color: var(--accent-color);">${o.total.toLocaleString()}đ</span>
                </div>
            </div>
        </div>
        `;
    }).join('');
    lucide.createIcons();
}

// --- Theme Management ---
function initTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    lucide.createIcons();
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeIcon.setAttribute('data-lucide', isDarkMode ? 'moon' : 'sun');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    lucide.createIcons();
});

// --- API Fetching ---
async function fetchProducts() {
    try {
        const response = await fetch('/products');
        if (!response.ok) throw new Error('Không thể tải sản phẩm');
        products = await response.json();
        renderProducts(products);
    } catch (error) {
        productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: red;">Lỗi kết nối API: ${error.message}</p>`;
    }
}

function renderProducts(items) {
    productList.innerHTML = '';
    if (items.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="static/${product.image}" alt="${product.name}" class="product-img">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

// --- Cart Logic ---
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    updateCartUI();
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

window.updateQuantity = (productId, delta) => {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) removeFromCart(productId);
        else { saveCart(); updateCartUI(); }
    }
};

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    if (cartItemsList) {
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Giỏ hàng của bạn đang trống.</p>';
            subtotalEl.textContent = '0đ';
            shippingFeeEl.textContent = '0đ';
            totalPriceEl.textContent = '0đ';
        } else {
            cartItemsList.innerHTML = '';
            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                const itemDiv = document.createElement('div');
                itemDiv.style.display = 'flex';
                itemDiv.style.gap = '1rem';
                itemDiv.style.marginBottom = '1.5rem';
                itemDiv.style.paddingBottom = '1rem';
                itemDiv.style.borderBottom = '1px solid var(--border-color)';
                itemDiv.innerHTML = `
                    <img src="static/${item.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="font-size: 0.95rem; margin-bottom: 0.25rem;">${item.name}</h4>
                        <p style="color: var(--accent-color); font-weight: 600;">${formatPrice(item.price)}</p>
                        <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-color); padding: 2px 8px; border-radius: 20px;">
                                <button onclick="updateQuantity(${item.id}, -1)" style="border:none; background:none; cursor:pointer; font-size: 1.2rem;">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)" style="border:none; background:none; cursor:pointer; font-size: 1.2rem;">+</button>
                            </div>
                            <button onclick="removeFromCart(${item.id})" style="border:none; background:none; color: var(--text-muted); cursor:pointer; font-size: 0.8rem;">Xóa</button>
                        </div>
                    </div>
                `;
                cartItemsList.appendChild(itemDiv);
            });
            subtotalEl.textContent = formatPrice(subtotal);
            shippingFeeEl.textContent = formatPrice(selectedShippingFee);
            totalPriceEl.textContent = formatPrice(subtotal + selectedShippingFee);
        }
    }
}

// --- Checkout Logic ---
async function handleCheckout() {
    if (cart.length === 0) return showToast("Giỏ hàng của bạn đang trống!", "error");
    if (!currentUser) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
        authModal.style.display = 'flex';
        showAuthForm('login');
        return;
    }

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const province = provinceSelect.value;
    const address = document.getElementById('cust-address').value.trim();

    if (!name || !phone || !province || !address) return alert("Vui lòng nhập đủ thông tin nhận hàng!");
    if (!selectedPaymentMethod) return alert("Vui lòng chọn phương thức thanh toán!");

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + selectedShippingFee;
    const deliveryTime = deliveryTimeEl.textContent.replace('Dự kiến giao hàng: ', '');
    
    try {
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: currentUser,
                customer: { name, phone, province, address },
                items: cart,
                subtotal: subtotal,
                shippingFee: selectedShippingFee,
                total: total,
                deliveryTime: deliveryTime,
                payment: { method: selectedPaymentMethod, type: selectedPaymentMethod === 'bank' ? selectedPaymentType : 'full' }
            })
        });
        const result = await response.json();
        if (result.status === 'success') {
            cart = [];
            saveCart();
            updateCartUI();
            alert(result.message);
            showSection('home');
        }
    } catch (err) { alert('Có lỗi xảy ra khi gửi đơn hàng.'); }
}

// --- Navigation ---
function showSection(section) {
    [homeSection, cartSection, adminSection, ordersSection].forEach(s => { if(s) s.style.display = 'none'; });
    
    if (section === 'cart') {
        cartSection.style.display = 'block';
        updateCartUI();
    } else if (section === 'admin') {
        adminSection.style.display = 'block';
        fetchAdminProducts();
        fetchOrders();
    } else if (section === 'orders') {
        ordersSection.style.display = 'block';
        fetchMyOrders();
    } else {
        homeSection.style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

cartBtn.addEventListener('click', () => showSection('cart'));
backToHome.addEventListener('click', () => showSection('home'));
logoBtn.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
ordersBtn.addEventListener('click', () => showSection('orders'));

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    renderProducts(filtered);
});

function formatPrice(price) { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price); }

function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === "success" ? "check-circle" : "alert-circle";
    const color = type === "success" ? "#10b981" : "#ef4444";
    toast.innerHTML = `<i data-lucide="${icon}" style="color: ${color};"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}
