const fs = require('fs');
const crypto = require('crypto');
const base64url = require('base64url');
const { join } = require('path');

const signatureFunc = crypto.createSign('RSA-SHA256');
const verifyFunc = crypto.createVerify('RSA-SHA256');

/**
 * ISSUANCE
**/

const header = {
    alg:"RS256",
    typ:"JWT"
}
const payload = {
    sub:"1234567890",
    name:"John Doe",
    iat:1516239022,
    admin: false
}

const b64urlHeader = base64url(JSON.stringify(header));
const b64urlPayload = base64url(JSON.stringify(payload));

signatureFunc.write(b64urlHeader + "." + b64urlPayload);
signatureFunc.end();

const ID_RSA_PRIV = fs.readFileSync(join(__dirname, '../config/id_rsa_priv.pem'), 'utf8');
const signatureBase64 = signatureFunc.sign(ID_RSA_PRIV, 'base64url');

const signatureBase64Url = base64url.fromBase64(signatureBase64);
console.log(signatureBase64Url)

// END ISSUANCE

/**
 * VERIFICATION
**/

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6ZmFsc2V9.cvx-7IKx5hjsPO48UDF13aYTBcKV5TU-KgbY5zpfomzis9dHPj1XDCc7ifTps5A6VMqy7KkN_vZQN83mGVbknzffn_3NHyi_k3iz2Ig7IFEHtp7gdwb9UU0FUL7C8HTHS5soLgWcpjU3WY0nacQEfjZ9AFz7t_ue_3LFtt9oRYwhRZ3fZcXyGORyvyos1IpmxrBSq4EjAqknU8ExUED9AP3gIcWIsrwRgJCPRk9TvBZz4GuWu75a64hsTNQTo9g3EC_LUjQvJhSN0-stidg7zMRmVspUW3Rb6qrFDdVDXRNqkdaCeIvPXn2UwA-dwxgR7tgHYepfVMeS3Fo1p18AKivBypCIWSuA9BkKuPMxyiJyeI7ZgeU-3O_SDPxrMPXyv754sxuvgsoHDGSyZR7lxnOb-sZJDHRN5EkJeP5nkPDMCJd1oRramACXF5AYTOP0vfhdqYzuS2np1xVCnJl41yfW5b5ysv2YlE49B8sprVj6NHN6lUETbsCSNu0enX9mWE_-KB9Tme2YajeNEc0FygEyOJNzzhi9-MT_oaaRQGcSZScRKl18AFVe7Gn0Lyp-0kWKwrNPf5O0POMqe3Me8pNNgp9rKGSKSS5M8fjE4Kf1HKRKhpXmg9vZEemA214wLKNbIchEPHSR1crg5zdTbU5XIWbdWxogv7LrOs3yABI';

const [ b64UrlHeader, b64UrlPayload, b64UrlSignature ] = JWT.split('.');

verifyFunc.write(b64UrlHeader + '.' + b64UrlPayload);
verifyFunc.end();

const jwtSignatureBase64 = base64url.fromBase64(b64UrlSignature);
const ID_RSA_PUB = fs.readFileSync(join(__dirname, '../config/id_rsa_pub.pem'), 'utf8');

const validSignature = verifyFunc.verify(ID_RSA_PUB, jwtSignatureBase64, 'base64');

console.log(validSignature)

// END VERIFICATION