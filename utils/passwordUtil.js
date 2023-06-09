const crypt = require('crypto');

const generatePassword = (password) => {
    const salt = crypt.randomBytes(32).toString();
    const hash = crypt.pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString();

    return {
        salt,
        hash
    }
}

const validatePassword = (password, hash, salt) => {
    const verify = crypt.pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString();

    if (verify === hash) {
        return true;
    }
    return false;
}


module.exports = {
    generatePassword,
    validatePassword
}