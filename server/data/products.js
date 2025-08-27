// Generated product data for SS Stores
// 1500 products evenly distributed across 7 categories (214-215 products each)

const generateProducts = () => {
  const categories = {
    menswear: {
      name: 'Menswear',
      items: [
        'T-Shirt', 'Shirt', 'Jeans', 'Chinos', 'Hoodie', 'Sweater', 'Jacket', 'Blazer', 'Polo', 'Tank Top',
        'Shorts', 'Tracksuit', 'Suit', 'Vest', 'Cardigan', 'Sweatshirt', 'Joggers', 'Cargo Pants', 'Dress Shirt', 'Henley'
      ],
      brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren', 'Gap'],
      colors: ['Black', 'White', 'Navy', 'Gray', 'Blue', 'Red', 'Green', 'Khaki', 'Brown', 'Burgundy']
    },
    womenwear: {
      name: 'Womenwear',
      items: [
        'Dress', 'Blouse', 'Skirt', 'Jeans', 'Top', 'Sweater', 'Cardigan', 'Jacket', 'Pants', 'Jumpsuit',
        'Blazer', 'T-Shirt', 'Tank Top', 'Shorts', 'Leggings', 'Coat', 'Hoodie', 'Tunic', 'Kimono', 'Romper'
      ],
      brands: ['Zara', 'H&M', 'Forever 21', 'Mango', 'ASOS', 'Uniqlo', 'Gap', 'Banana Republic', 'Ann Taylor', 'Loft'],
      colors: ['Black', 'White', 'Pink', 'Red', 'Blue', 'Navy', 'Beige', 'Gray', 'Purple', 'Green']
    },
    footwear: {
      name: 'Footwear',
      items: [
        'Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats', 'Loafers', 'Oxford', 'Running Shoes', 'Dress Shoes', 'Casual Shoes',
        'Ankle Boots', 'Pumps', 'Wedges', 'Slip-ons', 'High Tops', 'Basketball Shoes', 'Hiking Boots', 'Ballet Flats', 'Moccasins', 'Espadrilles'
      ],
      brands: ['Nike', 'Adidas', 'Converse', 'Vans', 'Puma', 'New Balance', 'Reebok', 'Timberland', 'Dr. Martens', 'Clarks'],
      colors: ['Black', 'White', 'Brown', 'Tan', 'Navy', 'Gray', 'Red', 'Blue', 'Green', 'Pink']
    },
    home: {
      name: 'Home',
      items: [
        'Cushion', 'Throw Blanket', 'Candle', 'Vase', 'Picture Frame', 'Lamp', 'Mirror', 'Rug', 'Curtains', 'Plant Pot',
        'Wall Art', 'Storage Box', 'Decorative Bowl', 'Clock', 'Bookend', 'Coaster Set', 'Table Runner', 'Pillow Cover', 'Ornament', 'Basket'
      ],
      brands: ['IKEA', 'West Elm', 'Target', 'HomeGoods', 'Pottery Barn', 'CB2', 'Urban Outfitters', 'Anthropologie', 'World Market', 'Wayfair'],
      colors: ['White', 'Beige', 'Gray', 'Black', 'Navy', 'Gold', 'Silver', 'Green', 'Blue', 'Pink']
    },
    electronics: {
      name: 'Electronics',
      items: [
        'Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Speaker', 'Smartwatch', 'Camera', 'Gaming Console', 'Monitor', 'Keyboard',
        'Mouse', 'Charger', 'Power Bank', 'Earbuds', 'Webcam', 'Hard Drive', 'USB Cable', 'Phone Case', 'Screen Protector', 'Adapter'
      ],
      brands: ['Apple', 'Samsung', 'Sony', 'LG', 'HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Microsoft'],
      colors: ['Black', 'White', 'Silver', 'Space Gray', 'Rose Gold', 'Blue', 'Red', 'Green', 'Purple', 'Gold']
    },
    lifestyle: {
      name: 'Lifestyle',
      items: [
        'Backpack', 'Wallet', 'Sunglasses', 'Watch', 'Jewelry', 'Perfume', 'Handbag', 'Scarf', 'Hat', 'Belt',
        'Umbrella', 'Travel Mug', 'Water Bottle', 'Notebook', 'Pen Set', 'Keychain', 'Phone Holder', 'Luggage', 'Tote Bag', 'Crossbody Bag'
      ],
      brands: ['Coach', 'Michael Kors', 'Kate Spade', 'Fossil', 'Ray-Ban', 'Oakley', 'Tumi', 'Samsonite', 'Herschel', 'JanSport'],
      colors: ['Black', 'Brown', 'Tan', 'Navy', 'Red', 'Pink', 'White', 'Gray', 'Gold', 'Silver']
    },
    fitness: {
      name: 'Fitness',
      items: [
        'Yoga Mat', 'Dumbbells', 'Resistance Bands', 'Water Bottle', 'Gym Bag', 'Protein Shaker', 'Fitness Tracker', 'Jump Rope', 'Foam Roller', 'Kettlebell',
        'Exercise Ball', 'Yoga Block', 'Workout Gloves', 'Ankle Weights', 'Pull-up Bar', 'Ab Wheel', 'Balance Board', 'Massage Ball', 'Stretching Strap', 'Weight Plates'
      ],
      brands: ['Nike', 'Adidas', 'Under Armour', 'Lululemon', 'Reebok', 'Puma', 'Fitbit', 'Garmin', 'TRX', 'Bowflex'],
      colors: ['Black', 'Gray', 'Blue', 'Pink', 'Purple', 'Green', 'Red', 'White', 'Orange', 'Yellow']
    }
  };

  const products = [];
  let productId = 1;

  // Generate approximately 214 products per category (1498 total, close to 1500)
  Object.keys(categories).forEach(categoryKey => {
    const category = categories[categoryKey];
    
    for (let i = 0; i < 214; i++) {
      const item = category.items[Math.floor(Math.random() * category.items.length)];
      const brand = category.brands[Math.floor(Math.random() * category.brands.length)];
      const color = category.colors[Math.floor(Math.random() * category.colors.length)];
      
      const basePrice = Math.floor(Math.random() * 200) + 20; // $20-$220
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0; // 30% chance of 5-35% discount
      const originalPrice = discount > 0 ? Math.floor(basePrice / (1 - discount / 100)) : basePrice;
      
      const product = {
        id: productId++,
        title: `${brand} ${color} ${item}`,
        category: categoryKey,
        categoryName: category.name,
        brand: brand,
        color: color,
        price: basePrice,
        originalPrice: originalPrice,
        discount: discount,
        description: generateDescription(item, brand, color, categoryKey),
        image: `/images/${categoryKey}/${item.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 5) + 1}.jpg`,
        images: [
          `/images/${categoryKey}/${item.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 5) + 1}.jpg`,
          `/images/${categoryKey}/${item.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 5) + 1}.jpg`,
          `/images/${categoryKey}/${item.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 5) + 1}.jpg`
        ],
        stock: Math.floor(Math.random() * 100) + 10, // 10-110 items in stock
        inStock: true,
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0 rating
        reviews: Math.floor(Math.random() * 500) + 10, // 10-510 reviews
        tags: generateTags(item, categoryKey),
        sizes: generateSizes(categoryKey),
        featured: Math.random() > 0.9, // 10% chance of being featured
        newArrival: Math.random() > 0.8, // 20% chance of being new arrival
        bestseller: Math.random() > 0.85 // 15% chance of being bestseller
      };
      
      products.push(product);
    }
  });

  return products;
};

