const execute = require("../helpers/mysql")

const bookingSearchController = async (req, res) => {
    try {
        const {
            code
        } = req.params

        const booking = await execute("SELECT * FROM `bookings` WHERE `code` = ?", [code])

        if (!booking[0]) {
            return res.status(404).send()
        }

        const passengers = await execute("SELECT * FROM `passengers` WHERE `booking_id` = ?", [booking[0].id])

        const flight_from = await execute("SELECT * FROM `flights` WHERE `id` = ?", [booking[0].flight_from])
        let flight_back

        if (booking[0].flight_back) {
            flight_back = await execute("SELECT * FROM `flights` WHERE `id` = ?", [booking[0].flight_back])
        }

        const flight_from_airport_from = await execute("SELECT * FROM `airports` WHERE `id` = ?", [flight_from[0].from_id])
        const flight_from_airport_to = await execute("SELECT * FROM `airports` WHERE `id` = ?", [flight_from[0].to_id])

        let flight_back_airport_from
        let flight_back_airport_to

        if (flight_back) {
            flight_back_airport_from = await execute("SELECT * FROM `airports` WHERE `id` = ?", [flight_back[0].from_id])
            flight_back_airport_to = await execute("SELECT * FROM `airports` WHERE `id` = ?", [flight_back[0].to_id])
        }

        let result = {
            code: code,
            cost: flight_from[0].cost * passengers.length,
            flights: [
                {
                    flight_id: flight_from[0].id,
                    flight_code: flight_from[0].flight_code,
                    from: {
                        city: flight_from_airport_from[0].city,
                        airport: flight_from_airport_from[0].name,
                        iata: flight_from_airport_from[0].iata,
                        date: booking[0].date_from,
                        time: flight_from[0].time_from
                    },
                    to: {
                        city: flight_from_airport_to[0].city,
                        airport: flight_from_airport_to[0].name,
                        iata: flight_from_airport_to[0].iata,
                        date: booking[0].date_from,
                        time: flight_from[0].time_to
                    },
                    cost: flight_from[0].cost,
                    availability: 187
                }
            ],
            passengers: passengers.map(p => ({
                id: p.id,
                first_name: p.first_name,
                last_name: p.last_name,
                birth_date: p.birth_date,
                document_number: p.document_number,
                place_from: p.place_from,
                place_back: p.place_back
            }))
        }

        if (flight_back) {
            result.cost = (flight_from[0].cost + flight_back[0].cost) * passengers.length
            result.flights.push({
                flight_id: flight_back[0].id,
                flight_code: flight_back[0].flight_code,
                from: {
                    city: flight_back_airport_from[0].city,
                    airport: flight_back_airport_from[0].name,
                    iata: flight_back_airport_from[0].iata,
                    date: booking[0].date_back,
                    time: flight_from[0].time_to
                },
                to: {
                    city: flight_back_airport_to[0].city,
                    airport: flight_back_airport_to[0].name,
                    iata: flight_back_airport_to[0].iata,
                    date: booking[0].date_back,
                    time: flight_from[0].time_to
                },
                cost: flight_back[0].cost,
                availability: 187
            })
        }

        res.json({
            data: result
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

module.exports = bookingSearchController