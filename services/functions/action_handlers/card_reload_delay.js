module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    let texts_to_be_translated = ['Did you lose your card?', 'Yes', 'No']
    google_language.translate_language(texts_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = texts_to_be_translated }
        else { translated_text = result }
        let button_details_unsable_card = [['👍', translated_text[1], null], ['👎', translated_text[2], null]]
        let button_template_unsable_card = templates.create_quick_reply_template(translated_text[0], button_details_unsable_card)
        facebook_message_service.send_message(button_template_unsable_card, sender)
    })
}