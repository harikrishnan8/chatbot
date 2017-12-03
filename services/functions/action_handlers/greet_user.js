module.exports = (facebook_message_service, google_language, target_lang, templates) => {
    facebook_message_service.retrieve_profile(sender, (err, body) => {
        let profile
        if (err) { profile = { first_name: 'there' } }
        else profile = body
        var greeting_msg = ('Hello ' + profile.first_name + ' !')
        google_language.translate_language(greeting_msg, target_lang, (err, result) => {
            let translated_text = ''
            if (err) { translated_text = greeting_msg }
            else { translated_text = result }
            let personalized_greeting_msg = templates.create_text_message(translated_text)
            facebook_message_service.send_message(personalized_greeting_msg, sender)
        })
    })
}