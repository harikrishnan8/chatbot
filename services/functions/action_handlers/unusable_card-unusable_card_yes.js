module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    var text_to_be_translated = ['Call representative', 'Call our representatives to get immediate help.']
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let button_details_call = [[translated_text[0], '+32 2 2012345', 'phone_number']]
        let button_template_call = templates.create_button_template(translated_text[1], button_details_call)
        facebook_message_service.send_message(button_template_call, sender)
    })
}