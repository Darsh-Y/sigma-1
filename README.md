# Wanderlust - Airbnb Clone

A full-stack Airbnb clone built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can create, view, edit, and delete property listings with image uploads, authentication, and interactive maps.

**Live Demo**: [https://wanderlust-36a8.onrender.com](https://wanderlust-36a8.onrender.com)

---

## Features

- **Listings**: Create, update, delete, and view properties  
- **Authentication**: User registration, login, logout, and session handling  
- **Images**: Upload via Cloudinary with auto-optimization  
- **Location Search**: Geocoding using OpenStreetMap and interactive map display  
- **Reviews**: Leave, edit, and delete reviews  
- **Responsive Design**: Clean, mobile-friendly interface using Bootstrap

---

## Tech Stack

**Backend**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Passport.js (Authentication)

**Frontend**  
- EJS (Embedded JavaScript Templates)  
- Bootstrap 5  

**Services**  
- Cloudinary (Image hosting)  
- OpenStreetMap Nominatim (Geocoding)  
- MongoDB Atlas (Cloud database)

---

## Getting Started

### Prerequisites

- Node.js  
- MongoDB Atlas account  
- Cloudinary account  

### Installation

```bash
git clone https://github.com/Darsh-Y/wanderlust.git
cd wanderlust
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
ATLASDB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
```

### Running the App

```bash
node app.js
```

Visit: `http://localhost:8080`

---

## Project Structure

```
wanderlust/
├── controllers/        # Route controllers
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── views/              # EJS templates
├── public/             # Static assets (CSS/JS)
├── utils/              # Helper functions
├── middleware.js       # Custom middleware
├── cloudConfig.js      # Cloudinary configuration
├── schema.js           # Joi validation schemas
├── app.js              # Entry point
└── package.json        # Project dependencies
```

---

## Deployment on Render

1. Connect your GitHub repository to Render  
2. Add the environment variables in the Render dashboard  
3. Choose **Web Service** and deploy  
4. Access the live project at your Render URL  

---

## Author

**Darshan**  
GitHub: [@Darsh-Y](https://github.com/Darsh-Y)  
Live: [https://wanderlust-36a8.onrender.com](https://wanderlust-36a8.onrender.com)

---

## License

This project is open-source and available under the [ISC License](LICENSE).

---

## Support

If you encounter any issues:  
- Open an [issue](https://github.com/Darsh-Y/wanderlust/issues) on the GitHub repository  
- Or contact the project maintainer

---

**Built with ❤️ using Node.js, Express, MongoDB, and EJS**
