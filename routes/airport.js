const express = require("express")
const airportController = require("../controllers/airport")

const router = express.Router()

router.get("/", airportController)

module.exports = router