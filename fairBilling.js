const fs = require('fs');
const features = require('./features');

const fairBilling = (docName) => {
    try{
        const rawData = fs.readFileSync(docName, 'utf8') //get raw data from text document
        if(rawData)
        {
            const dataArray = features.rawDataToArray(rawData) //parsing rawdata and storing into an array
            // console.log(dataArray)
            if(dataArray.length>0)
            {
                const sessionArray = features.parseBySessions(dataArray) // destructuring sessions as per rules
                // console.log(sessionArray)
                const result = features.calcBillingStats(sessionArray) // calculating fair billing
                // console.log(result)
                var distinctSessions = 0 
                for(var key in result) // printing in desired format
                    {
                        console.log(`${key} ${result[key].sessions} ${result[key].consumed}`)
                        distinctSessions++;
                    }
    
                return distinctSessions;

            }
            else{
                throw "No valid details found";
            }
        }
        else
        {
            throw "Empty document";
        }
    } 
    catch (err) {
        console.error(err);
    }
}

module.exports={fairBilling}