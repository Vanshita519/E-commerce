// ============================================
// MUNNA MUNNI KIDS — Main Application
// ============================================

// === State Management ===
const Store = {
  cart: JSON.parse(localStorage.getItem('mmk_cart') || '[]'),
  user: JSON.parse(localStorage.getItem('mmk_user') || 'null'),
  orders: JSON.parse(localStorage.getItem('mmk_orders') || '[]'),
  products: JSON.parse(localStorage.getItem('mmk_products') || 'null') || [...PRODUCTS],

  saveCart() { localStorage.setItem('mmk_cart', JSON.stringify(this.cart)); },
  saveUser() { localStorage.setItem('mmk_user', JSON.stringify(this.user)); },
  saveOrders() { localStorage.setItem('mmk_orders', JSON.stringify(this.orders)); },
  saveProducts() { localStorage.setItem('mmk_products', JSON.stringify(this.products)); },

  addToCart(productId, qty = 1) {
    const existing = this.cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ id: productId, qty });
    }
    this.saveCart();
    updateCartCount();
    showCartToast(productId);
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.saveCart();
    updateCartCount();
  },

  updateCartQty(productId, qty) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveCart();
    }
  },

  getCartTotal() {
    return this.cart.reduce((total, item) => {
      const product = this.products.find(p => p.id === item.id);
      return total + (product ? product.price * item.qty : 0);
    }, 0);
  },

  getCartCount() {
    return this.cart.reduce((c, i) => c + i.qty, 0);
  },

  getProduct(id) {
    return this.products.find(p => p.id === id);
  },

  login(email, name) {
    this.user = { email, name, joined: new Date().toISOString() };
    this.saveUser();
  },

  logout() {
    this.user = null;
    this.saveUser();
  },

  placeOrder(address, paymentMethod) {
    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items: this.cart.map(i => ({ ...i, product: this.getProduct(i.id) })),
      total: this.getCartTotal(),
      address,
      paymentMethod,
      status: 'Processing',
      date: new Date().toISOString()
    };
    this.orders.unshift(order);
    this.cart = [];
    this.saveOrders();
    this.saveCart();
    updateCartCount();
    return order;
  },

  addProduct(product) {
    product.id = Date.now();
    product.rating = 4.5;
    product.reviews = 0;
    product.badges = product.badges || [];
    this.products.push(product);
    this.saveProducts();
  },

  updateProduct(id, data) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.products[idx] = { ...this.products[idx], ...data };
      this.saveProducts();
    }
  },

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts();
  }
};

// === Utility Functions ===
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function updateCartCount() {
  const count = Store.getCartCount();
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
    if (count > 0) b.classList.add('cart-bounce');
    setTimeout(() => b.classList.remove('cart-bounce'), 600);
  });
}

