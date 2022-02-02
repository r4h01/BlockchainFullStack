//I'm define the block class, I need a genesis block for getting start the blockchain
const { GENESIS_DATA , MINE_RATE} = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {

    constructor({ timestamp, lastHash, hash, data, nonce, difficulty}) {

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    //Method for creating the genesis block
    static genesis() {
        return new Block(GENESIS_DATA);
    }

    //Method for mine a block
    static mineBlock({ lastBlock, data }) {

        let hash,timestamp
        const lastHash = lastBlock.hash;
        const { difficulty } = lastBlock;
        let nonce = 0;

        do{
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

        } while (hash.substring(0,difficulty) != '0'.repeat(difficulty))

        return new this({timestamp,lastHash,nonce,difficulty,data,hash });
    }

    static adjustDifficulty({originalBlock, timestamp}){
        const {difficulty} = originalBlock;

        const difference = timestamp - originalBlock.timestamp;

        if (difference > MINE_RATE) return difficulty -1;

        return difficulty + 1;
    }

}

module.exports = Block;