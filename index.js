const fs = require('fs');
const features = require('./features');
var docName =   process.argv[2];

try{
    const rawData = fs.readFileSync(docName, 'utf8') //get raw data from text document
    if(rawData)
    {
        const dataArray = features.rawDataToArray(rawData) //parsing rawdata and storing into an array
        // console.log(dataArray)
        const sessionArray = features.parseBySessions(dataArray) // destructuring sessions as per rules
        // console.log(sessionArray)
        const result = features.calcBillingStats(sessionArray) // calculating fair billing
        // console.log(result)
        for(const [key,value] of Object.entries(result)) // printing in desired format
            {
                console.log(key+" "+value.sessions+ " "+ value.consumed)
            }
    }
    else
    {
        console.log("Empty Doc")
    }
} catch (err) {
  console.error(err)
}