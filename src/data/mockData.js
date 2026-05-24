// Mock data for VendorBridge - used when Firebase is not configured

export const MOCK_SUPPLIERS = [
  {
    id: 's1',
    name: 'Ram Agro Traders',
    location: 'Azadpur Mandi, Delhi',
    category: 'Vegetables & Grains',
    rating: 4.8,
    verified: true,
    totalProducts: 24,
    email: 'ram@agrotraders.in',
    phone: '+91 98100 12345',
    joinedAt: '2024-01-15',
    avatar: '🌾',
  },
  {
    id: 's2',
    name: 'Spice Route Wholesale',
    location: 'Khari Baoli, Delhi',
    category: 'Spices & Condiments',
    rating: 4.6,
    verified: true,
    totalProducts: 38,
    email: 'info@spiceroute.in',
    phone: '+91 98200 23456',
    joinedAt: '2024-02-20',
    avatar: '🌶️',
  },
  {
    id: 's3',
    name: 'Mumbai Oil & Fats Co.',
    location: 'Dadar Market, Mumbai',
    category: 'Oils & Fats',
    rating: 4.5,
    verified: true,
    totalProducts: 12,
    email: 'sales@mumbaioil.in',
    phone: '+91 99300 34567',
    joinedAt: '2024-03-10',
    avatar: '🫙',
  },
  {
    id: 's4',
    name: 'Krishnam Dairy Farms',
    location: 'Anand, Gujarat',
    category: 'Dairy Products',
    rating: 4.9,
    verified: true,
    totalProducts: 18,
    email: 'krishnam@dairy.in',
    phone: '+91 97400 45678',
    joinedAt: '2024-01-28',
    avatar: '🥛',
  },
  {
    id: 's5',
    name: 'Bengal Flour Mills',
    location: 'Howrah, Kolkata',
    category: 'Flour & Grains',
    rating: 4.4,
    verified: false,
    totalProducts: 8,
    email: 'bengal@flourmills.in',
    phone: '+91 96500 56789',
    joinedAt: '2024-04-05',
    avatar: '🌾',
  },
  {
    id: 's6',
    name: 'Chennai Masala House',
    location: 'T. Nagar, Chennai',
    category: 'Spices & Condiments',
    rating: 4.7,
    verified: true,
    totalProducts: 45,
    email: 'masala@chennaihouse.in',
    phone: '+91 95600 67890',
    joinedAt: '2024-02-14',
    avatar: '🫚',
  },
];

export const MOCK_PRODUCTS = [
  // Vegetables & Grains
  {
    id: 'p1', supplierId: 's1', supplierName: 'Ram Agro Traders',
    name: 'Basmati Rice', category: 'Grains', price: 68, unit: 'kg',
    stock: 500, location: 'Delhi', image: '🍚',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [62, 64, 66, 65, 68, 67, 68],
  },
  {
    id: 'p2', supplierId: 's1', supplierName: 'Ram Agro Traders',
    name: 'Toor Dal', category: 'Pulses', price: 115, unit: 'kg',
    stock: 300, location: 'Delhi', image: '🫘',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [108, 110, 112, 113, 115, 114, 115],
  },
  {
    id: 'p3', supplierId: 's1', supplierName: 'Ram Agro Traders',
    name: 'Potato (Grade A)', category: 'Vegetables', price: 28, unit: 'kg',
    stock: 20, location: 'Delhi', image: '🥔',
    status: 'Low Stock', updatedAt: new Date().toISOString(),
    priceHistory: [24, 26, 27, 28, 29, 28, 28],
  },
  {
    id: 'p4', supplierId: 's1', supplierName: 'Ram Agro Traders',
    name: 'Onion', category: 'Vegetables', price: 35, unit: 'kg',
    stock: 600, location: 'Delhi', image: '🧅',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [20, 25, 30, 35, 38, 36, 35],
  },

  // Spices
  {
    id: 'p5', supplierId: 's2', supplierName: 'Spice Route Wholesale',
    name: 'Turmeric Powder', category: 'Spices', price: 180, unit: 'kg',
    stock: 80, location: 'Delhi', image: '🟡',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [170, 174, 176, 178, 180, 179, 180],
  },
  {
    id: 'p6', supplierId: 's2', supplierName: 'Spice Route Wholesale',
    name: 'Red Chilli Powder', category: 'Spices', price: 220, unit: 'kg',
    stock: 5, location: 'Delhi', image: '🌶️',
    status: 'Low Stock', updatedAt: new Date().toISOString(),
    priceHistory: [210, 212, 215, 218, 220, 219, 220],
  },
  {
    id: 'p7', supplierId: 's6', supplierName: 'Chennai Masala House',
    name: 'Garam Masala', category: 'Spices', price: 320, unit: 'kg',
    stock: 60, location: 'Chennai', image: '🫙',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [300, 305, 310, 315, 320, 318, 320],
  },
  {
    id: 'p8', supplierId: 's6', supplierName: 'Chennai Masala House',
    name: 'Cumin Seeds', category: 'Spices', price: 280, unit: 'kg',
    stock: 0, location: 'Chennai', image: '🌿',
    status: 'Out of Stock', updatedAt: new Date().toISOString(),
    priceHistory: [260, 265, 270, 275, 280, 278, 280],
  },

  // Oils
  {
    id: 'p9', supplierId: 's3', supplierName: 'Mumbai Oil & Fats Co.',
    name: 'Refined Sunflower Oil', category: 'Oils', price: 145, unit: 'litre',
    stock: 200, location: 'Mumbai', image: '🫙',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [138, 140, 142, 143, 145, 144, 145],
  },
  {
    id: 'p10', supplierId: 's3', supplierName: 'Mumbai Oil & Fats Co.',
    name: 'Mustard Oil', category: 'Oils', price: 165, unit: 'litre',
    stock: 120, location: 'Mumbai', image: '🫙',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [158, 160, 162, 163, 165, 164, 165],
  },

  // Dairy
  {
    id: 'p11', supplierId: 's4', supplierName: 'Krishnam Dairy Farms',
    name: 'Full Cream Milk', category: 'Dairy', price: 58, unit: 'litre',
    stock: 300, location: 'Gujarat', image: '🥛',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [54, 55, 56, 57, 58, 57, 58],
  },
  {
    id: 'p12', supplierId: 's4', supplierName: 'Krishnam Dairy Farms',
    name: 'Paneer', category: 'Dairy', price: 360, unit: 'kg',
    stock: 40, location: 'Gujarat', image: '🧀',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [340, 345, 348, 352, 355, 358, 360],
  },
  {
    id: 'p13', supplierId: 's4', supplierName: 'Krishnam Dairy Farms',
    name: 'Curd / Dahi', category: 'Dairy', price: 48, unit: 'kg',
    stock: 15, location: 'Gujarat', image: '🥣',
    status: 'Low Stock', updatedAt: new Date().toISOString(),
    priceHistory: [44, 45, 46, 47, 48, 47, 48],
  },

  // Flour
  {
    id: 'p14', supplierId: 's5', supplierName: 'Bengal Flour Mills',
    name: 'Wheat Flour (Atta)', category: 'Flour', price: 42, unit: 'kg',
    stock: 800, location: 'Kolkata', image: '🌾',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [38, 39, 40, 41, 42, 41, 42],
  },
  {
    id: 'p15', supplierId: 's5', supplierName: 'Bengal Flour Mills',
    name: 'Maida (All Purpose Flour)', category: 'Flour', price: 38, unit: 'kg',
    stock: 600, location: 'Kolkata', image: '🌾',
    status: 'In Stock', updatedAt: new Date().toISOString(),
    priceHistory: [35, 36, 37, 37, 38, 38, 38],
  },
];

