const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/Menu');
const Event = require('./models/Event');
const Review = require('./models/Review');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const sampleMenuItems = [
  // Appetizers
  {
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella, served with truffle aioli',
    price: 18,
    category: 'appetizers',
    isAvailable: true
  },
  {
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes, basil, and aged balsamic',
    price: 16,
    category: 'appetizers',
    isAvailable: true
  },
  {
    name: 'Lobster Bisque',
    description: 'Creamy lobster soup with cognac and crème fraîche',
    price: 22,
    category: 'appetizers',
    isAvailable: true
  },
  {
    name: 'Foie Gras Torchon',
    description: 'Duck liver terrine with brioche toast and fig compote',
    price: 28,
    category: 'appetizers',
    isAvailable: true
  },

  // Main Courses
  {
    name: 'Wagyu Beef Tenderloin',
    description: 'Grade A5 Japanese Wagyu with roasted garlic mashed potatoes and seasonal vegetables',
    price: 85,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Pan-Seared Sea Bass',
    description: 'Mediterranean sea bass with saffron risotto and asparagus',
    price: 68,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Duck Confit',
    description: 'Confit duck leg with cherry reduction and potato gratin',
    price: 72,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Wild Mushroom Risotto',
    description: 'Carnaroli rice with wild mushrooms, parmesan, and truffle oil',
    price: 45,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    name: 'Lobster Thermidor',
    description: 'Classic French preparation with cognac cream sauce and gruyère cheese',
    price: 78,
    category: 'mainCourses',
    isAvailable: true
  },

  // Desserts
  {
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 18,
    category: 'desserts',
    isAvailable: true
  },
  {
    name: 'Crème Brûlée',
    description: 'Classic vanilla bean crème brûlée with fresh berries',
    price: 16,
    category: 'desserts',
    isAvailable: true
  },
  {
    name: 'Tiramisu',
    description: 'Traditional Italian tiramisu with espresso and mascarpone',
    price: 17,
    category: 'desserts',
    isAvailable: true
  },
  {
    name: 'Apple Tarte Tatin',
    description: 'Caramelized apple tart with vanilla ice cream',
    price: 19,
    category: 'desserts',
    isAvailable: true
  },

  // Drinks
  {
    name: 'Signature Martini',
    description: 'Gin or vodka martini with premium spirits and olives',
    price: 22,
    category: 'drinks',
    isAvailable: true
  },
  {
    name: 'Wine Selection',
    description: 'Curated selection of fine wines from around the world',
    price: 15,
    category: 'drinks',
    isAvailable: true
  },
  {
    name: 'Craft Cocktails',
    description: 'House-made cocktails with premium spirits and fresh ingredients',
    price: 18,
    category: 'drinks',
    isAvailable: true
  },
  {
    name: 'Champagne Service',
    description: 'Premium champagne with fresh strawberries',
    price: 35,
    category: 'drinks',
    isAvailable: true
  }
];

const sampleEvents = [
  {
    title: 'Wine Tasting Evening',
    description: 'Join us for an exclusive wine tasting experience featuring premium wines from around the world. Expert sommeliers will guide you through each selection, explaining the unique characteristics and pairing recommendations.',
    date: '2024-12-20',
    time: '19:00',
    capacity: 30,
    price: 75,
    isActive: true
  },
  {
    title: 'Chef\'s Table Experience',
    description: 'An intimate dining experience at our chef\'s table. Watch our executive chef prepare your meal while enjoying a curated tasting menu with wine pairings. Limited to 8 guests for an exclusive experience.',
    date: '2024-12-25',
    time: '18:30',
    capacity: 8,
    price: 150,
    isActive: true
  },
  {
    title: 'New Year\'s Eve Gala',
    description: 'Ring in the new year with our spectacular gala dinner. Live music, champagne toast, and a special 5-course menu prepared by our award-winning chef. Includes entertainment and midnight celebration.',
    date: '2024-12-31',
    time: '20:00',
    capacity: 50,
    price: 200,
    isActive: true
  },
  {
    title: 'Valentine\'s Day Special',
    description: 'Celebrate love with our romantic Valentine\'s Day menu. Intimate candlelit dining with champagne and chocolate-covered strawberries. Perfect for couples seeking a memorable evening.',
    date: '2025-02-14',
    time: '19:00',
    capacity: 40,
    price: 120,
    isActive: true
  },
  {
    title: 'Spring Garden Party',
    description: 'Welcome spring with our garden party featuring fresh seasonal ingredients. Outdoor dining with live jazz music and a special spring cocktail menu.',
    date: '2025-03-15',
    time: '17:00',
    capacity: 60,
    price: 85,
    isActive: true
  }
];

