const jsonwebtoken = require('jsonwebtoken');
const fs = require('node:fs');
const { join } = require('node:path');

const PRIV_KEY = fs.readFileSync(join(__dirname, '../config/id_rsa_priv.pem'), 'utf8');

const issueJwt = (user) => {
    const { _id } = user;
    const payload = {
        sub: _id, 
        iat: Date.now()
    }

    const expiresIn = '1d';
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn
    }
}

module.exports = {
    issueJwt
}