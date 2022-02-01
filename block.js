//I'm define the block class, I need a genesis block for getting start the blockchain
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {

    constructor({ timestamp, lastHash, hash, data }) {

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    //Method for creating the genesis block
    static genesis() {
        return new Block(GENESIS_DATA);
    }

    //Method for mine a block
    static mineBlock({ lastBlock, data }) {

        const timestamp = Date.now();
        const lastHash = lastBlock.hash;

        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }

}

module.exports = Block;