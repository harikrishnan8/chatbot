function create_button(title, payload, type) {
    if (type === 'web_url') {
        let button = { type: type, url: payload, title: title }
        return button
    } else {
        let button = { type: type, payload: payload, title: title }
        return button
    }   
}

function create_button_template(text, button_details) {
    let buttons = []
    for (i = 0; i < button_details.length; i++) {
        buttons.push(create_button(button_details[i][0], button_details[i][1], button_details[i][2])) // 0 is the title , 1 is the payload , 2 is type
    }
    let button_template = { attachment: { type: 'template', payload: { template_type: 'button', text: text, buttons: buttons } } }
    return button_template
}

function create_quick_reply_template(text, button_details) {
    let buttons = []
    for (i = 0; i < button_details.length; i++) {
        buttons.push(create_quick_reply_button(button_details[i][0], button_details[i][1], button_details[i][2])) // 0 is the title , 1 is the payload , 2 is image_url
    }
    let button_template = { text: text, quick_replies: buttons }
    return button_template
}

function create_quick_reply_button(title, payload, image_url) {
    let button = { content_type: "text", title: title, image_url: image_url, payload: payload }
    return button
}

function create_text_message(text) {
    return { text: text }
}
module.exports = { create_button_template, create_text_message, create_quick_reply_template }