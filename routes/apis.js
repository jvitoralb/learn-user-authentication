const { Router } = require('express');
const { join } = require('path');
const { generatePassword, validatePassword } = require('../utils/passwordUtil.js');
const { issueJwt } = require('../utils/issueJwt.js');
const User = require('../models/user.js');
const authMiddleware = require('../utils/auth.js');


const router = Router();

router.get('/', (req, res) => {
    res.status(200).sendFile(join(process.cwd(), '/views/index.html'));
});

// this should be protected
router.get('/home', authMiddleware, (req, res) => {
    res.status(200).send('Bem vindo, Asa Branca');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
    .then((userDoc) => {
        if (!userDoc) {
            return res.status(401).json({ success: false, msg: 'could not find user' });
        }

        const validUser = validatePassword(password, userDoc.hash, userDoc.salt);
        if (validUser) {
            const { token, expires } = issueJwt(userDoc);

            return res.status(200).json({
                success: true,
                user: userDoc,
                token: token,
                expiresIn: expires
            });
        }
        return res.status(401).json({
            success: false,
            msg: 'wrong password'
        });
    })
    .catch((err) => {
        return res.status(500).send('Something went wrong, try again later.');
    });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const { salt, hash } = generatePassword(password);

    const newUser = new User({
        username: username,
        hash: hash,
        salt: salt
    });

    newUser.save()
    .then(((userDoc) => {
        const { token, expires } = issueJwt(userDoc);

        return res.status(201).json({
            success: true,
            user: userDoc,
            token: token,
            expiresIn: expires
        });
    }))
    .catch((err) => {
        return res.status(500).send('Something went wrong, try again later.');
    });
});


module.exports = router;