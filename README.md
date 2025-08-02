# 🍽️ The Gilded Spoon - Restaurant Management App

A modern, full-stack restaurant management application with comprehensive features, responsive design, and excellent user experience across all devices.

## 🌐 Live Demo
- **Frontend:** https://restaurantapp02.netlify.app/
- **Backend API:** https://gilded-spoon-api.onrender.com

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure register/login with JWT tokens
- **Interactive Menu** - Browse categorized menu items with descriptions and pricing
- **Reservation System** - Book tables with date, time, and special requests
- **Event Management** - View upcoming events and special occasions
- **Review System** - Read and submit customer reviews with star ratings
- **Contact Form** - Get in touch with the restaurant

### 📱 Responsive Design
- **Mobile-First** - Optimized for smartphones with touch-friendly interface
- **Tablet Support** - Perfect layout for iPad and tablet devices
- **Desktop Experience** - Rich hover effects and multi-column layouts
- **Cross-Browser** - Works on Chrome, Firefox, Safari, Edge
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

### 🎨 User Experience
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Smooth Animations** - Professional hover effects and page transitions
- **Instant Loading** - No delays, immediate content display
- **Error Handling** - Graceful fallbacks and user-friendly messages
- **Touch Optimized** - 44px+ touch targets for mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach with breakpoints
- **Custom Animations** - CSS transitions and keyframe animations
- **Mock API** - Independent frontend with simulated backend

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure user sessions
- **CORS Configuration** - Cross-origin resource sharing
- **Error Handling** - Comprehensive error management

### Database Models
- **User** - Authentication and profile management
- **Menu** - Food items with categories and pricing
- **Reservation** - Table bookings with details
- **Event** - Special events and occasions
- **Review** - Customer feedback and ratings

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ParasChavan02/restaurant-app.git
   cd restaurant-app
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Seed the database (optional):**
   ```bash
   cd backend
   node seedData.js
   ```

6. **Start the backend server:**
   ```bash
   npm start
   ```

7. **Start the frontend app:**
   ```bash
   cd ../frontend
   npm start
   ```

## 📁 Project Structure

```
restaurant-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js      # User authentication logic
│   │   ├── menuController.js      # Menu management
│   │   ├── reservationController.js # Booking system
│   │   ├── eventController.js     # Event management
│   │   └── reviewController.js    # Review system
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Menu.js               # Menu item schema
│   │   ├── Reservation.js        # Booking schema
│   │   ├── Event.js              # Event schema
│   │   └── Review.js             # Review schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── menuRoutes.js         # Menu API routes
│   │   ├── reservationRoutes.js  # Booking endpoints
│   │   ├── eventRoutes.js        # Event endpoints
│   │   └── reviewRoutes.js       # Review endpoints
│   ├── server.js                 # Express server setup
│   ├── seedData.js               # Database seeding script
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html            # Main HTML file
│   ├── src/
│   │   ├── api/
│   │   │   ├── apiClient.js      # API client configuration
│   │   │   ├── apiService.js     # Backend API calls
│   │   │   └── mockApiService.js # Mock data for development
│   │   ├── components/
│   │   │   ├── Navbar.js         # Responsive navigation
│   │   │   └── Footer.js         # Site footer
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Menu.js           # Menu display
│   │   │   ├── Reservations.js   # Booking form
│   │   │   ├── Events.js         # Events listing
│   │   │   ├── Reviews.js        # Review system
│   │   │   ├── Contact.js        # Contact form
│   │   │   └── Auth.js           # Login/Register
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles and themes
│   └── package.json
└── README.md
```

## 📱 Responsive Design Features

### Mobile (320px - 768px)
- **Hamburger Menu** - Collapsible navigation with smooth animations
- **Touch-Friendly** - 44px+ minimum touch targets
- **Single Column Layout** - Optimized for narrow screens
- **No Zoom** - Prevents iOS zoom on input focus
- **Body Scroll Prevention** - Menu open state management

### Tablet (768px - 1024px)
- **2-Column Grid** - Balanced layout for medium screens
- **Touch & Mouse** - Supports both interaction methods
- **Medium Buttons** - Appropriately sized interactive elements

### Desktop (1024px+)
- **Multi-Column Layout** - Rich 3-column grid for menu items
- **Hover Effects** - Professional animations and transitions
- **Large Touch Targets** - Enhanced button styling
- **Spacious Design** - Generous padding and margins

## 🎨 Design System

### Color Scheme
- **Primary Colors** - Warm browns and golds for fine dining aesthetic
- **Theme Support** - Light and dark mode with smooth transitions
- **Accessibility** - High contrast ratios for readability

### Typography
- **Headings** - Playfair Display for elegant titles
- **Body Text** - Inter for clean, readable content
- **Responsive Sizing** - Scales appropriately across devices

### Interactive Elements
- **Primary Buttons** - Gradient backgrounds with shimmer effects
- **Secondary Buttons** - Modern styling with hover animations
- **Form Inputs** - Consistent styling with focus states
- **Cards** - Hover effects with border glow animations

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item

### Reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations` - Get all reservations
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit new review

## 🚀 Performance Optimizations

### Frontend
- **Instant Loading** - No artificial delays in mock API
- **Optimized Images** - Proper sizing and compression
- **Efficient CSS** - Minimal, optimized stylesheets
- **Smooth Scrolling** - Enhanced scrollbar styling

### Backend
- **Error Handling** - Comprehensive try-catch blocks
- **Fallback Data** - In-memory data when database unavailable
- **CORS Configuration** - Proper cross-origin setup
- **Database Seeding** - Initial data population

## 🐛 Recent Fixes

### Mobile Responsiveness
- ✅ Fixed hamburger menu accessibility
- ✅ Improved touch targets (44px+ minimum)
- ✅ Added body scroll prevention
- ✅ Enhanced mobile form inputs
- ✅ Optimized typography for mobile

### API & Data Issues
- ✅ Resolved "Failed to fetch" errors
- ✅ Implemented mock API for development
- ✅ Added database seeding with sample data
- ✅ Fixed CORS configuration
- ✅ Enhanced error handling

### UI/UX Improvements
- ✅ Enhanced button styling and visibility
- ✅ Added smooth animations and transitions
- ✅ Improved theme toggle functionality
- ✅ Better form validation and feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Paras Chavan**
- GitHub: [@ParasChavan02](https://github.com/ParasChavan02)
- Live Demo: [Restaurant App](https://restaurantapp02.netlify.app/)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database solution
- Netlify and Render for hosting services

---

**⭐ Star this repository if you found it helpful!**
