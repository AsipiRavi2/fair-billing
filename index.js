const fs = require('fs');
const features = require('./features');
var docName =   process.argv[2];

try {
  const rawData = fs.readFileSync(docName, 'utf8')
  if(rawData){
    const dataArray = features.rawDataToArray(rawData)
    // console.log(dataArray)
    const sessionArray = features.parseBySessions(dataArray)
    // console.log(sessionArray)
    const result = features.calculateStats(sessionArray)
    //   console.log(result)
    for(const [key,value] of Object.entries(result))
    {
        console.log(key+" "+value.sessions+ " "+ value.consumed)
    }
    }
    else{
        console.log("Empty Doc")
    }
} catch (err) {
  console.error(err)
}