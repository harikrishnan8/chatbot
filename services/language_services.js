var startup = require('../configuration/startup.js')
var request = require('request')

const google_translate_url = startup.config.google_translate_url
const google_language_url = google_translate_url + startup.config.google_language_endpoint
const google_language_key = startup.config.google_key

function retrieve_language(text, callback) {
    request({
        url: google_language_url,
        qs: { key: google_language_key },
        method: 'POST',
        json: { 'q': text }
    }, (error, response, body) => {
        if (error) {
            console.log('Error detecting language: ', error)
            callback(error)
        } else if (response.body.error) {
            console.log('Error detecting language: ', response.body.error)
            callback(response.body.error)
        }
        else {
            if (response.body.data.detections[0][0].confidence >= 0.3) {
                console.log('Language is: ' + response.body.data.detections[0][0].language + ' with confidence: ' + response.body.data.detections[0][0].confidence)
                callback(null, response.body.data.detections[0][0].language)
            }
            else {
                console.log('Fallback to English. Low confidence: ' + response.body.data.detections[0][0].confidence + ' for language: ' + response.body.data.detections[0][0].language)
                callback(null, 'en')
            }

        }
    })
}
function translate_language(texts, target, callback) {
    console.log('target is',target)
    request({
        url: google_translate_url,
        qs: { key: google_language_key },
        method: 'POST',
        json: { 'q': texts, target: target }
    }, (error, response, body) => {
        if (error) {
            console.log('Error parsing language: ', error)
            callback(error)
        } else if (response.body.error) {
            console.log('Error parsing language: ', response.body.error)
            callback(response.body.error)
        }
        else {
            if (Object.prototype.toString.call(texts) === '[object Array]') {
                let translations = response.body.data.translations
                let translated_texts = []
                translations.forEach(function (element) {
                    translated_texts.push(element.translatedText);
                }, this);
                callback(null, translated_texts)
            }
            else {
                callback(null, response.body.data.translations[0].translatedText)
            }
        }
    })
}

module.exports = { retrieve_language, translate_language }