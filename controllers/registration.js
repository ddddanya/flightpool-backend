const execute = require("../helpers/mysql")

const registrationController = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            document_number,
            password
        } = req.body

        const errors = {}

        if (!first_name) {
            errors["first_name"] = ["first_name can not be blank"]
        }
        if (!last_name) {
            errors["last_name"] = ["last_name can not be blank"]
        }
        if (!phone) {
            errors["phone"] = ["phone can not be blank"]
        }
        if (!document_number) {
            errors["document_number"] = ["document_number can not be blank"]
        }
        if (!password) {
            errors["password"] = ["password can not be blank"]
        }

        if (document_number && document_number.length !== 10) {
            errors["document_number"] = ["document_number length should equals to 10"]
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

        const checkUserExist = await execute("SELECT * FROM `users` WHERE `phone` = ?", [phone])

        if (checkUserExist.length > 0) {
            return res.status(409).json({
                error: {
                    code: "409",
                    message: "User with this number already exist"
                }
            })
        }

        const checkUserExist2 = await execute("SELECT * FROM `users` WHERE `document_number` = ?", [document_number])

        if (checkUserExist2.length > 0) {
            return res.status(409).json({
                error: {
                    code: "409",
                    message: "User with this document number already exist"
                }
            })
        }

        const sqlQuery = "INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `password`, `document_number`, `api_token`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, NULL, NOW(), NOW());"

        const result = await execute(sqlQuery, [
            first_name,
            last_name,
            phone,
            password,
            document_number
        ])

        console.log(result)

        res.status(204).send()
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

module.exports = registrationController