const fs = require('node:fs');
const { join } = require('node:path');
const jsonwebtoken = require('jsonwebtoken');

const keyDirPath = join(__dirname, '..', '/config/');
const PUB_KEY = fs.readFileSync(join(keyDirPath, 'id_rsa_pub.pem'), 'utf8');
const PRIV_KEY = fs.readFileSync(join(keyDirPath, 'id_rsa_priv.pem'), 'utf8');

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ success: false, msg: 'You are not authorized to visit this route' });
    }
    const splittedToken = req.headers.authorization.split(' ');

    if (splittedToken[0] === 'Bearer' && splittedToken[1].match(/\S+\.\S+\.\S+/) !== null) {
        try {
            req.jwt = jsonwebtoken.verify(splittedToken[1], PUB_KEY, { algorithms: ['RS256'] });
            return next();
        } catch(err) {
            return res.status(401).json({ success: false, msg: 'You are not authorized to visit this route' });
        }
    }

    return res.status(401).json({ success: false, msg: 'You are not authorized to visit this route' });
}

module.exports = authMiddleware;