const generateDescription = (item, brand, color, category) => {
  const descriptions = {
    menswear: [
      `Premium quality ${item.toLowerCase()} from ${brand}. Crafted with attention to detail and modern styling.`,
      `Comfortable and stylish ${item.toLowerCase()} perfect for everyday wear. Made with high-quality materials.`,
      `Classic ${item.toLowerCase()} with a contemporary twist. Versatile piece that pairs well with any outfit.`
    ],
    womenwear: [
      `Elegant ${item.toLowerCase()} designed for the modern woman. Features flattering fit and premium fabric.`,
      `Chic and versatile ${item.toLowerCase()} that transitions seamlessly from day to night.`,
      `Stylish ${item.toLowerCase()} with contemporary design elements. Perfect for any occasion.`
    ],
    footwear: [
      `Comfortable ${item.toLowerCase()} with superior cushioning and support. Perfect for all-day wear.`,
      `Stylish ${item.toLowerCase()} that combines fashion and function. Durable construction for long-lasting wear.`,
      `Premium ${item.toLowerCase()} with excellent grip and comfort. Ideal for both casual and active wear.`
    ],
    home: [
      `Beautiful ${item.toLowerCase()} that adds style and functionality to your living space.`,
      `Quality home decor piece that complements any interior design style.`,
      `Elegant ${item.toLowerCase()} crafted with attention to detail and superior materials.`
    ],
    electronics: [
      `Latest ${item.toLowerCase()} with advanced features and reliable performance.`,
      `High-quality ${item.toLowerCase()} designed for modern lifestyle and connectivity needs.`,
      `Innovative ${item.toLowerCase()} with cutting-edge technology and user-friendly design.`
    ],
    lifestyle: [
      `Premium ${item.toLowerCase()} that combines style and practicality for everyday use.`,
      `Elegant accessory that adds sophistication to your personal style.`,
      `Quality ${item.toLowerCase()} designed for the modern lifestyle with attention to detail.`
    ],
    fitness: [
      `Professional-grade ${item.toLowerCase()} designed for optimal performance and durability.`,
      `High-quality fitness equipment that helps you achieve your workout goals.`,
      `Durable ${item.toLowerCase()} perfect for home workouts and gym sessions.`
    ]
  };

  const categoryDescriptions = descriptions[category] || descriptions.menswear;
  const baseDescription = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
  
  return `${baseDescription} Available in ${color.toLowerCase()} color. This ${brand} ${item.toLowerCase()} offers exceptional value and quality construction. Perfect for those who appreciate both style and functionality.`;
};