function showCartToast(productId) {
  const product = Store.getProduct(productId);
  if (!product) return;
  const toast = document.getElementById('cart-toast');
  toast.querySelector('.toast-text').innerHTML = `Added to Cart!<small>${product.name}</small>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// === Product Card Component ===
function renderProductCard(product) {
  const badges = product.badges.map(b => {
    const cls = b === 'new' ? 'badge-new' : b === 'sale' ? 'badge-sale' : 'badge-best';
    const label = b === 'new' ? 'New' : b === 'sale' ? 'Sale' : 'Best Seller';
    return `<span class="badge ${cls}">${label}</span>`;
  }).join('');

  const discount = product.originalPrice
    ? `<span class="original-price">${formatPrice(product.originalPrice)}</span><span class="discount-tag">${getDiscount(product.originalPrice, product.price)}% off</span>`
    : '';

  return `
    <div class="product-card reveal" onclick="navigate('#/product/${product.id}')">
      <div class="product-image-wrapper">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="product-badges">${badges}</div>
        <div class="product-actions-overlay">
          <button class="product-action-btn" onclick="event.stopPropagation(); Store.addToCart(${product.id})" title="Add to Cart">🛒</button>
          <button class="product-action-btn" onclick="event.stopPropagation(); navigate('#/product/${product.id}')" title="View Details">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${CATEGORIES.find(c => c.id === product.category)?.name || product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars">${getStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${discount}
        </div>
      </div>
    </div>
  `;
}

// === Router ===
function navigate(hash) {
  window.location.hash = hash;
}

function getRoute() {
  const hash = window.location.hash || '#/';
  const cleanHash = hash.split('?')[0]; // strip query params before routing
  const parts = cleanHash.replace('#/', '').split('/');
  return { path: parts[0] || '', param: parts[1] || '' };
}

function router() {
  const { path, param } = getRoute();
  const app = document.getElementById('app');
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Show/hide footer based on page
  const hideFooter = ['login', 'order-success'].includes(path);
  footer.style.display = hideFooter ? 'none' : 'block';

  // Show/hide navbar (always show)
  navbar.style.display = 'block';

  // Page transition
  app.style.opacity = '0';
  app.style.transform = 'translateY(10px)';

  setTimeout(() => {
    switch (path) {
      case '':
        renderHome(app);
        break;
      case 'shop':
        renderShop(app);
        break;
      case 'product':
        renderProductDetail(app, parseInt(param));
        break;
      case 'cart':
        renderCart(app);
        break;
      case 'checkout':
        renderCheckout(app);
        break;
      case 'login':
        renderAuth(app);
        break;
      case 'profile':
        renderProfile(app);
        break;
      case 'order-success':
        renderOrderSuccess(app);
        break;
      case 'admin':
        renderAdmin(app);
        break;
      default:
        renderHome(app);
    }

    // Trigger page transition
    requestAnimationFrame(() => {
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
    });

    // Init scroll animations
    initRevealAnimations();
  }, 150);
}

// === Scroll Reveal ===
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

// === Hero Slider ===
let heroInterval = null;
function initHeroSlider() {
  let current = 0;
  const slider = document.querySelector('.hero-slider');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slider || !dots.length) return;

  function goTo(idx) {
    current = idx;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, 5000);
}

// =============================================
// PAGE RENDERERS
// =============================================

// === HOME PAGE ===
function renderHome(app) {
  const heroSlides = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide">
      <div class="hero-content">
        <div class="hero-badge">${s.badge}</div>
        <h1>${s.title}</h1>
        <p>${s.description}</p>
        <div class="hero-buttons">
          <a href="${s.btnLink}" class="btn btn-primary btn-lg">${s.btnText} →</a>
          <a href="#/shop" class="btn btn-white btn-lg">Browse All</a>
        </div>
      </div>
    </div>
  `).join('');

  const heroDots = HERO_SLIDES.map((_, i) =>
    `<div class="hero-dot ${i === 0 ? 'active' : ''}"></div>`
  ).join('');

  const categoryCards = CATEGORIES.map((cat, i) => `
    <div class="category-card reveal stagger-${i + 1}" onclick="navigate('#/shop?cat=${cat.id}')">
      <div class="category-icon">${cat.icon}</div>
      <h4>${cat.name}</h4>
      <p>${cat.count} Products</p>
    </div>
  `).join('');

  const newArrivals = Store.products.filter(p => p.badges.includes('new')).slice(0, 8);
  const bestSellers = Store.products.filter(p => p.badges.includes('best')).slice(0, 8);
  const saleProducts = Store.products.filter(p => p.badges.includes('sale')).slice(0, 8);
  const featured = Store.products.filter(p => p.rating >= 4.5).slice(0, 8);

  const testimonialCards = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card reveal stagger-${i + 1}">
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initial}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-slider">${heroSlides}</div>
      <div class="hero-dots">${heroDots}</div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle">Shop by Category</span>
          <h2>Find What You Need</h2>
          <p>Browse our wide range of categories for your little ones</p>
        </div>
        <div class="categories-grid">${categoryCards}</div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section" style="background: var(--gray-50);">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle">Just In</span>
          <h2>New Arrivals</h2>
          <p>Check out the latest additions to our collection</p>
        </div>
        <div class="products-scroll">${newArrivals.map(p => renderProductCard(p)).join('')}</div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle">Most Popular</span>
          <h2>Best Sellers</h2>
          <p>Our customers' all-time favorite products</p>
        </div>
        <div class="products-grid">${bestSellers.map(p => renderProductCard(p)).join('')}</div>
      </div>
    </section>

    <!-- Sale Products -->
    <section class="section" style="background: linear-gradient(135deg, #FEF2F2, #FEE2E2);">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle" style="background: #FEE2E2; color: var(--danger);">🔥 Hot Deals</span>
          <h2>Sale Products</h2>
          <p>Grab amazing deals before they're gone!</p>
        </div>
        <div class="products-scroll">${saleProducts.map(p => renderProductCard(p)).join('')}</div>
      </div>
    </section>

    <!-- Featured -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle">Hand Picked</span>
          <h2>Featured Products</h2>
          <p>Top-rated products loved by parents everywhere</p>
        </div>
        <div class="products-grid">${featured.map(p => renderProductCard(p)).join('')}</div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background: var(--gray-50);">
      <div class="container">
        <div class="section-header reveal">
          <span class="subtitle">Testimonials</span>
          <h2>What Parents Say</h2>
          <p>Trusted by thousands of happy families across India</p>
        </div>
        <div class="testimonials-grid">${testimonialCards}</div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <h2 class="reveal">Stay Updated with Our Latest Offers!</h2>
        <p class="reveal">Subscribe to our newsletter and get 10% off on your first order</p>
        <form class="newsletter-form reveal" onsubmit="event.preventDefault(); this.querySelector('input').value = ''; alert('Thank you for subscribing! 🎉');">
          <input type="email" placeholder="Enter your email address" required>
          <button class="btn" type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  `;

  initHeroSlider();
}

// === SHOP PAGE ===
function renderShop(app) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const activeCat = urlParams.get('cat') || 'all';
  const searchQuery = urlParams.get('q') || '';

  const filterOptions = CATEGORIES.map(c => `
    <label class="filter-option ${activeCat === c.id ? 'active' : ''}">
      <input type="radio" name="category" value="${c.id}" ${activeCat === c.id ? 'checked' : ''} onchange="navigate('#/shop?cat=${c.id}')">
      ${c.name} (${c.count})
    </label>
  `).join('');

  let filtered = Store.products;
  if (activeCat !== 'all') filtered = filtered.filter(p => p.category === activeCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  const catName = activeCat === 'all' ? 'All Products' : CATEGORIES.find(c => c.id === activeCat)?.name || 'Products';

  app.innerHTML = `
    <div class="shop-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span> <span>Shop</span>
        </div>
        <div class="shop-layout">
          <aside class="shop-sidebar reveal-left">
            <div class="filter-group">
              <h4>Categories</h4>
              <label class="filter-option ${activeCat === 'all' ? 'active' : ''}">
                <input type="radio" name="category" value="all" ${activeCat === 'all' ? 'checked' : ''} onchange="navigate('#/shop')">
                All Products (${Store.products.length})
              </label>
              ${filterOptions}
            </div>
            <div class="filter-group">
              <h4>Price Range</h4>
              <label class="filter-option"><input type="checkbox"> Under ₹500</label>
              <label class="filter-option"><input type="checkbox"> ₹500 — ₹1,000</label>
              <label class="filter-option"><input type="checkbox"> ₹1,000 — ₹2,000</label>
              <label class="filter-option"><input type="checkbox"> Above ₹2,000</label>
            </div>
          </aside>
          <div>
            <div class="shop-header">
              <h2>${catName} <small style="font-weight:400; color:var(--gray-400); font-size:1rem;">(${filtered.length} products)</small></h2>
              <div class="shop-sort">
                <select id="sort-select" onchange="sortProducts(this.value)">
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>
            <div class="products-grid" id="shop-products">
              ${filtered.length ? filtered.map(p => renderProductCard(p)).join('') : `
                <div class="empty-state" style="grid-column:1/-1;">
                  <div class="empty-icon">🔍</div>
                  <h3>No Products Found</h3>
                  <p>Try adjusting your filters or search query</p>
                  <a href="#/shop" class="btn btn-primary">View All Products</a>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function sortProducts(sortBy) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const activeCat = urlParams.get('cat') || 'all';

  let filtered = Store.products;
  if (activeCat !== 'all') filtered = filtered.filter(p => p.category === activeCat);

  switch (sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  const grid = document.getElementById('shop-products');
  if (grid) {
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
    initRevealAnimations();
  }
}

// === PRODUCT DETAIL PAGE ===
function renderProductDetail(app, id) {
  const product = Store.getProduct(id);
  if (!product) {
    app.innerHTML = `<div class="empty-state" style="padding-top:150px;"><div class="empty-icon">😕</div><h3>Product Not Found</h3><a href="#/shop" class="btn btn-primary mt-3">Back to Shop</a></div>`;
    return;
  }

  const related = Store.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const thumbnails = product.images.map((img, i) => `
    <div class="product-thumbnail ${i === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
      <img src="${img}" alt="Thumbnail ${i + 1}">
    </div>
  `).join('');

  const discount = product.originalPrice
    ? `<span class="original-price">${formatPrice(product.originalPrice)}</span><span class="discount-tag">${getDiscount(product.originalPrice, product.price)}% off</span>`
    : '';

  const badges = product.badges.map(b => {
    const cls = b === 'new' ? 'badge-new' : b === 'sale' ? 'badge-sale' : 'badge-best';
    const label = b === 'new' ? 'New' : b === 'sale' ? 'Sale' : 'Best Seller';
    return `<span class="badge ${cls}">${label}</span>`;
  }).join(' ');

  app.innerHTML = `
    <div class="product-detail">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span>
          <a href="#/shop">Shop</a> <span class="separator">›</span>
          <span>${product.name}</span>
        </div>
        <div class="product-detail-grid">
          <div class="product-gallery reveal-left">
            <div class="product-main-image zoom-container" id="main-image-container"
                 onmousemove="handleZoom(event)" onmouseleave="resetZoom()">
              <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-thumbnails">${thumbnails}</div>
          </div>
          <div class="product-detail-info reveal-right">
            <div style="margin-bottom:var(--space-sm);">${badges}</div>
            <h1>${product.name}</h1>
            <div class="product-rating" style="margin-bottom:var(--space-md);">
              <span class="stars" style="font-size:1.1rem;">${getStars(product.rating)}</span>
              <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
            </div>
            <div class="product-detail-price">
              <span class="current-price">${formatPrice(product.price)}</span>
              ${discount}
            </div>
            <p class="product-detail-description">${product.description}</p>
            <div style="margin-bottom:var(--space-md);">
              <label style="font-weight:600; font-size:0.9rem; color:var(--gray-700); display:block; margin-bottom:8px;">Quantity</label>
              <div class="quantity-selector">
                <button class="qty-btn" onclick="updateQty(-1)">−</button>
                <input type="text" class="qty-value" id="product-qty" value="1" readonly>
                <button class="qty-btn" onclick="updateQty(1)">+</button>
              </div>
            </div>
            <div class="product-detail-actions">
              <button class="btn btn-primary btn-lg" onclick="addToCartFromDetail(${product.id})">🛒 Add to Cart</button>
              <button class="btn btn-outline btn-lg" onclick="buyNow(${product.id})">⚡ Buy Now</button>
            </div>
            <div style="padding:var(--space-lg); background:var(--gray-50); border-radius:var(--radius-md); margin-top:var(--space-md);">
              <div style="display:flex; gap:var(--space-xl); flex-wrap:wrap; font-size:0.9rem; color:var(--gray-600);">
                <span>🚚 Free Delivery</span>
                <span>↩️ 7 Day Return</span>
                <span>✅ Genuine Product</span>
                <span>💳 Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        ${related.length ? `
          <section class="section" style="padding-top:var(--space-3xl);">
            <div class="section-header reveal">
              <span class="subtitle">You May Also Like</span>
              <h2>Related Products</h2>
            </div>
            <div class="products-grid">${related.map(p => renderProductCard(p)).join('')}</div>
          </section>
        ` : ''}
      </div>
    </div>
  `;
}

function changeMainImage(src, thumbnail) {
  document.getElementById('main-product-image').src = src;
  document.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
}

function handleZoom(e) {
  const container = document.getElementById('main-image-container');
  const rect = container.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  container.style.setProperty('--zoom-x', x + '%');
  container.style.setProperty('--zoom-y', y + '%');
}

function resetZoom() {
  const container = document.getElementById('main-image-container');
  container.style.setProperty('--zoom-x', 'center');
  container.style.setProperty('--zoom-y', 'center');
}

function updateQty(delta) {
  const input = document.getElementById('product-qty');
  const newVal = Math.max(1, parseInt(input.value) + delta);
  input.value = newVal;
}

function addToCartFromDetail(id) {
  const qty = parseInt(document.getElementById('product-qty')?.value || 1);
  Store.addToCart(id, qty);
}

function buyNow(id) {
  const qty = parseInt(document.getElementById('product-qty')?.value || 1);
  Store.addToCart(id, qty);
  navigate('#/checkout');
}

// === CART PAGE ===
function renderCart(app) {
  if (Store.cart.length === 0) {
    app.innerHTML = `
      <div class="cart-page">
        <div class="container">
          <div class="empty-state">
            <div class="empty-icon">🛒</div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any products yet!</p>
            <a href="#/shop" class="btn btn-primary">Start Shopping</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const cartItems = Store.cart.map(item => {
    const product = Store.getProduct(item.id);
    if (!product) return '';
    return `
      <div class="cart-item reveal">
        <div class="cart-item-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p class="category-text">${CATEGORIES.find(c => c.id === product.category)?.name || ''}</p>
          <div class="cart-item-controls">
            <div class="quantity-selector">
              <button class="qty-btn" onclick="changeCartQty(${product.id}, ${item.qty - 1})">−</button>
              <input type="text" class="qty-value" value="${item.qty}" readonly>
              <button class="qty-btn" onclick="changeCartQty(${product.id}, ${item.qty + 1})">+</button>
            </div>
            <span class="cart-item-price">${formatPrice(product.price * item.qty)}</span>
            <button class="remove-btn" onclick="removeCartItem(${product.id})">✕ Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = Store.getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  app.innerHTML = `
    <div class="cart-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span> <span>Cart</span>
        </div>
        <h2 style="margin-bottom:var(--space-xl);">Shopping Cart (${Store.getCartCount()} items)</h2>
        <div class="cart-layout">
          <div>${cartItems}</div>
          <div class="cart-summary reveal-right">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>${shipping === 0 ? '<span class="text-success">Free</span>' : formatPrice(shipping)}</span>
            </div>
            ${shipping > 0 ? '<p style="font-size:0.8rem; color:var(--gray-400); margin-bottom:var(--space-md);">Free shipping on orders above ₹999</p>' : ''}
            <div class="summary-row total">
              <span>Total</span>
              <span>${formatPrice(total)}</span>
            </div>
            <a href="#/checkout" class="btn btn-primary w-full mt-3" style="display:flex;">Proceed to Checkout →</a>
            <a href="#/shop" class="btn btn-outline w-full mt-2" style="display:flex;">Continue Shopping</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function changeCartQty(id, newQty) {
  if (newQty < 1) {
    removeCartItem(id);
    return;
  }
  Store.updateCartQty(id, newQty);
  router();
}

function removeCartItem(id) {
  Store.removeFromCart(id);
  router();
}

// === CHECKOUT PAGE ===
function renderCheckout(app) {
  if (Store.cart.length === 0) {
    navigate('#/cart');
    return;
  }

  const subtotal = Store.getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const orderItems = Store.cart.map(item => {
    const p = Store.getProduct(item.id);
    if (!p) return '';
    return `
      <div style="display:flex; gap:var(--space-md); margin-bottom:var(--space-md); align-items:center;">
        <div style="width:50px; height:50px; border-radius:var(--radius-sm); overflow:hidden; flex-shrink:0;">
          <img src="${p.images[0]}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.9rem;">${p.name}</div>
          <div style="font-size:0.8rem; color:var(--gray-400);">Qty: ${item.qty}</div>
        </div>
        <div style="font-weight:700;">${formatPrice(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  app.innerHTML = `
    <div class="checkout-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span>
          <a href="#/cart">Cart</a> <span class="separator">›</span>
          <span>Checkout</span>
        </div>
        <h2 style="margin-bottom:var(--space-xl);">Checkout</h2>
        <div class="checkout-layout">
          <div class="reveal-left">
            <div style="background:white; border:1px solid var(--gray-100); border-radius:var(--radius-lg); padding:var(--space-xl); margin-bottom:var(--space-lg);">
              <h3 style="margin-bottom:var(--space-lg);">Shipping Address</h3>
              <form id="checkout-form" onsubmit="handleCheckout(event)">
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" id="ch-name" required placeholder="Enter your full name">
                  </div>
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" id="ch-phone" required placeholder="Enter phone number">
                  </div>
                </div>
                <div class="form-group">
                  <label>Address *</label>
                  <textarea id="ch-address" rows="3" required placeholder="House no., Street, Locality"></textarea>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>City *</label>
                    <input type="text" id="ch-city" required placeholder="City">
                  </div>
                  <div class="form-group">
                    <label>Pincode *</label>
                    <input type="text" id="ch-pincode" required placeholder="6-digit pincode" pattern="[0-9]{6}">
                  </div>
                </div>

                <h3 style="margin-top:var(--space-xl); margin-bottom:var(--space-md);">Payment Method</h3>
                <div class="payment-options">
                  <label class="payment-option selected" onclick="selectPayment(this)">
                    <input type="radio" name="payment" value="cod" checked>
                    <div>
                      <div class="payment-label">💵 Cash on Delivery</div>
                      <div class="payment-desc">Pay when you receive your order</div>
                    </div>
                  </label>
                  <label class="payment-option" onclick="selectPayment(this)">
                    <input type="radio" name="payment" value="online">
                    <div>
                      <div class="payment-label">💳 Online Payment</div>
                      <div class="payment-desc">Pay via UPI, Cards, Net Banking</div>
                    </div>
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-full mt-4" style="display:flex;">Place Order →</button>
              </form>
            </div>
          </div>
          <div class="cart-summary reveal-right">
            <h3>Order Summary</h3>
            <div style="margin-bottom:var(--space-lg); padding-bottom:var(--space-lg); border-bottom:1px solid var(--gray-100);">
              ${orderItems}
            </div>
            <div class="summary-row">
              <span>Subtotal</span><span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>${shipping === 0 ? '<span class="text-success">Free</span>' : formatPrice(shipping)}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span><span>${formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
}

function handleCheckout(e) {
  e.preventDefault();
  const address = {
    name: document.getElementById('ch-name').value,
    phone: document.getElementById('ch-phone').value,
    address: document.getElementById('ch-address').value,
    city: document.getElementById('ch-city').value,
    pincode: document.getElementById('ch-pincode').value
  };
  const payment = document.querySelector('input[name="payment"]:checked').value;

  Store.placeOrder(address, payment);
  navigate('#/order-success');
}

// === AUTH PAGE ===
function renderAuth(app) {
  if (Store.user) {
    navigate('#/profile');
    return;
  }

  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-card reveal-scale">
        <div style="text-align:center; margin-bottom:var(--space-xl);">
          <h2 style="margin-bottom:var(--space-xs);">Welcome to Munna Munni Kids</h2>
          <p style="color:var(--gray-500);">Sign in to your account or create a new one</p>
        </div>
        <div class="auth-tabs">
          <button class="auth-tab active" onclick="switchAuthTab('login', this)">Login</button>
          <button class="auth-tab" onclick="switchAuthTab('signup', this)">Sign Up</button>
        </div>
        <div id="auth-forms">
          <form id="login-form" onsubmit="handleLogin(event)">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="login-email" required placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" id="login-pass" required placeholder="Enter your password" minlength="6">
            </div>
            <button type="submit" class="btn btn-primary w-full" style="display:flex;">Login →</button>
          </form>
          <form id="signup-form" style="display:none;" onsubmit="handleSignup(event)">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" id="signup-name" required placeholder="Enter your full name">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" id="signup-email" required placeholder="you@example.com">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" id="signup-pass" required placeholder="Create a password" minlength="6">
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" id="signup-confirm" required placeholder="Re-enter your password" minlength="6">
            </div>
            <button type="submit" class="btn btn-primary w-full" style="display:flex;">Create Account →</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function switchAuthTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signup-form').style.display = tab === 'signup' ? 'block' : 'none';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  Store.login(email, email.split('@')[0]);
  updateAuthUI();
  navigate('#/profile');
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (pass !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  Store.login(email, name);
  updateAuthUI();
  navigate('#/profile');
}

function updateAuthUI() {
  const authLink = document.getElementById('auth-link');
  if (authLink) {
    if (Store.user) {
      authLink.innerHTML = `👤 <span>${Store.user.name}</span>`;
      authLink.href = '#/profile';
    } else {
      authLink.innerHTML = '👤 <span>Login</span>';
      authLink.href = '#/login';
    }
  }
}

// === PROFILE PAGE ===
function renderProfile(app) {
  if (!Store.user) {
    navigate('#/login');
    return;
  }

  const orderCards = Store.orders.length ? Store.orders.map(order => `
    <div class="order-card reveal">
      <div class="order-header">
        <div>
          <div class="order-id">${order.id}</div>
          <div style="font-size:0.85rem; color:var(--gray-400);">${new Date(order.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div>
        </div>
        <div>
          <span class="order-status processing">${order.status}</span>
        </div>
      </div>
      <div class="order-items">
        ${order.items.map(i => `
          <div class="order-item-thumb">
            <img src="${i.product?.images?.[0] || ''}" alt="${i.product?.name || ''}">
          </div>
        `).join('')}
      </div>
      <div style="margin-top:var(--space-md); display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.9rem; color:var(--gray-500);">${order.items.length} item(s) • ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
        <span style="font-family:var(--font-heading); font-weight:700; font-size:1.1rem;">${formatPrice(order.total)}</span>
      </div>
    </div>
  `).join('') : `
    <div class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>No Orders Yet</h3>
      <p>Your order history will appear here once you place an order</p>
      <a href="#/shop" class="btn btn-primary">Start Shopping</a>
    </div>
  `;

  app.innerHTML = `
    <div class="profile-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span> <span>Profile</span>
        </div>
        <div class="profile-header reveal">
          <div class="profile-avatar">${Store.user.name.charAt(0).toUpperCase()}</div>
          <div class="profile-info">
            <h2>${Store.user.name}</h2>
            <p>${Store.user.email}</p>
          </div>
          <button class="btn btn-outline" style="margin-left:auto; border-color:rgba(255,255,255,0.3); color:white;"
                  onclick="Store.logout(); updateAuthUI(); navigate('#/');">Logout</button>
        </div>
        <h3 style="margin-bottom:var(--space-lg);">Order History</h3>
        ${orderCards}
      </div>
    </div>
  `;
}

// === ORDER SUCCESS PAGE ===
function renderOrderSuccess(app) {
  const lastOrder = Store.orders[0];
  app.innerHTML = `
    <div class="order-success-page">
      <div class="success-card reveal-scale">
        <div class="success-icon success-animated">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.
        ${lastOrder ? `<br>Order ID: <strong>${lastOrder.id}</strong>` : ''}
        ${lastOrder?.paymentMethod === 'cod' ? '<br>Payment: Cash on Delivery' : ''}
        </p>
        <p style="color:var(--gray-500); font-size:0.95rem;">We'll send you an update when your order ships. You can track your order in your profile.</p>
        <div style="display:flex; gap:var(--space-md); justify-content:center; margin-top:var(--space-xl); flex-wrap:wrap;">
          <a href="#/" class="btn btn-primary">Continue Shopping</a>
          ${Store.user ? '<a href="#/profile" class="btn btn-outline">View Orders</a>' : ''}
        </div>
      </div>
    </div>
  `;
}

// === ADMIN PAGE ===
function renderAdmin(app) {
  const rows = Store.products.map(p => `
    <tr>
      <td><div class="product-thumb"><img src="${p.images[0]}" alt="${p.name}"></div></td>
      <td><strong>${p.name}</strong></td>
      <td>${CATEGORIES.find(c => c.id === p.category)?.name || p.category}</td>
      <td>${formatPrice(p.price)}</td>
      <td>${p.originalPrice ? formatPrice(p.originalPrice) : '—'}</td>
      <td>
        <div class="admin-actions">
          <button class="edit-btn" onclick="editProduct(${p.id})">✏️ Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${p.id})">🗑 Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  app.innerHTML = `
    <div class="admin-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a> <span class="separator">›</span> <span>Admin Panel</span>
        </div>
        <div class="admin-header">
          <h2>Admin Panel — Product Management</h2>
          <button class="btn btn-primary" onclick="openProductModal()">+ Add Product</button>
        </div>
        <div style="overflow-x:auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="product-modal">
      <div class="modal">
        <div class="modal-header">
          <h3 id="modal-title">Add New Product</h3>
          <button class="modal-close" onclick="closeProductModal()">✕</button>
        </div>
        <form id="product-form" onsubmit="handleProductSubmit(event)">
          <input type="hidden" id="pf-id" value="">
          <div class="form-group">
            <label>Product Name *</label>
            <input type="text" id="pf-name" required placeholder="Enter product name">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Price (₹) *</label>
              <input type="number" id="pf-price" required placeholder="499" min="1">
            </div>
            <div class="form-group">
              <label>Original Price (₹)</label>
              <input type="number" id="pf-original-price" placeholder="999 (leave blank if no sale)">
            </div>
          </div>
          <div class="form-group">
            <label>Category *</label>
            <select id="pf-category" required>
              <option value="">Select Category</option>
              ${CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea id="pf-description" rows="3" required placeholder="Product description"></textarea>
          </div>
          <div class="form-group">
            <label>Image URL 1 *</label>
            <input type="url" id="pf-img1" required placeholder="https://...">
          </div>
          <div class="form-group">
            <label>Image URL 2</label>
            <input type="url" id="pf-img2" placeholder="https://...">
          </div>
          <div class="form-group">
            <label>Image URL 3</label>
            <input type="url" id="pf-img3" placeholder="https://...">
          </div>
          <div class="form-group">
            <label>Badges</label>
            <div style="display:flex; gap:var(--space-md);">
              <label class="filter-option"><input type="checkbox" id="pf-badge-new" value="new"> New</label>
              <label class="filter-option"><input type="checkbox" id="pf-badge-sale" value="sale"> Sale</label>
              <label class="filter-option"><input type="checkbox" id="pf-badge-best" value="best"> Best Seller</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-full" style="display:flex;">Save Product</button>
        </form>
      </div>
    </div>
  `;
}

function openProductModal(product = null) {
  const modal = document.getElementById('product-modal');
  modal.classList.add('active');
  document.getElementById('modal-title').textContent = product ? 'Edit Product' : 'Add New Product';

  if (product) {
    document.getElementById('pf-id').value = product.id;
    document.getElementById('pf-name').value = product.name;
    document.getElementById('pf-price').value = product.price;
    document.getElementById('pf-original-price').value = product.originalPrice || '';
    document.getElementById('pf-category').value = product.category;
    document.getElementById('pf-description').value = product.description;
    document.getElementById('pf-img1').value = product.images[0] || '';
    document.getElementById('pf-img2').value = product.images[1] || '';
    document.getElementById('pf-img3').value = product.images[2] || '';
    document.getElementById('pf-badge-new').checked = product.badges.includes('new');
    document.getElementById('pf-badge-sale').checked = product.badges.includes('sale');
    document.getElementById('pf-badge-best').checked = product.badges.includes('best');
  } else {
    document.getElementById('product-form').reset();
    document.getElementById('pf-id').value = '';
  }
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('active');
}

function editProduct(id) {
  const product = Store.getProduct(id);
  if (product) openProductModal(product);
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    Store.deleteProduct(id);
    router();
  }
}

function handleProductSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('pf-id').value;
  const badges = [];
  if (document.getElementById('pf-badge-new').checked) badges.push('new');
  if (document.getElementById('pf-badge-sale').checked) badges.push('sale');
  if (document.getElementById('pf-badge-best').checked) badges.push('best');

  const img1 = document.getElementById('pf-img1').value;
  const img2 = document.getElementById('pf-img2').value || img1;
  const img3 = document.getElementById('pf-img3').value || img1;

  const data = {
    name: document.getElementById('pf-name').value,
    price: parseInt(document.getElementById('pf-price').value),
    originalPrice: document.getElementById('pf-original-price').value ? parseInt(document.getElementById('pf-original-price').value) : null,
    category: document.getElementById('pf-category').value,
    description: document.getElementById('pf-description').value,
    images: [img1, img2, img3],
    badges
  };

  if (id) {
    Store.updateProduct(parseInt(id), data);
  } else {
    Store.addProduct(data);
  }

  closeProductModal();
  router();
}

// === SEARCH ===
function handleSearch(e) {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) navigate('#/shop?q=' + encodeURIComponent(q));
  }
}

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// === INIT ===
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateAuthUI();
  router();
});