const sampleReviews = [
  {
    author: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely incredible dining experience! The Wagyu beef was perfectly cooked and the service was impeccable. The wine pairing was spot-on and the ambiance was elegant. Highly recommend for special occasions!',
    createdAt: new Date('2024-12-15')
  },
  {
    author: 'Michael Chen',
    rating: 5,
    comment: 'The ambiance is elegant and the food is outstanding. The truffle arancini was a revelation and the sea bass was perfectly seasoned. The staff was attentive and knowledgeable about the menu. Will definitely return!',
    createdAt: new Date('2024-12-10')
  },
  {
    author: 'Emily Rodriguez',
    rating: 4,
    comment: 'Beautiful restaurant with amazing food. The sea bass was perfectly seasoned and the wine pairing was excellent. The dessert selection was divine. A wonderful evening out!',
    createdAt: new Date('2024-12-08')
  },
  {
    author: 'David Thompson',
    rating: 5,
    comment: 'Exceptional service and outstanding cuisine. The chef\'s table experience was unforgettable. Every dish was a work of art, and the wine recommendations were perfect. Worth every penny!',
    createdAt: new Date('2024-12-05')
  },
  {
    author: 'Lisa Wang',
    rating: 5,
    comment: 'The best fine dining experience I\'ve had in years. The lobster thermidor was divine, and the chocolate soufflé was heavenly. The staff made us feel like royalty. Can\'t wait to come back!',
    createdAt: new Date('2024-12-03')
  },
  {
    author: 'Robert Martinez',
    rating: 4,
    comment: 'Excellent food and atmosphere. The duck confit was tender and flavorful, and the wine selection was impressive. The only minor issue was a slight delay in service, but the quality made up for it.',
    createdAt: new Date('2024-12-01')
  },
  {
    author: 'Jennifer Adams',
    rating: 5,
    comment: 'A truly magical evening! The Valentine\'s Day special was perfect - romantic atmosphere, delicious food, and attentive service. The champagne service was a lovely touch. Highly recommend!',
    createdAt: new Date('2024-11-28')
  },
  {
    author: 'Thomas Wilson',
    rating: 5,
    comment: 'The wine tasting evening was educational and enjoyable. The sommelier was knowledgeable and the wine pairings were exceptional. The appetizers were perfectly matched. A great experience!',
    createdAt: new Date('2024-11-25')
  }
];

const seedAllData = async () => {
  try {
    console.log('Starting to seed all data...');

    // Clear existing data
    await MenuItem.deleteMany({});
    await Event.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Insert menu items
    const insertedMenuItems = await MenuItem.insertMany(sampleMenuItems);
    console.log(`Successfully seeded ${insertedMenuItems.length} menu items`);

    // Insert events
    const insertedEvents = await Event.insertMany(sampleEvents);
    console.log(`Successfully seeded ${insertedEvents.length} events`);

    // Insert reviews
    const insertedReviews = await Review.insertMany(sampleReviews);
    console.log(`Successfully seeded ${insertedReviews.length} reviews`);

    // Display summary
    console.log('\n=== SEEDING SUMMARY ===');
    console.log(`Menu Items: ${insertedMenuItems.length}`);
    console.log(`Events: ${insertedEvents.length}`);
    console.log(`Reviews: ${insertedReviews.length}`);
    console.log('All data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAllData(); 