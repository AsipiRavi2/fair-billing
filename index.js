const { fairBilling } = require('./fairBilling.js')

var docName =   process.argv[2];

docName ? fairBilling(docName) : console.log("Expecting doc Name e.g. node index.js doc.txt")
