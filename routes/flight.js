const express = require("express")
const flightController = require("../controllers/flightSearch")

const router = express.Router()

router.get("/", flightController)

module.exports = router