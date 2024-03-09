const execute = require("../helpers/mysql")

const flightSearchController = async (req, res) => {
    try {
        const {
            from,
            to,
            date1,
            date2,
            passengers
        } = req.query

        const errors = {}

        if (!from) {
            errors["from"] = ["from can not be blank"]
        }
        if (!to) {
            errors["to"] = ["to can not be blank"]
        }
        if (!date1) {
            errors["date1"] = ["date1 can not be blank"]
        }

        if (!passengers) {
            errors["passengers"] = ["passengers can not be blank"]
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

        // todo: check is airport exist
        // todo: check passengers 1-8

        const flights = await execute("SELECT * FROM `flights`")
        const airports = await execute("SELECT * FROM `airports`")

        const flights_to = []
        const flights_back = []

        for (let i in flights) {
            const flight = flights[i]
            const airport_from = airports.find(airport => airport.id == flight.from_id)
            const airport_to = airports.find(airport => airport.id == flight.to_id)

            if (airport_from.iata == from && airport_to.iata == to) { // todo: CHECK AVAILABLE SEATS
                flights_to.push({
                    flight_id: flight.id,
                    flight_code: flight.flight_code,
                    from: {
                        city: airport_from.city,
                        airport: airport_from.name,
                        iata: airport_from.iata,
                        date: date1,
                        time: flight.time_from
                    },
                    to: {
                        city: airport_to.city,
                        airport: airport_to.name,
                        iata: airport_to.iata,
                        date: date1,
                        time: flight.time_to
                    },
                    cost: flight.cost
                })

                // todo: ADD AVAILABLE SEATS
            }

            if (airport_from.iata == to && airport_to.iata == from && date2) {
                flights_back.push({
                    flight_id: flight.id,
                    flight_code: flight.flight_code,
                    from: {
                        city: airport_from.city,
                        airport: airport_from.name,
                        iata: airport_from.iata,
                        date: date2,
                        time: flight.time_from
                    },
                    to: {
                        city: airport_to.city,
                        airport: airport_to.name,
                        iata: airport_to.iata,
                        date: date2,
                        time: flight.time_to
                    },
                    cost: flight.cost
                })
            }
        }

        res.json({
            data: {
                flights_to,
                flights_back
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

module.exports = flightSearchController