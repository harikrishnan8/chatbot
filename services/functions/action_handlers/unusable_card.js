module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    let text_to_be_translated = [
        'How did you reload the card?',
        'At the post office',
        'check reloading delay at post office',
        'Bank contact card',
        'check reloading delay at bank contact card',
        'Bank transfer',
        'check reloading delay at bank transfers']
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let button_details_delay = [[translated_text[1], translated_text[2], 'postback'],
        [translated_text[3], translated_text[4], 'postback'],
        [translated_text[5], translated_text[6], 'postback']]
        let button_template_delay = templates.create_button_template(translated_text[0], button_details_delay)
        facebook_message_service.send_message(button_template_delay, sender)
    })
}