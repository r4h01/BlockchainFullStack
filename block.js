//I'm define the block class, I need a genesis block for getting start the blockchain
const { GENESIS_DATA } = require('./config');

class Block {

    constructor({timestamp, lastHash, hash, data}) {

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    //Method for creating the genesis block
    static genesis() {
        return new Block( GENESIS_DATA);
    }

    //Method for mine a block
    static mineBlock({lastBlock, data}) {
        return new this({
            timestamp : Date.now(),
            lastHash : lastBlock.hash,
            data
        });
    }

}

module.exports = Block;