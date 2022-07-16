const request = require('request')
const forcast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae009c2ef494e9ea0d78a2c48753e71a&query='+lat+','+lon+'&units=f'
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable find weather service", undefined)
        } else if (body.error) {
            callback("unable to find location", undefined)
        } else {
            callback(undefined, 
               'Its currently '+body.current.temperature+' degress out there,'+body.current.precip+'% possibility of rain'                )
        }
    })
}
module.exports = forcast