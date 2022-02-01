const Block = require('./block');
const cryptoHash = require('./crypto-hash')

class Blockchin {

    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        // we use JSON.stringify because Two objects in JavaScript can't be tripple equal
        // unless of the same underlying object instance
        //this allows us to check the keys and values of each one of these objects

        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        };

        for (let i = 1; i < chain.length; i++) {

            //let's grab the timestamp, the last hash, the hash and the data from the block 
            //using JavaScript distruction syntax
            const { timestamp, lastHash, hash, data } = chain[i];
            const actualLastHash = chain[i - 1].hash;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data)
            if (hash !== validatedHash) return false;

        }

        return true;
    }

}

module.exports = Blockchin;