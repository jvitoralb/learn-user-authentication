const crypto = require('node:crypto');
const fs = require('node:fs');
const { join } = require('node:path');
const dataPackage = require('./signMessage.js');
const pubKeyDecryption = require('./decrypt.js').pubKeyDecryption;

const dataIdentification = (() => {
    const publicKey = fs.readFileSync(join(__dirname, '/../config/id_rsa_pub.pem'), 'utf8');

    const decrypted = pubKeyDecryption(publicKey, dataPackage.signedAndEncryptedData);
    const decryptedHex = decrypted.toString();

    const hash = crypto.createHash(dataPackage.algorithm);
    hash.update(JSON.stringify(dataPackage.originalData));
    const originalDataHashHex = hash.digest('hex');

    if (originalDataHashHex === decryptedHex) {
        console.log('Success! The data has no\'t been tampered.');
        return true;
    }
    console.log('The data may have been tampered.');
    return false;
})();

module.exports = dataIdentification;