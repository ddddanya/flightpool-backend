const { v4: uuidv4 } = require("uuid")
const execute = require("../helpers/mysql")

const authController = async (req, res) => {
    try {
        const {
            phone,
            password
        } = req.body

        const errors = {}

        if (!phone) {
            errors["phone"] = ["phone can not be blank"]
        }
        if (!password) {
            errors["password"] = ["password can not be blank"]
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

        const findMatchUser = await execute("SELECT * FROM `users` WHERE `phone` = ? AND `password` = ?", [phone, password])

        if (findMatchUser.length < 0) {
            return res.status(401).json({
                error: {
                    code: "401",
                    message: "Unauthorized",
                    errors: [
                        "phone or password incorrect"
                    ]
                }
            })
        }
        
        const token = uuidv4()

        await execute("UPDATE `users` SET `api_token` = ? WHERE `users`.`id` = ?;", [
            token,
            findMatchUser[0].id
        ])

        res.json({
            data: {
                token: token
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

module.exports = authController