const request = require('postman-request');

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=999a95fb5b862b7826bd2e71d9bd0dda&query=' + latitude + ',' + longitude +'&units=m';
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('error! Please try after sometime.', undefined);
        } else if(body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            });
        }
    });
}

module.exports = weather;