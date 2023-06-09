const { join } = require('node:path');
const jwt = require('jsonwebtoken');
const fs = require('node:fs');

const ID_RSA_PRIV = fs.readFileSync(join(__dirname, '../config/id_rsa_priv.pem'), 'utf8');
const ID_RSA_PUB = fs.readFileSync(join(__dirname, '../config/id_rsa_pub.pem'), 'utf8');

const payload = {
    sub:"1234567890",
    name:"John Doe",
    iat:1516239022,
    admin: false
}

const signedJWT = jwt.sign(payload, ID_RSA_PRIV, { algorithm: 'RS256' });

console.log(signedJWT)

jwt.verify(signedJWT, ID_RSA_PUB, { algorithm: ['RS256'] }, (err, payload) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(payload);
    return payload;
});