//I need the crypto library for creating the hash
const crypto = require('crypto');

//I'm creating the function for getting the hash of the previous block
const cryptoHash = (...inputs) => {
    
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    return hash.digest('hex');
};

module.exports = cryptoHash;