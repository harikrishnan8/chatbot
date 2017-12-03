module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    let text_to_be_translated = [
        'May I know what kind of issue you are facing?',
        'Insufficient balance',
        'I have insufficient balance on my card',
        'Transaction in progress',
        'My transactions are in progress',
        'Limit exceeded',
        'My Daily limit has exceeded',
        'Not accepting card',
        'Merchant is not accepting master card',
        '3 wrong PIN codes',
        'I have provided three incorrect pic codes']
    google_language.translate_language(text_to_be_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = text_to_be_translated }
        else { translated_text = result }
        let button_details_unsable_card_no = [[translated_text[1], translated_text[2], null],
        [translated_text[3], translated_text[4], null],
        [translated_text[5], translated_text[6], , null],
        [translated_text[7], translated_text[8], null],
        [translated_text[9], translated_text[10], null]]
        let button_template_unsable_card_no = templates.create_quick_reply_template(translated_text[0], button_details_unsable_card_no)
        facebook_message_service.send_message(button_template_unsable_card_no, sender)
    })

}