
function request_for_feedback(sender, facebook_message_service, templates, google_language, target_lang) {

    var text_to_be_translated = ['Do you find this answer helpful?', 'happy', 'smile', 'not sure', 'sad', 'angry']
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }

        let button_details = [['😄', translated_text[1], null],
        ['🙂', translated_text[2], null],
        ['😐', translated_text[3], null],
        ['☹️', translated_text[4], null],
        ['😠', translated_text[5], null]]
        let button_template = templates.create_quick_reply_template(translated_text[0], button_details)
        facebook_message_service.send_message(button_template, sender)
    })
}

function send_respones_with_feedback(message_data, sender, facebook_message_service, templates, google_language, target_lang) {
    facebook_message_service.send_message(message_data, sender)
    setTimeout(function () {
        request_for_feedback(sender, facebook_message_service, templates, google_language, target_lang)
    }, 1000)
}

module.exports = { send_respones_with_feedback }