const express = require('express');
const router = express.Router();
const chatkit = require('./chatkit');

router.post('/', (req, res) => {
    const userId = req.query.user_id;

    chatkit.createUser({
        id: userId,
        name: userId
    })
    .catch((e) => console.error(e))
    .then(() => {
        const authData = chatkit.authenticate({
            userId
        });

        res
            .status(authData.status)
            .send(authData.body);
    });
});

module.exports = router;