var startup = require('../configuration/startup.js')
var nlp_services = require('../services/nlp_services.js')
var api = startup.api

api.use(function (req, res, next) {
    next()
})

api.get('/text', (request, response) => {
    if (request.query['hub.verify_token'] === startup.config.facebook_password) {
        response.send(request.query['hub.challenge']).status(200)
    }
    else {
        response.send('Error, wrong token').status(403)
    }
})
api.post('/text', (request, response) => {
    messaging_events = request.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = request.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.quick_reply) {
            text = event.message.quick_reply.payload
            nlp_services.parse_payload(sender, text)
        }
        else if (event.postback) {
            text = event.postback.payload
            nlp_services.parse_payload(sender, text)
        }
        else if (event.message && event.message.text) {
            text = event.message.text
            nlp_services.parse_text(sender, text)
        }
        else {
            console.log('Unhandled message type received.')
        }
    }
    response.sendStatus(200)
})

module.exports = api