// Sample data
const categories = [
    { id: 'fruits', name: 'Fruits & Veggies', img: 'https://th.bing.com/th/id/OIP.3gNj66fxOvawCBCx8HulCgHaHa?w=192&h=192&c=7&r=0&o=7&pid=1.7&rm=3' },
    { id: 'dairy', name: 'Dairy & Bakery', img: 'https://th.bing.com/th/id/OIP.8ciWVP9G1fss7gqNekOR4AHaE7?w=263&h=180&c=7&r=0&o=7&pid=1.7&rm=3https://via.placeholder.com/120x120?text=Dairy+%26+Baker' },
    { id: 'snacks', name: 'Snacks & Beverages', img: 'https://th.bing.com/th/id/OIP.u9LaVjrVvq91_2vAwK9WrwHaFs?w=180&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
    { id: 'grain', name: 'Grain', img: 'https://th.bing.com/th/id/OIP.r7xpNlA07WK4EOAmf6VwQgHaFj?w=205&h=189&c=7&r=0&o=5&pid=1.7' },
];

const products = [
    { id: 1, name: 'Banana', category: 'fruits', img: 'https://th.bing.com/th/id/OIP.YuxjfGkqy-wLrUpEILLJKQHaEO?w=322&h=183&c=7&r=0&o=7&pid=1.7&rm=3', price: 40, desc: 'Fresh bananas, 1kg.' },
    { id: 2, name: 'Apple', category: 'fruits', img: 'https://th.bing.com/th/id/OIP.9KFapq2kWMhIIPtNlpTLtgHaE7?w=296&h=197&c=7&r=0&o=7&pid=1.7&rm=3', price: 120, desc: 'Juicy apples, 1kg.' },
    { id: 3, name: 'Milk', category: 'dairy', img: 'https://th.bing.com/th/id/OIP.fkH1wAGYmmrcs19kM1CC7AHaEc?w=288&h=185&c=7&r=0&o=5&pid=1.7', price: 60, desc: 'Toned milk, 1L.' },
    { id: 4, name: 'Bread', category: 'dairy', img: 'https://th.bing.com/th/id/OIP.9jxT6nsTxIXIGmkh9-Jk7AHaHE?w=201&h=192&c=7&r=0&o=7&pid=1.7&rm=3', price: 35, desc: 'Fresh bread loaf.' },
    { id: 5, name: 'Chips', category: 'snacks', img: 'https://th.bing.com/th/id/OIP.-GbIDCev1OaVYbtwSBhUDQHaHa?w=191&h=191&c=7&r=0&o=7&pid=1.7&rm=3', price: 20, desc: 'Potato chips, 100g.' },
    { id: 6, name: 'Cola', category: 'snacks', img: 'https://th.bing.com/th/id/OIP.bCrw2o5Eygbt0Cojl2uuNAHaE8?w=272&h=181&c=7&r=0&o=7&pid=1.7&rm=3', price: 40, desc: 'Soft drink, 500ml.' },
    { id: 7, name: 'Rice', category: 'grain', img: 'https://c8.alamy.com/compfr/2wd7t4t/sachet-de-riz-basmati-micro-ondes-2wd7t4t.jpg', price: 80, desc: 'Basmati rice, 1kg.' },
    { id: 8, name: 'Atta', category: 'grain', img: 'https://th.bing.com/th/id/OIP.WqWiIOlpgLjnB5irlRv1yAHaHf?w=174&h=180&c=7&r=0&o=7&pid=1.7&rm=3', price: 50, desc: 'Wheat flour, 1kg.' },
];

// DOM elements
const categoryNav = document.getElementById('categoryNav');
const categoryList = document.getElementById('categoryList');
const productsSection = document.getElementById('products');
const productList = document.getElementById('productList');
const productsTitle = document.getElementById('productsTitle');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const addToCartBtn = document.getElementById('addToCartBtn');

let cart = [];
let customCategoryImages = {};
let customProductImages = {};

// Render category navigation
function renderCategoryNav() {
    categoryNav.innerHTML = '';
    categories.forEach(cat => {
        const li = document.createElement('li');
        li.textContent = cat.name;
        li.onclick = () => showCategory(cat.id);
        li.dataset.catid = cat.id;
        categoryNav.appendChild(li);
    });
}

// Render category cards on homepage
function renderCategoryCards() {
    categoryList.innerHTML = '';
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'category-card';
        const imgSrc = customCategoryImages[cat.id] || cat.img;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${cat.name}" id="catimg-${cat.id}" class="card-img-full">
            <div>${cat.name}</div>
        `;
        div.onclick = () => showCategory(cat.id);
        categoryList.appendChild(div);
    });
}

function renderProducts(prodArr) {
    productList.innerHTML = '';
    if (prodArr.length === 0) {
        productList.innerHTML = '<div>No products found.</div>';
        return;
    }
    prodArr.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        const imgSrc = customProductImages[prod.id] || prod.img;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${prod.name}" id="prodimg-${prod.id}" class="card-img-full">
            <div>${prod.name}</div>
            <div class="price">₹${prod.price}</div>
            <button onclick="showProductDetail(${prod.id})">View Details</button>
        `;
        productList.appendChild(div);
    });
}

