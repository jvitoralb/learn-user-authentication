const crypto = require('node:crypto');

module.exports.privKeyDecryption = (privKey, encryptedMessage) => {
    return crypto.privateDecrypt(privKey, encryptedMessage);
}

module.exports.pubKeyDecryption = (pubKey, encryptedMessage) => {
    return crypto.publicDecrypt(pubKey, encryptedMessage);
}