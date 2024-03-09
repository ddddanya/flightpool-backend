const execute = require("../helpers/mysql")

const userController = async (req, res) => {
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

        res.json({
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            phone: user[0].phone,
            document_number: user[0].document_number
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

module.exports = userController