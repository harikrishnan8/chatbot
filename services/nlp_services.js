var startup = require('../configuration/startup.js')
var facebook_message_service = require('../services/messenger_services.js')
var google_language = require('../services/language_services.js')
var perform_action = require('../services/helpers/actions.js')
var templates = require('../services/helpers/templates.js')
var request = require('request')

const api_url = startup.config.api_url
const api_token = startup.config.api_token

function parse_text(sender, text) {
    google_language.retrieve_language(text, (err, lang) => {
        if (err) lang = 'en'
        request({
            url: api_url,
            qs: { query: text, sessionId: sender, lang: lang },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_token
            },
            method: 'GET',
            json: true
        }, (error, response, body) => {
            if (error) {
                console.log('Error parsing text: ', error)
            } else if (response.body.error) {
                console.log('Error parsing text: ', response.body.error)
            }
            else {
                let nlp_response = response.body
                process_nlp_response(nlp_response, sender)
            }
        })
    })
}
function parse_payload(sender, text) {
    if (text.startsWith("text")) {
        //TODO process text within applicaiton
    }
    else {
        parse_text(sender, text)
    }
}
function process_nlp_response(body, sender) {
    let messages = body.result.fulfillment.messages
    let response_data = body.result.fulfillment.data
    let action = body.result.action
    let target_lang = body.lang
    console.log(target_lang)
    if (messages.length > 0 && messages[0].speech) {
        for (var i = 0, len = messages.length; i < len; i++) {
            google_language.translate_language(messages[i].speech, target_lang, (err, result) => {
                console.log(result)
                let translated_text = result
                if (err) { let translated_text = messages[i].speech }
                else { let translated_text = result }             
                let text_message = templates.create_text_message(translated_text)
                facebook_message_service.send_message(text_message, sender)
            })
        }
    }
    else if (action) {
        perform_action(action,target_lang, sender)
    }
}

module.exports = { parse_text, parse_payload }