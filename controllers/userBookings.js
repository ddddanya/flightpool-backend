const execute = require("../helpers/mysql")

const userBookingsController = async (req, res) => {
    try {
        const tokenHeader = req.headers.authorization

        if (!tokenHeader) {
            return res.status(401).json({
                error: {
                    code: 401,
                    message: "Unauthorized"
                }
            })
        }

        const token = tokenHeader.replace("Bearer ", "")

        const user = await execute("SELECT * FROM `users` WHERE `api_token` = ?", [token])

        if (!user[0]) {
            return res.status(401).json({
                error: {
                    code: 401,
                    message: "Unauthorized"
                }
            })
        }

        const userBookings = await execute("SELECT * FROM `passengers` WHERE `document_number` = ?", [user[0].document_number])

        let bookingCodes = []
        let bookingInfos = []

        console.log(userBookings)

        for (let i in userBookings) {
            const book = await execute("SELECT * FROM `bookings` WHERE `id` = ?", [userBookings[i].booking_id])
            bookingCodes.push(book[0].code)
        }

        console.log(bookingCodes)

        for (let i in bookingCodes) {
            const req = await fetch("http://localhost:3000/api/booking/" + bookingCodes[i])
            const res = await req.json()

            bookingInfos.push(res.data)
        }

        res.json({
            data: {
                items: bookingInfos
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

module.exports = userBookingsController