module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    var text_to_be_translated = 'Sorry! I am unable to understand. Could you please rephrase?'
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = ''
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let txt_message = templates.create_text_message(translated_text)
        facebook_message_service.send_message(txt_message, sender)
    })
}