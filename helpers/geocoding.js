const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVldDEyOTMiLCJhIjoiY2tkN2M4eXI1MDFpeDMwcXJ3anRzbHE5byJ9.Mgp3lgzCHzrZEndusMXuQQ&limit=1';
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('unable to connect to location service', undefined);
        } else if(body.features.length === 0) {
            callback('error in fetching location data. Please check address.', undefined);
        } else {
            callback(undefined, {
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            });
        }    
    });
}

module.exports = geocode;