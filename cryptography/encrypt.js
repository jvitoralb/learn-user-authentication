const crypto = require('node:crypto');
const Buffer = require('node:buffer').Buffer;

module.exports.pubKeyEncryption = (pubKey, message) => {
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.publicEncrypt(pubKey, bufferMessage);
}


module.exports.privKeyEncryption = (privKey, message) => {
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.privateEncrypt(privKey, bufferMessage);
}