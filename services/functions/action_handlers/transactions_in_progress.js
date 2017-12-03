var feedback = require('../../../services/helpers/action_handlers/feedback')
module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    var text_to_be_translated = 'Wait until your card is charged or reload to increase your available reserve.'
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = ''
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let transactions_in_progress_txt = templates.create_text_message(translated_text)
        feedback.send_respones_with_feedback(transactions_in_progress_txt, sender, facebook_message_service, templates, google_language, target_lang)
    })
}