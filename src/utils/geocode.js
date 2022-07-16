const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae009c2ef494e9ea0d78a2c48753e71a&query=' + address + '&units=f'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable find weather service", undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)
        } else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude:body.location.lon,
                location: body.location.name,
            })
        }
    })
}

module.exports = geocode