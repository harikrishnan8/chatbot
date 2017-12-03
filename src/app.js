var startup_config = require('../configuration/startup.js')
var api = require('../controllers/webhook.js')
var status = require('../controllers/server_status.js')

var app = startup_config.app
var REST_PORT = startup_config.REST_PORT


app.use('/bpost', api)
app.use('/bpost', status)

app.set('port', REST_PORT)
app.listen(REST_PORT, () => {
    console.log('Rest service ready on port ' + app.get('port'))
})