// Show products for a category
function showCategory(catId) {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('categories').style.display = 'none';
    productsSection.style.display = '';
    productsTitle.textContent = categories.find(c => c.id === catId).name;
    renderProducts(products.filter(p => p.category === catId));
    // Highlight active category
    Array.from(categoryNav.children).forEach(li => {
        li.classList.toggle('active', li.dataset.catid === catId);
    });
}

// Show product detail modal
window.showProductDetail = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    modalImg.src = customProductImages[prod.id] || prod.img;
    modalTitle.textContent = prod.name;
    modalDesc.textContent = prod.desc;
    modalPrice.textContent = `₹${prod.price}`;
    productModal.style.display = 'flex';
    addToCartBtn.onclick = () => {
        cart.push(prod.id);
        updateCartCount();
        alert('Added to cart!');
    };
};

// Update cart count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Close modal
closeModal.onclick = () => productModal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === productModal) productModal.style.display = 'none';
};

// Search functionality
searchInput.oninput = function() {
    const q = this.value.trim().toLowerCase();
    if (q === '') {
        showHome();
        return;
    }
    document.getElementById('hero').style.display = 'none';
    document.getElementById('categories').style.display = 'none';
    productsSection.style.display = '';
    productsTitle.textContent = `Search results for "${q}"`;
    renderProducts(products.filter(p => p.name.toLowerCase().includes(q)));
    Array.from(categoryNav.children).forEach(li => li.classList.remove('active'));
};

// Homepage navigation
function showHome() {
    document.getElementById('hero').style.display = '';
    document.getElementById('categories').style.display = '';
    productsSection.style.display = '';
    productsTitle.textContent = 'All Products';
    renderProducts(products);
    Array.from(categoryNav.children).forEach(li => li.classList.remove('active'));
    searchInput.value = '';
}
document.querySelector('.logo').onclick = showHome;

// Login button
document.getElementById('loginBtn').onclick = function() {
    alert('Login functionality is not implemented (demo only).');
};

// Cart button
document.getElementById('cartBtn').onclick = function() {
    if (cart.length === 0) {
        alert('Cart is empty.');
        return;
    }
    // Clear previous product list
    productList.innerHTML = '';
    productsTitle.textContent = 'Cart Items';
    productsSection.style.display = '';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('categories').style.display = 'none';

    // Get unique product ids in cart
    const uniqueProductIds = [...new Set(cart)];
    // Map product ids to product objects and count quantities
    const cartProducts = uniqueProductIds.map(id => {
        const product = products.find(p => p.id === id);
        const quantity = cart.filter(pid => pid === id).length;
        return { ...product, quantity };
    });

    // Render cart products
    cartProducts.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}" class="card-img-full">
            <div>${prod.name}</div>
            <div class="price">₹${prod.price} x ${prod.quantity} = ₹${prod.price * prod.quantity}</div>
        `;
        productList.appendChild(div);
    });
};

// Initial render
renderCategoryNav();
renderCategoryCards();
showHome();
updateCartCount();
updateCartCount();
