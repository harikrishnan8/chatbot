var action_performer = require('../../services/helpers/action_handlers/action_performer.js')
var facebook_message_service = require('../../services/messenger_services.js')
var google_language = require('../../services/language_services.js')
var templates = require('../../services/helpers/templates.js')

function perform_action(action, target_lang, sender) {
    switch (action) {
        case 'greet_user':
            action_performer.greet_user(facebook_message_service, google_language, target_lang, templates)
            break
        case 'card-reload-delay':
            action_performer.card_reload_delay(facebook_message_service, google_language, target_lang, templates)
            break
        case 'unusable-card':
            action_performer.unusable_card(facebook_message_service, google_language, target_lang, templates)
            break
        case 'unusable-card.unusable-card-yes':
            action_performer.unusable_card_yes(facebook_message_service, google_language, target_lang, templates)
            break
        case 'unusable-card.unusable-card-no':
            action_performer.unusable_card_no(facebook_message_service, google_language, target_lang, templates)
            break
        case 'insufficient-balance':
            action_performer.insufficient_balance(facebook_message_service, google_language, target_lang, templates)
            break
        case 'transactions-in-progress':
            action_performer.transactions_in_progress(facebook_message_service, google_language, target_lang, templates)
            break
        case 'limit-exceeded':
            action_performer.limit_exceeded(facebook_message_service, google_language, target_lang, templates)
            break
        case 'merchant-not-accepting-card':
            action_performer.merchant_not_accepting_card(facebook_message_service, google_language, target_lang, templates)
            break
        case 'incorrect-pin':
            action_performer.incorrect_pin(facebook_message_service, google_language, target_lang, templates)
            break
        case 'card-reload':
            action_performer.card_reload(facebook_message_service, google_language, target_lang, templates)
            break
        case 'cash-credit-card-reload':
            action_performer.cash_credit_card_reload(facebook_message_service, google_language, target_lang, templates)
            break
        case 'input.unknown':
        default:
            action_performer.unknown(facebook_message_service, google_language, target_lang, templates)
    }
}
module.exports = perform_action