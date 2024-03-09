const execute = require("../helpers/mysql")

const bookingSeatsController = async (req, res) => {
    try {
        const {
            code
        } = req.params

        const booking = await execute("SELECT * FROM `bookings` WHERE `code` = ?", [code])

        if (!booking[0]) {
            return res.status(404).send()
        }

        const passengers = await execute("SELECT * FROM `passengers` WHERE `booking_id` = ?", [booking[0].id])

        let occupied_from = []
        let occupied_back = []

        for (let i in passengers) {
            occupied_from.push({
                passenger_id: passengers[i].id,
                place: passengers[i].place_from
            })

            if (booking[0].flight_back) {
                occupied_back.push({
                    passenger_id: passengers[i].id,
                    place: passengers[i].place_back
                })
            }
        }

        res.json({
            data: {
                occupied_from,
                occupied_back
            }
        })

    } catch (e) {
        console.error(e)

        res.status(500).json({
            error: {
                code: "500",
                message: "Internal Server Error"
            }
        })
    }
}

module.exports = bookingSeatsController