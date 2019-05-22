require('dotenv').config()
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_KEY
});

module.exports = chatkit;