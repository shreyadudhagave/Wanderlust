const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/listings")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingControllers.createListing)
);

//New Route
router.get("/listings/new", isLoggedIn , listingControllers.renderNewForm);

router.route("/listing/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));

//Index Route
// router.get("/listings", wrapAsync(listingControllers.index));

//show route
// router.get("/listing/:id", wrapAsync(listingControllers.showListing));

// create route
// router.post("/listings",isLoggedIn, validateListing, wrapAsync(listingControllers.createListing)
// );

//Edit route
router.get("/listings/:id/edit",isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));

//update route
// router.put("/listing/:id",isLoggedIn, isOwner, validateListing, wrapAsync(listingControllers.updateListing));

//delete route
// router.delete("/listing/:id",isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));

module.exports = router; 


