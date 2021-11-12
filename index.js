const { fairBilling } = require('./fairBilling.js')

var docName =   process.argv[2];

docName ? fairBilling(docName) : console.error("Expecting doc Name e.g. 'node index.js doc.txt' ")
