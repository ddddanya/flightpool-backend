const express = require("express")
const userController = require("../controllers/user")
const userBookingsController = require("../controllers/userBookings")

const router = express.Router()

router.get("/", userController)
router.get("/booking", userBookingsController)

module.exports = router