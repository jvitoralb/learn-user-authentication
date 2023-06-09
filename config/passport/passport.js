const fs = require('node:fs');
const path = require('node:path');
const User = require('../../models/user.js');
const StrategyJwt = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const jwtStrategy =  new StrategyJwt(options, (payload, done) => {
    User.findOne({ _id: payload.sub })
    .then((user) => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
    .catch((err) => {
        done(err, null);
    });
});

module.exports = configPassport = (passport) => {
    passport.use(jwtStrategy);
}