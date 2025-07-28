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
    
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    console.log("Geocoding response status:", geoResponse.status);
    
    if (!geoResponse.ok) {
      console.error("Geocoding API error:", geoResponse.status, geoResponse.statusText);
      req.flash("error", "Location service temporarily unavailable. Please try again.");
      return res.redirect("/listings/new");
    }
    
    let geoData;
    try {
      geoData = await geoResponse.json();
      console.log("Geocoding data length:", geoData.length);
    } catch (parseError) {
      console.error("Failed to parse geocoding response:", parseError);
      console.error("Response text:", await geoResponse.text());
      req.flash("error", "Location service error. Please try again.");
      return res.redirect("/listings/new");
    }

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    
    if (geoData.length > 0) {
      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);
      newListing.geometry = {
        type: "Point",
        coordinates: [lon, lat],
      };
    }
    
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
