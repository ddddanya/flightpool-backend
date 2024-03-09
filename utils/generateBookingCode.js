const generateBookingCode = () => {
    let result = ""

    const ch = "QWERTYYUIOPASDFGHJKLZXCVBNM"
    const chLength = ch.length

    for (let i = 0; i < 5; i++) {
        result += ch.charAt(Math.floor(Math.random() * chLength))
    }

    return result
}

module.exports = generateBookingCode