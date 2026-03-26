// ============================================
// MUNNA MUNNI KIDS — Product Data
// ============================================

const CATEGORIES = [
  { id: 'kids-clothing', name: 'Kids Clothing', icon: '👕', count: 8 },
  { id: 'toys', name: 'Toys', icon: '🧸', count: 7 },
  { id: 'baby-products', name: 'Baby Products', icon: '🍼', count: 6 },
  { id: 'footwear', name: 'Footwear', icon: '👟', count: 5 },
  { id: 'school-items', name: 'School Items', icon: '🎒', count: 6 }
];

const PRODUCTS = [
  // Kids Clothing
  {
    id: 1, name: 'Rainbow Stripe T-Shirt', price: 499, originalPrice: 799,
    description: 'Colorful rainbow stripe cotton t-shirt perfect for everyday wear. Made from 100% premium cotton, soft and breathable. Machine washable and retains color after multiple washes.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500',
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?w=500'
    ],
    badges: ['sale'], rating: 4.5, reviews: 128
  },
  {
    id: 2, name: 'Denim Dungaree Set', price: 1299, originalPrice: null,
    description: 'Adorable denim dungaree set with soft cotton inner t-shirt. Perfect for casual outings and celebrations. Adjustable straps for a comfortable fit.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'
    ],
    badges: ['new'], rating: 4.8, reviews: 56
  },
  {
    id: 3, name: 'Floral Summer Dress', price: 899, originalPrice: 1299,
    description: 'Beautiful floral print summer dress for little girls. Lightweight fabric keeps your child cool during hot summers. Features an elegant bow detail at the back.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500'
    ],
    badges: ['sale', 'best'], rating: 4.7, reviews: 234
  },
  {
    id: 4, name: 'Cotton Pajama Set', price: 649, originalPrice: null,
    description: 'Super soft cotton pajama set with cute animal prints. Perfect for a cozy night\'s sleep. Elastic waistband for comfort.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500'
    ],
    badges: ['new'], rating: 4.3, reviews: 89
  },
  {
    id: 5, name: 'Party Wear Suit', price: 1899, originalPrice: 2499,
    description: 'Elegant party wear suit for boys. Includes blazer, shirt, and trousers. Perfect for weddings and special occasions.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500'
    ],
    badges: ['sale'], rating: 4.6, reviews: 145
  },
  {
    id: 6, name: 'Winter Jacket Kids', price: 1599, originalPrice: null,
    description: 'Warm and stylish winter jacket with fleece lining. Water-resistant outer layer. Perfect for chilly winter days.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?w=500'
    ],
    badges: ['best'], rating: 4.9, reviews: 312
  },
  {
    id: 7, name: 'Printed Shorts Set', price: 399, originalPrice: 599,
    description: 'Vibrant printed shorts with matching t-shirt. Breathable cotton fabric. Ideal for playtime and outdoor activities.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500'
    ],
    badges: ['sale'], rating: 4.2, reviews: 67
  },
  {
    id: 8, name: 'Ethnic Wear Kurta Set', price: 1099, originalPrice: null,
    description: 'Traditional kurta set with churidar for festive occasions. Beautiful embroidery work. Comfortable cotton blend fabric.',
    category: 'kids-clothing',
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
      'https://images.unsplash.com/photo-1560506840-ec148e82a604?w=500',
      'https://images.unsplash.com/photo-1543854589-fdd4d3a0d181?w=500'
    ],
    badges: ['new'], rating: 4.4, reviews: 178
  },

  // Toys
  {
    id: 9, name: 'Building Blocks Set (100 Pcs)', price: 799, originalPrice: 1199,
    description: 'Creative building blocks set with 100 colorful pieces. Develops creativity and motor skills. Non-toxic and child-safe materials.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500'
    ],
    badges: ['sale', 'best'], rating: 4.8, reviews: 456
  },
  {
    id: 10, name: 'Remote Control Car', price: 1499, originalPrice: null,
    description: 'High-speed remote control car with LED lights. Rechargeable battery. Drift mode and 360-degree rotation features.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1581235707960-276e26b6e5b5?w=500',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500'
    ],
    badges: ['new'], rating: 4.5, reviews: 210
  },
  {
    id: 11, name: 'Soft Teddy Bear (Large)', price: 999, originalPrice: 1499,
    description: 'Super soft and huggable large teddy bear. Premium quality plush material. Makes a perfect gift for any occasion.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500'
    ],
    badges: ['sale'], rating: 4.7, reviews: 389
  },
  {
    id: 12, name: 'Kitchen Play Set', price: 1899, originalPrice: null,
    description: 'Complete kitchen play set with realistic accessories. Includes utensils, pots, and food items. Promotes imaginative play.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500'
    ],
    badges: ['best'], rating: 4.6, reviews: 167
  },
  {
    id: 13, name: 'Puzzle Set (500 Pcs)', price: 599, originalPrice: null,
    description: 'Educational puzzle set with 500 pieces featuring world map design. Improves cognitive skills and patience.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500'
    ],
    badges: [], rating: 4.3, reviews: 98
  },
  {
    id: 14, name: 'Musical Drum Set', price: 1299, originalPrice: 1799,
    description: 'Kids musical drum set with multiple sound effects. LED lights and multiple play modes. Develops musical interest.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500',
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500',
      'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500'
    ],
    badges: ['sale'], rating: 4.4, reviews: 201
  },
  {
    id: 15, name: 'Doll House with Furniture', price: 2499, originalPrice: null,
    description: 'Beautiful two-story doll house with complete furniture set. Includes miniature family dolls. Perfect for creative play.',
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
      'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=500',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500'
    ],
    badges: ['new'], rating: 4.9, reviews: 78
  },

  // Baby Products
  {
    id: 16, name: 'Baby Feeding Bottle Set', price: 599, originalPrice: 899,
    description: 'BPA-free baby feeding bottle set (3 bottles). Anti-colic design prevents gas and fussiness. Easy to clean and sterilize.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'
    ],
    badges: ['sale'], rating: 4.6, reviews: 345
  },
  {
    id: 17, name: 'Baby Diaper Bag', price: 1299, originalPrice: null,
    description: 'Stylish and functional diaper bag with multiple compartments. Waterproof lining. Includes changing pad and bottle holder.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'
    ],
    badges: ['best'], rating: 4.8, reviews: 567
  },
  {
    id: 18, name: 'Baby Walker', price: 1999, originalPrice: 2799,
    description: 'Adjustable baby walker with activity tray. Musical toys and lights. Helps baby learn to walk safely.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500'
    ],
    badges: ['sale'], rating: 4.5, reviews: 234
  },
  {
    id: 19, name: 'Baby Blanket Set', price: 799, originalPrice: null,
    description: 'Ultra-soft baby blanket set (2 pieces). Made from organic cotton. Hypoallergenic and gentle on baby\'s skin.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500'
    ],
    badges: ['new'], rating: 4.7, reviews: 189
  },
  {
    id: 20, name: 'Baby Stroller', price: 4999, originalPrice: 6999,
    description: 'Lightweight foldable baby stroller with canopy. 360-degree wheels for smooth navigation. 5-point safety harness.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500'
    ],
    badges: ['sale', 'best'], rating: 4.9, reviews: 678
  },
  {
    id: 21, name: 'Baby Bath Tub', price: 899, originalPrice: null,
    description: 'Ergonomic baby bath tub with temperature indicator. Non-slip surface. Drain plug for easy water release.',
    category: 'baby-products',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500'
    ],
    badges: [], rating: 4.4, reviews: 156
  },

  // Footwear
  {
    id: 22, name: 'Light-Up Sneakers', price: 999, originalPrice: 1499,
    description: 'Fun LED light-up sneakers for kids. Rechargeable via USB. Multiple color modes. Comfortable and durable.',
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    badges: ['sale', 'best'], rating: 4.8, reviews: 445
  },
  {
    id: 23, name: 'Canvas School Shoes', price: 699, originalPrice: null,
    description: 'Classic canvas school shoes with rubber sole. Lightweight and comfortable for all-day wear. Easy velcro closure.',
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'
    ],
    badges: [], rating: 4.3, reviews: 234
  },
  {
    id: 24, name: 'Sandals with Strap', price: 549, originalPrice: 799,
    description: 'Comfortable sandals with adjustable straps. Anti-slip sole for safety. Perfect for summer and beach outings.',
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500'
    ],
    badges: ['sale'], rating: 4.5, reviews: 167
  },
  {
    id: 25, name: 'Rain Boots Kids', price: 849, originalPrice: null,
    description: 'Waterproof rain boots with fun prints. Soft inner lining. Easy pull-on handles for kids.',
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'
    ],
    badges: ['new'], rating: 4.6, reviews: 89
  },
  {
    id: 26, name: 'Sports Running Shoes', price: 1199, originalPrice: 1699,
    description: 'High-performance running shoes for active kids. Breathable mesh upper. Cushioned sole for all-day comfort.',
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500'
    ],
    badges: ['sale', 'best'], rating: 4.7, reviews: 312
  },

  // School Items
  {
    id: 27, name: 'Cartoon Print Backpack', price: 899, originalPrice: 1299,
    description: 'Colorful cartoon print school backpack with multiple compartments. Padded shoulder straps for comfort. Water-resistant material.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500'
    ],
    badges: ['sale'], rating: 4.5, reviews: 287
  },
  {
    id: 28, name: 'Stationery Set Deluxe', price: 499, originalPrice: null,
    description: 'Complete stationery set with pencils, erasers, sharpeners, rulers, and colorful pens. Comes in a beautiful carry case.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500'
    ],
    badges: ['best'], rating: 4.4, reviews: 198
  },
  {
    id: 29, name: 'Insulated Lunch Box', price: 699, originalPrice: 999,
    description: 'Insulated lunch box with 3 compartments. Keeps food warm for hours. BPA-free and leak-proof design.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500'
    ],
    badges: ['sale'], rating: 4.6, reviews: 345
  },
  {
    id: 30, name: 'Water Bottle with Straw', price: 349, originalPrice: null,
    description: 'BPA-free water bottle with flip straw. 500ml capacity. Leak-proof and easy to carry. Available in fun colors.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500'
    ],
    badges: ['new'], rating: 4.3, reviews: 123
  },
  {
    id: 31, name: 'Geometry Box Set', price: 299, originalPrice: 449,
    description: 'Complete geometry box with compass, protractor, set squares, and divider. High-quality metal instruments.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    badges: ['sale'], rating: 4.2, reviews: 87
  },
  {
    id: 32, name: 'Art & Craft Kit', price: 1199, originalPrice: null,
    description: 'Complete art and craft kit with paints, brushes, canvas, coloring books, and craft materials. 150+ pieces included.',
    category: 'school-items',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165b42?w=500'
    ],
    badges: ['new', 'best'], rating: 4.8, reviews: 412
  }
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    initial: 'P',
    role: 'Mother of 2',
    text: 'Absolutely love the quality of clothes from Munna Munni Kids! My kids are always excited when their new clothes arrive. The fabric is so soft and colors stay vibrant even after multiple washes.'
  },
  {
    name: 'Rahul Verma',
    initial: 'R',
    role: 'Father of 1',
    text: 'The toys from this store are amazing! Built to last and completely safe for kids. My son\'s building blocks set has been his favorite toy for months now. Highly recommended!'
  },
  {
    name: 'Sneha Patel',
    initial: 'S',
    role: 'Mother of 3',
    text: 'Best online store for kids\' products. Fast delivery, great packaging, and the products are exactly as described. The school items collection is fantastic. My go-to shop for all kid needs!'
  }
];

const HERO_SLIDES = [
  {
    badge: '🎉 New Collection 2026',
    title: 'Dress Your Kids in <span class="text-primary">Style & Comfort</span>',
    description: 'Discover our latest collection of premium kids clothing, toys, and accessories. Quality products that make your little ones smile!',
    btnText: 'Shop Now',
    btnLink: '#/shop'
  },
  {
    badge: '🔥 Mega Sale — Up to 50% Off',
    title: 'Big Savings on <span class="text-primary">Kids Favorites</span>',
    description: 'Don\'t miss out on incredible deals! Shop toys, clothing, footwear and more at unbeatable prices. Limited time offer!',
    btnText: 'View Deals',
    btnLink: '#/shop'
  },
  {
    badge: '⭐ Premium Quality',
    title: 'Safe & Fun <span class="text-primary">Toys for Every Age</span>',
    description: 'From building blocks to remote control cars, find the perfect toy that sparks creativity and brings joy to your child.',
    btnText: 'Explore Toys',
    btnLink: '#/shop'
  }
];
