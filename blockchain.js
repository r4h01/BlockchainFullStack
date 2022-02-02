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


    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error('The incoming chain must be longer');
            return;
        }

        if(!Blockchin.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }

        console.log('replacing chain')
        this.chain = chain;
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
            const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];

            const actualLastHash = chain[i - 1].hash;

            if (lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty )
            if (hash !== validatedHash) return false;

        }

        return true;
    }

    

}

module.exports = Blockchin;