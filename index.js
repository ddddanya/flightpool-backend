const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

const registrationRouter = require("./routes/registration")
const loginRouter = require("./routes/login")
const airportRouter = require("./routes/airport")
const flightRouter = require("./routes/flight")
const bookingRouter = require("./routes/booking")
const userRouter = require("./routes/user")

const app = express();
dotenv.config()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use("/api/registration", registrationRouter)
app.use("/api/login", loginRouter)
app.use("/api/airport", airportRouter)
app.use("/api/flight", flightRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/user", userRouter)

app.listen(process.env.PORT || 80, () => {
    console.log(`Server is running on port ${process.env.PORT || 80}`);
})