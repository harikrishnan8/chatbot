var startup = require('../configuration/startup.js')
var request = require('request')

const facebook_url = startup.config.facebook_url
const facebook_profile_url = startup.config.facebook_profile_url
const api_token = startup.config.facebook_token

function send_message(message_data, sender) {
    console.log(message_data)
    request({
        url: facebook_url,
        qs: { access_token: api_token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: message_data
        }
    }, (error, response, body) => {
        if (error) {
            console.log('Error sending message: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function retrieve_profile(sender, callback) {
    request({
        url: facebook_profile_url + sender,
        qs: { access_token: api_token, fields: 'first_name,last_name,profile_pic' },
        method: 'GET',
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Error sending message: ', error)
            callback(error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
            callback(response.body.error)
        }
        else {
            callback(null, response.body)
        }
    })
}
module.exports = { send_message, retrieve_profile }