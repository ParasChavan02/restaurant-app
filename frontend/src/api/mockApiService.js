// Mock API service that provides data without requiring a backend server
const mockMenuItems = [
  {
    _id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella, served with truffle aioli',
    price: 18,
    category: 'appetizers',
    isAvailable: true
  },
  {
    _id: '2',
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes, basil, and aged balsamic',
    price: 16,
    category: 'appetizers',
    isAvailable: true
  },
  {
    _id: '3',
    name: 'Lobster Bisque',
    description: 'Creamy lobster soup with cognac and crème fraîche',
    price: 22,
    category: 'appetizers',
    isAvailable: true
  },
  {
    _id: '4',
    name: 'Wagyu Beef Tenderloin',
    description: 'Grade A5 Japanese Wagyu with roasted garlic mashed potatoes and seasonal vegetables',
    price: 85,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    _id: '5',
    name: 'Pan-Seared Sea Bass',
    description: 'Mediterranean sea bass with saffron risotto and asparagus',
    price: 68,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    _id: '6',
    name: 'Duck Confit',
    description: 'Confit duck leg with cherry reduction and potato gratin',
    price: 72,
    category: 'mainCourses',
    isAvailable: true
  },
  {
    _id: '7',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 18,
    category: 'desserts',
    isAvailable: true
  },
  {
    _id: '8',
    name: 'Crème Brûlée',
    description: 'Classic vanilla bean crème brûlée with fresh berries',
    price: 16,
    category: 'desserts',
    isAvailable: true
  },
  {
    _id: '9',
    name: 'Signature Martini',
    description: 'Gin or vodka martini with premium spirits and olives',
    price: 22,
    category: 'drinks',
    isAvailable: true
  },
  {
    _id: '10',
    name: 'Wine Selection',
    description: 'Curated selection of fine wines from around the world',
    price: 15,
    category: 'drinks',
    isAvailable: true
  }
];

const mockReviews = [
  {
    _id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely incredible dining experience! The Wagyu beef was perfectly cooked and the service was impeccable. The wine pairing was spot-on and the ambiance was elegant. Highly recommend for special occasions!',
    createdAt: new Date('2024-12-15')
  },
  {
    _id: '2',
    author: 'Michael Chen',
    rating: 5,
    comment: 'The ambiance is elegant and the food is outstanding. The truffle arancini was a revelation and the sea bass was perfectly seasoned. The staff was attentive and knowledgeable about the menu. Will definitely return!',
    createdAt: new Date('2024-12-10')
  },
  {
    _id: '3',
    author: 'Emily Rodriguez',
    rating: 4,
    comment: 'Beautiful restaurant with amazing food. The sea bass was perfectly seasoned and the wine pairing was excellent. The dessert selection was divine. A wonderful evening out!',
    createdAt: new Date('2024-12-08')
  },
  {
    _id: '4',
    author: 'David Thompson',
    rating: 5,
    comment: 'Exceptional service and outstanding cuisine. The chef\'s table experience was unforgettable. Every dish was a work of art, and the wine recommendations were perfect. Worth every penny!',
    createdAt: new Date('2024-12-05')
  },
  {
    _id: '5',
    author: 'Lisa Wang',
    rating: 5,
    comment: 'The best fine dining experience I\'ve had in years. The lobster thermidor was divine, and the chocolate soufflé was heavenly. The staff made us feel like royalty. Can\'t wait to come back!',
    createdAt: new Date('2024-12-03')
  }
];

const mockEvents = [
  {
    _id: '1',
    title: 'Wine Tasting Evening',
    description: 'Join us for an exclusive wine tasting experience featuring premium wines from around the world. Expert sommeliers will guide you through each selection, explaining the unique characteristics and pairing recommendations.',
    date: '2024-12-20',
    time: '19:00',
    capacity: 30,
    price: 75,
    isActive: true
  },
  {
    _id: '2',
    title: 'Chef\'s Table Experience',
    description: 'An intimate dining experience at our chef\'s table. Watch our executive chef prepare your meal while enjoying a curated tasting menu with wine pairings. Limited to 8 guests for an exclusive experience.',
    date: '2024-12-25',
    time: '18:30',
    capacity: 8,
    price: 150,
    isActive: true
  },
  {
    _id: '3',
    title: 'New Year\'s Eve Gala',
    description: 'Ring in the new year with our spectacular gala dinner. Live music, champagne toast, and a special 5-course menu prepared by our award-winning chef. Includes entertainment and midnight celebration.',
    date: '2024-12-31',
    time: '20:00',
    capacity: 50,
    price: 200,
    isActive: true
  },
  {
    _id: '4',
    title: 'Valentine\'s Day Special',
    description: 'Celebrate love with our romantic Valentine\'s Day menu. Intimate candlelit dining with champagne and chocolate-covered strawberries. Perfect for couples seeking a memorable evening.',
    date: '2025-02-14',
    time: '19:00',
    capacity: 40,
    price: 120,
    isActive: true
  }
];

// Mock API functions - NO DELAYS for faster loading
export const fetchMenus = async () => {
  // Group menu items by category
  const groupedMenu = mockMenuItems.reduce((acc, item) => {
    const categoryKey = item.category ? item.category.replace(/\s+/g, '').toLowerCase() : 'uncategorized';
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(item);
    return acc;
  }, {});
  
  return groupedMenu;
};

export const fetchReviews = async () => {
  return mockReviews;
};

export const fetchEvents = async () => {
  return mockEvents;
};

export const submitReview = async (reviewData) => {
  return { success: true, message: 'Review submitted successfully!' };
};

export const submitReservation = async (reservationData) => {
  return { success: true, message: 'Reservation confirmed! We will contact you shortly to confirm your booking.' };
};

export const loginUser = async (credentials) => {
  return { success: true, message: 'Login successful!', user: { name: 'Test User', email: credentials.email } };
};

export const registerUser = async (userData) => {
  return { success: true, message: 'Registration successful! Please log in.' };
};

export const submitContactForm = async (formData) => {
  return { success: true, message: 'Your message has been sent successfully!' };
}; 