const generateTags = (item, category) => {
  const baseTags = [item.toLowerCase(), category];
  const additionalTags = {
    menswear: ['casual', 'formal', 'comfortable', 'stylish', 'cotton', 'denim'],
    womenwear: ['elegant', 'chic', 'trendy', 'comfortable', 'versatile', 'fashionable'],
    footwear: ['comfortable', 'durable', 'athletic', 'casual', 'walking', 'running'],
    home: ['decorative', 'modern', 'cozy', 'stylish', 'functional', 'contemporary'],
    electronics: ['tech', 'gadget', 'wireless', 'portable', 'smart', 'digital'],
    lifestyle: ['accessory', 'premium', 'luxury', 'practical', 'travel', 'everyday'],
    fitness: ['workout', 'exercise', 'training', 'gym', 'health', 'active']
  };

  const categoryTags = additionalTags[category] || [];
  const randomTags = categoryTags.slice(0, Math.floor(Math.random() * 3) + 2);
  
  return [...baseTags, ...randomTags];
};

const generateSizes = (category) => {
  const sizeOptions = {
    menswear: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    womenwear: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    footwear: ['6', '7', '8', '9', '10', '11', '12'],
    home: ['Small', 'Medium', 'Large'],
    electronics: ['32GB', '64GB', '128GB', '256GB'],
    lifestyle: ['One Size', 'Small', 'Medium', 'Large'],
    fitness: ['Light', 'Medium', 'Heavy']
  };

  return sizeOptions[category] || ['One Size'];
};

module.exports = generateProducts();