export const CATEGORIES = [
  'All Categories', 'Vegetables', 'Grains', 'Pulses', 'Spices',
  'Oils', 'Dairy', 'Flour', 'Condiments'
];

export const LOCATIONS = [
  'All Locations', 'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Gujarat', 'Bangalore'
];

export const PRICE_TRENDS = {
  weekly: [
    { day: 'Mon', rice: 66, onion: 30, oil: 140, spices: 195 },
    { day: 'Tue', rice: 67, onion: 32, oil: 142, spices: 198 },
    { day: 'Wed', rice: 65, onion: 31, oil: 141, spices: 196 },
    { day: 'Thu', rice: 68, onion: 33, oil: 143, spices: 200 },
    { day: 'Fri', rice: 67, onion: 35, oil: 144, spices: 199 },
    { day: 'Sat', rice: 69, onion: 34, oil: 145, spices: 202 },
    { day: 'Sun', rice: 68, onion: 35, oil: 145, spices: 201 },
  ],
  monthly: [
    { month: 'Jan', rice: 62, onion: 20, oil: 135, spices: 185 },
    { month: 'Feb', rice: 63, onion: 22, oil: 137, spices: 188 },
    { month: 'Mar', rice: 65, onion: 25, oil: 139, spices: 190 },
    { month: 'Apr', rice: 64, onion: 28, oil: 141, spices: 192 },
    { month: 'May', rice: 68, onion: 35, oil: 145, spices: 201 },
  ],
};

export const TESTIMONIALS = [
  {
    name: 'Ramesh Yadav',
    role: 'Street Food Vendor, Delhi',
    text: 'VendorBridge helped me find a reliable spice supplier at 20% better pricing. My cost per plate dropped from ₹18 to ₹14!',
    avatar: '👨‍🍳',
    stars: 5,
  },
  {
    name: 'Priya Menon',
    role: 'Chaat Stall Owner, Bangalore',
    text: 'The real-time price tracking is a game-changer. I can now plan my bulk purchases when prices are low.',
    avatar: '👩‍🍳',
    stars: 5,
  },
  {
    name: 'Suresh Kumar',
    role: 'Supplier, Azadpur Mandi',
    text: 'My vendor reach grew 3x in just 2 months. The dashboard makes inventory management so much easier.',
    avatar: '🧑‍💼',
    stars: 4,
  },
  {
    name: 'Fatima Shaikh',
    role: 'Biryani Vendor, Hyderabad',
    text: 'Found the best quality basmati rice supplier through VendorBridge. Zero middlemen, direct pricing!',
    avatar: '👩‍🍳',
    stars: 5,
  },
];
