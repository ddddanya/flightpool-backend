const execute = require("../helpers/mysql")

const generateBookingCode = require("../utils/generateBookingCode")

const bookingController = async (req, res) => {
    try {
        const {
            flight_from,
            flight_back,
            passengers
        } = req.body

        const errors = {}

        if (!flight_from) {
            errors["flight_from"] = ["flight_from can not be blank"]
        }
        if (flight_from && typeof flight_from !== "object") {
            errors["flight_from"] = ["flight_from must be an object"]
        }
        if (flight_back && typeof flight_back !== "object") {
            errors["flight_back"] = ["flight_back must be an object"]
        }

        if (!passengers) {
            errors["passengers"] = ["passengers can not be blank"]
        }
        if (passengers && typeof passengers !== "object") {
            errors["passengers"] = ["passengers must be an array"]
        }
        if (passengers && typeof passengers === "object" && passengers.length < 1) {
            errors["passengers"] = ["passengers can not be blank"]
        }
        for (let i in passengers) {
            const _errors = []
            if (!passengers[i].first_name) {
                _errors.push("first_name is required")
            }
            if (!passengers[i].last_name) {
                _errors.push("first_name is required")
            }
            if (!passengers[i].birth_date) {
                _errors.push("birth_date is required")
            }
            if (!passengers[i].document_number) {
                _errors.push("document_number is required")
            }

            if (passengers[i].document_number.length !== 10) {
                _errors.push("document_number should be 10 characters length")
            }

            if (_errors.length) {
                errors[`passengers[${i}]`] = _errors
            }
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

        const flight_from_info = await execute("SELECT * FROM `flights` WHERE `id` = ?", [flight_from.id])
        let flight_back_info

        if (flight_back) {
            flight_back_info = await execute("SELECT * FROM `flights` WHERE `id` = ?", [flight_back.id])
        }

        const code = generateBookingCode()

        let addBookingRow

        if (flight_back) {
            addBookingRow = await execute("INSERT INTO `bookings` (`id`, `flight_from`, `flight_back`, `date_from`, `date_back`, `code`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);", [
                flight_from_info[0].id,
                flight_back_info[0].id,
                flight_from.date,
                flight_back.date,
                code
            ])
        } else {
            addBookingRow = await execute("INSERT INTO `bookings` (`id`, `flight_from`, `date_from`, `code`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);", [
                flight_from_info[0].id,
                flight_from.date,
                code
            ])
        }

        console.log(addBookingRow)

        for (let i in passengers) {
            await execute("INSERT INTO `passengers` (`id`, `booking_id`, `first_name`, `last_name`, `birth_date`, `document_number`, `place_from`, `place_back`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);", [
                addBookingRow.insertId,
                passengers[i].first_name,
                passengers[i].last_name,
                passengers[i].birth_date,
                passengers[i].document_number
            ])
        }

        res.status(201).json({
            data: {
                code
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

module.exports = bookingController