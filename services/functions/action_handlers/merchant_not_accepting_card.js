var feedback = require('../../../services/helpers/action_handlers/feedback')
module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    var text_to_be_translated = 'The trade in which you wish to pay for your purchases is not part of the MasterCard network (example: Colruyt, Aldi).'
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = ''
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let merchant_not_accepting_card_txt = templates.create_text_message(translated_text)
        feedback.send_respones_with_feedback(merchant_not_accepting_card_txt, sender, facebook_message_service, templates, google_language, target_lang)
    })
}