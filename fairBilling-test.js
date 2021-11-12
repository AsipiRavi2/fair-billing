// We use the assert standard library to make assertions
const assert = require('assert')
// const { add, subtract } = require('./calculator')
const { fairBilling } = require('./fairBilling')

test('test fairbilling with doc.txt',()=>{
    assert.equal(fairBilling('doc.txt'),2)
})

test('test fairbilling with doc1.txt',()=>{
    assert.equal(fairBilling('doc1.txt'),1)
})