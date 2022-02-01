const Blockchain = require('../blockchain');
const Block = require('../block');

describe('Blockchain', () => {

    let blockchain = new Blockchain();

    //we want every test to have a fresh instance of the block chain to test with.
    beforeEach(() => {
        blockchain = new Blockchain();
    })

    //first let's test the blockchain instance
    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBeTruthy();
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
        //We're accessing the item at the last position in a chain within the blocks in that chain array
        //And we want to look at its data field and we'll expect this to equal our new data
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });


    describe('isValidChain()', () => {

        //we need to set up a few test for validating the chain
        
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {

            beforeEach(() => {
                blockchain.addBlock({ data: 'Bears' });
                blockchain.addBlock({ data: 'Beets' });
                blockchain.addBlock({ data: 'Battlestar Galactica' });
            })

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {

                    blockchain.chain[2].lastHash = 'broken-lasthash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();
                });
            });

            describe('and the chain contains a block with invalid field', () => {
                it('returns false', () => {

                    blockchain.chain[2].data = 'some-bad-and-evel-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBeFalsy();
                });
            });

            describe('and the chain does not contains any invalid blocks', () => {
                it('returns true', () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBeTruthy();
                });
            });
        });


    });

});