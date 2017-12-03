module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    let texts_to_be_translated = ['Cash', 'cash', 'Credit Card', 'Credit Card', 'Bank transfer', 'Bank transfer', 'How would you like to reload ?']
    google_language.translate_language(texts_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = texts_to_be_translated }
        else { translated_text = result }
        let button_card_reload = [[translated_text[0], translated_text[1], null],
        [translated_text[2], translated_text[3], null],
        [translated_text[4], translated_text[5], null]]
        let button_template_card_reload = templates.create_quick_reply_template(translated_text[6], button_card_reload)
        facebook_message_service.send_message(button_template_card_reload, sender)
    })
}