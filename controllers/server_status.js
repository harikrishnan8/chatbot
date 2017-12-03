var startup = require('../configuration/startup.js')
var api = startup.api

api.use(function (req, res, next) {
    next()
})

api.get('/status', function (request, response) {
    response.send({ status: 'ok' }).status(200)
})

module.exports = api