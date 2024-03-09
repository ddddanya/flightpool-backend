const execute = require("../helpers/mysql")

const bookingSeatsController = async (req, res) => {
    try {
        const {
            code
        } = req.params

        const {
            passenger,
            seat,
            type
        } = req.body

        const errors = {}

        if (!passenger) {
            errors["passenger"] = ["passenger can not be blank"]
        }
        if (!seat) {
            errors["seat"] = ["seat can not be blank"]
        }
        if (!type) {
            errors["type"] = ["type can not be blank"]
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                error: {
                    code: "422",
                    message: "Validation error",
                    errors: errors
                }
            })
        }

        const booking = await execute("SELECT * FROM `bookings` WHERE `code` = ?", [code])

        if (!booking[0]) {
            return res.status(404).send()
        }

        if (type == "from") {
            await execute("UPDATE `passengers` SET `place_from` = ? WHERE `passengers`.`id` = ?;", [seat, passenger])
        }

        if (type == "back") {
            await execute("UPDATE `passengers` SET `place_back` = ? WHERE `passengers`.`id` = ?;", [seat, passenger])
        }

        const passengers = await execute("SELECT * FROM `passengers` WHERE `booking_id` = ?", [booking[0].id])
        const p = passengers.find(p => p.id == passenger)

        res.json({
            data: {
                id: p.id,
                first_name: p.first_name,
                last_name: p.last_name,
                birth_date: p.birth_date,
                document_number: p.document_number,
                place_from: p.place_from,
                place_back: p.place_back
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