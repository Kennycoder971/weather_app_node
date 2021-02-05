const axios = require('axios')


async function getWeather(address, cb) {
    const url = `http://api.weatherstack.com/current?access_key=889628d1b0a1e763979538a0728ae47b&query=${address}`
    try {
        const response = await axios.get(url)
        if (response.data.error) {
            cb('Unable to find location, try another address.', undefined)
        } else {
            const outsideTemp = response.data.current.temperature
            const feelslike = response.data.current.feelslike
            cb(undefined, `It is currently ${outsideTemp} degrees out. It feels like ${feelslike} degrees out. `);
        }
    } catch (error) {
        cb('Unable to connect to weather service', undefined)
    }

}

module.exports = getWeather
