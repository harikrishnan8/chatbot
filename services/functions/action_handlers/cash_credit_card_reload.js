module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    let texts_tobe_translated = [
        'At the counter of your post office (reloading fee: 3,5 €) .The amount charged is immediately available on your card.',
        'View on map',
        'You can find our offices here']
    google_language.translate_language(texts_tobe_translated, target_lang, (err, result) => {
        let translated_text = []
        if (err) { translated_text = texts_tobe_translated }
        else { translated_text = result }
        let txt_message_card_reload = templates.create_text_message(translated_text[0])
        facebook_message_service.send_message(txt_message_card_reload, sender)
        let button_card_reload_map = [[translated_text[1], 'https://www.google.com/maps?q=bpost+-+Si%C3%A8ge+central,+Munt,+1000+Brussel,+Belgium&ftid=0x47c3c380d1acb0fb:0xaba10126b7a6da57&hl=en-IN&gl=in&shorturl=1', 'web_url']]
        let button_template_card_reload_map = templates.create_button_template(translated_text[2], button_card_reload_map)
        setTimeout(function () {
            facebook_message_service.send_message(button_template_card_reload_map, sender)
        }, 1000)
    })
}