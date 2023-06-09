const crypto = require('node:crypto');
const fs = require('node:fs');
const { join } = require('node:path');
const privKeyEncryption = require('./encrypt.js').privKeyEncryption;

const dataPackage = (() => {
    const data = {
        firstName: 'joão vitor',
        lastName: 'albuquerque',
        obs: 'this method does\'nt protect data, just virtually sign it.'
    }
    const algorithm = 'sha256';

    const hash = crypto.createHash(algorithm);
    hash.update(JSON.stringify(data));
    const hashedData = hash.digest('hex');

    const privateKey = fs.readFileSync(join(__dirname, '/../config/id_rsa_priv.pem'), 'utf8');
    const signedData = privKeyEncryption(privateKey, hashedData);

    return {
        originalData: data,
        algorithm: algorithm,
        signedAndEncryptedData: signedData
    }
})();

module.exports = dataPackage;