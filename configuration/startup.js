var config = require('./config.js')
var express = require('express')
const body_parser = require('body-parser')
var app = express()
var api = express.Router()

app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())

const REST_PORT = (process.env.PORT || 3000)

module.exports = {
    app,
    config,
    body_parser,
    api,
    REST_PORT
}