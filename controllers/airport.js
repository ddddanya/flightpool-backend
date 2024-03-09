const execute = require("../helpers/mysql")

const airportController = async (req, res) => {
    try {
        const {
            query
        } = req.query

        const searchByCity = await execute("SELECT * FROM `airports` WHERE `city` LIKE ?", [`%${query}%`])

        const searchByName = await execute("SELECT * FROM `airports` WHERE `name` LIKE ?", [`%${query}%`])

        const serchByIata = await execute("SELECT * FROM `airports` WHERE `iata` LIKE ?", [`%${query}%`])

        const results = []

        for (let i in searchByCity) {
            if (!results.find(item => item.id == searchByCity[i].id)) {
                results.push({
                    id: searchByCity[i].id,
                    name: searchByCity[i].name,
                    iata: searchByCity[i].iata
                })
            }
        }
        for (let i in searchByName) {
            if (!results.find(item => item.id == searchByName[i].id)) {
                results.push({
                    id: searchByName[i].id,
                    name: searchByName[i].name,
                    iata: searchByName[i].iata
                })
            }
        }
        for (let i in serchByIata) {
            if (!results.find(item => item.id == serchByIata[i].id)) {
                results.push({
                    id: serchByIata[i].id,
                    name: serchByIata[i].name,
                    iata: serchByIata[i].iata
                })
            }
        }

        res.json({
            data: {
                items: results.map(i => ({
                    name: i.name,
                    iata: i.iata
                }))
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

module.exports = airportController