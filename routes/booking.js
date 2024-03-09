const express = require("express")
const bookingController = require("../controllers/booking")
const bookingSearchController = require("../controllers/bookingSearch")
const bookingSeatsController = require("../controllers/bookingSeats")
const bookingSeatController = require("../controllers/bookingSeat")

const router = express.Router()

router.post("/", bookingController)
router.get("/:code", bookingSearchController)
router.get("/:code/seat", bookingSeatsController)
router.patch("/:code/seat", bookingSeatController)

module.exports = router