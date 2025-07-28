const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListing = await listing.find({});
  res.render("./listing/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  const foundlisting = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!foundlisting) {
    req.flash("error", "Listing you're trying to access does not exists");
    res.redirect("/listings");
  }
  res.render("./listing/show.ejs", { listing: foundlisting });
  console.log(foundlisting);
};

module.exports.createListing = async (req, res, next) => {
  try {
    console.log("=== PRODUCTION LISTING CREATION START ===");
    console.log("Environment variables check:");
    console.log("CLOUD_NAME:", process.env.CLOUD_NAME ? "SET" : "MISSING");
    console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY ? "SET" : "MISSING");
    console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "SET" : "MISSING");
    
    // Check if required environment variables are set
    if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
      console.error("Missing Cloudinary environment variables in production");
      req.flash("error", "Server configuration error. Please contact administrator.");
      return res.redirect("/listings/new");
    }
    
    const { location } = req.body.listing;
    console.log("Location to geocode:", location);
    
    let geoData = [];
    let coordinates = null;
    
    // Try multiple geocoding services with proper error handling
    try {
      // First try: OpenStreetMap with proper headers
      console.log("Trying OpenStreetMap geocoding...");
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}&limit=1`,
        {
          headers: {
            'User-Agent': 'Wanderlust/1.0 (https://wanderlust-36a8.onrender.com)',
            'Accept': 'application/json'
          },
          timeout: 5000
        }
      );
      console.log("OpenStreetMap response status:", geoResponse.status);
      
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
        console.log("OpenStreetMap data length:", geoData.length);
        if (geoData.length > 0) {
          coordinates = {
            lat: parseFloat(geoData[0].lat),
            lon: parseFloat(geoData[0].lon)
          };
          console.log("OpenStreetMap coordinates found:", coordinates);
        }
      }
    } catch (error) {
      console.error("OpenStreetMap failed:", error.message);
    }
    
    // If OpenStreetMap failed, try fallback
    if (!coordinates) {
      try {
        console.log("Trying fallback geocoding service...");
        const fallbackResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=demo&limit=1`,
          { timeout: 5000 }
        );
        console.log("Fallback response status:", fallbackResponse.status);
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          if (fallbackData.results && fallbackData.results.length > 0) {
            coordinates = {
              lat: parseFloat(fallbackData.results[0].geometry.lat),
              lon: parseFloat(fallbackData.results[0].geometry.lng)
            };
            console.log("Fallback coordinates found:", coordinates);
          }
        }
      } catch (error) {
        console.error("Fallback geocoding failed:", error.message);
      }
    }
    
    // If all geocoding fails, use default coordinates
    if (!coordinates) {
      console.log("All geocoding services failed, using default coordinates");
      coordinates = { lat: 20.5937, lon: 78.9629 }; // Default to India center
    }

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    
    // Always set geometry with coordinates (either real or default)
    newListing.geometry = {
      type: "Point",
      coordinates: [coordinates.lon, coordinates.lat],
    };
    console.log("Final coordinates set:", coordinates);
    
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    console.error("=== PRODUCTION ERROR ===");
    console.error("Error creating listing:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    req.flash("error", "Failed to create listing. Please try again.");
    res.redirect("/listings/new");
  }
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const editlisting = await listing.findById(id);
  if (!editlisting) {
    req.flash("error", "Listing you're trying to access does not exists");
    res.redirect("/listings");
  }

  let originalImage = editlisting.image.url;
  let newImageUrl = originalImage.replace("/upload", "/upload/h_200");
  // console.log(editlisting);
  res.render("./listing/edit.ejs", { listing: editlisting, newImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updatedListing = await listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  req.flash("success", "Listing Deleted!");
  res.redirect(`/listings`);
};
