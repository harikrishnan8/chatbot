const properties = {
    'facebook_token': process.env.facebook_token || 'fb_token',
    'facebook_password': process.env.facebook_password || 'fb_password',
    'facebook_url': 'https://graph.facebook.com/v2.10/me/messages',
    'facebook_profile_url': 'https://graph.facebook.com/v2.10/',
    'api_token': process.env.api_token || 'api_token',
    'api_url': 'https://api.api.ai/v1/query?v=20150910',
    'google_key': process.env.google_key || 'google_key',
    'google_language_endpoint': '/detect',
    'google_translate_url': 'https://translation.googleapis.com/language/translate/v2'
}
module.exports = properties