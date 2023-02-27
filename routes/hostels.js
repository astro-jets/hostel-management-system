const express = require('express');
const router = express.Router();
const controller = require('../controllers/hostelsController')
const {requireAuth, currentUser} = require('../middleware/authMiddleware')
// All Routes
router.get("*",currentUser,requireAuth )
//ALL Hostels
router.get("/", controller.index)

// Single Hostel
router.get("/:id", controller.singleHostel)

// Book Hostel
router.get("/book/:id", controller.bookHostel)

// Booked Hostels

module.exports = router;