# 🌍 Wanderlust - Airbnb Clone

A full-stack web application built with Node.js, Express, MongoDB, and EJS that replicates the core functionality of Airbnb. Users can create, view, edit, and delete property listings with location-based mapping, user authentication, and image upload capabilities.

## ✨ Features

### 🏠 Property Management
- **Create Listings**: Add new properties with detailed information
- **View Listings**: Browse all available properties with images and details
- **Edit Listings**: Update property information and images
- **Delete Listings**: Remove properties (owner-only functionality)
- **Search & Filter**: Find properties by location and category

### 🗺️ Location & Mapping
- **Geocoding Integration**: Automatic coordinate generation using OpenStreetMap API
- **Interactive Maps**: Display property locations with accurate GPS coordinates
- **Location Validation**: Real-time location verification and mapping

### 👤 User Authentication
- **User Registration**: Secure signup with email and username
- **User Login/Logout**: Session-based authentication
- **Owner Verification**: Only listing owners can edit/delete their properties
- **Protected Routes**: Secure access to user-specific features

### 📸 Image Management
- **Cloudinary Integration**: Cloud-based image storage and optimization
- **Image Upload**: Drag-and-drop file upload functionality
- **Image Optimization**: Automatic resizing and format optimization

### 💬 Review System
- **Add Reviews**: Users can leave ratings and comments
- **View Reviews**: Display all reviews for each property
- **Review Management**: Edit and delete reviews (author-only)

### 🎨 User Interface
- **Responsive Design**: Mobile-friendly Bootstrap-based interface
- **Modern UI**: Clean, intuitive user experience
- **Tax Toggle**: Display pricing with or without tax calculations
- **Flash Messages**: User-friendly success and error notifications

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Passport.js**: Authentication middleware
- **Multer**: File upload handling
- **Cloudinary**: Cloud image storage and management

### Frontend
- **EJS**: Embedded JavaScript templating
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library
- **Mapbox**: Interactive mapping (if integrated)

### APIs & Services
- **OpenStreetMap Nominatim**: Geocoding service
- **Cloudinary**: Image storage and optimization
- **MongoDB Atlas**: Cloud database hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v22.14.0 or higher)
- MongoDB database
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Darsh-Y/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   SECRET=your_session_secret
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   node app.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8080`

## 📁 Project Structure

```
wanderlust/
├── controllers/          # Route controllers
│   ├── listings.js      # Listing management logic
│   ├── reviews.js       # Review management logic
│   └── users.js         # User authentication logic
├── models/              # Database models
│   ├── listing.js       # Property listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
├── routes/              # Express routes
│   ├── listing.js       # Listing routes
│   ├── review.js        # Review routes
│   └── user.js          # User routes
├── views/               # EJS templates
│   ├── listing/         # Listing-related views
│   ├── users/           # User authentication views
│   ├── includes/        # Reusable components
│   └── layouts/         # Page layouts
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
├── utils/               # Utility functions
├── middleware.js        # Custom middleware
├── cloudConfig.js       # Cloudinary configuration
├── schema.js           # Joi validation schemas
├── app.js              # Main application file
└── package.json        # Project dependencies
```

## 🔧 Configuration

### Database Setup
1. Create a MongoDB database (local or Atlas)
2. Update `ATLASDB_URL` in your `.env` file
3. The application will automatically create required collections

### Cloudinary Setup
1. Sign up for a Cloudinary account
2. Get your cloud name, API key, and secret
3. Update the Cloudinary credentials in your `.env` file

### Geocoding
The application uses OpenStreetMap's Nominatim service for geocoding. No API key is required, but proper User-Agent headers are included for production use.

## 🚀 Deployment

### Render.com Deployment
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy as a Web Service
4. The application will be available at your Render URL

### Environment Variables for Production
Ensure all environment variables are set in your production environment:
- `ATLASDB_URL`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`
- `SECRET`
- `NODE_ENV=production`

## 🧪 Testing

### Manual Testing
1. **User Registration**: Create a new account
2. **User Login**: Test authentication
3. **Create Listing**: Add a new property with image
4. **Edit Listing**: Modify property details
5. **Add Review**: Leave a review for a property
6. **Map Functionality**: Verify location coordinates

### Key Features to Test
- ✅ User authentication flow
- ✅ CRUD operations for listings
- ✅ Image upload functionality
- ✅ Geocoding and mapping
- ✅ Review system
- ✅ Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Darshan**
- GitHub: [@Darsh-Y](https://github.com/Darsh-Y)
- Project: [Wanderlust](https://github.com/Darsh-Y/wanderlust)

## 🙏 Acknowledgments

- **Airbnb** for inspiration and UI/UX patterns
- **OpenStreetMap** for geocoding services
- **Cloudinary** for image management
- **Bootstrap** for responsive design framework
- **Express.js** community for excellent documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/Darsh-Y/wanderlust/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

**Built with ❤️ using Node.js, Express, MongoDB, and EJS** 
