const timeCalc = require('./timeCalc');

module.exports = 
    {   
    rawDataToArray: //raw data to array
        (rawData) => 
        {
            var dataArray = rawData.trim().split("\r\n").map((ele)=>
                {
                let deltaArray = ele.split(" ")
                 return deltaArray
                })
            return dataArray
        },

    parseBySessions: 
        (dataArray)=> // applying rules and destructuring to sessions
        {
            let starTimeDoc = dataArray[0][0], endTimeDoc = dataArray[dataArray.length-1][0];
            let dataArrayDuplicate = [...dataArray] // duplicate array for performing rules which includes pop()
            let sessions = []
            while (dataArrayDuplicate.length>0)
                {
                    let ts,user,sessionType;
                    [ts,user,sessionType] = dataArrayDuplicate[0] 
                    if (dataArrayDuplicate.length==1) // if only one record present
                    { 
                        if(sessionType==='Start'){
                            sessions.push({user,startTime:ts,endTime:endTimeDoc})
                        }
                        else{
                            sessions.push({user,startTime:starTimeDoc,endTime:ts})
                        }
                        dataArrayDuplicate.splice(0,1)
                    }
                    else // if morethan one record exist 
                    { 
                        let sessionPairExist = false

                        for(let i=1;i<dataArrayDuplicate.length;i++){
                            if(user===dataArrayDuplicate[i][1] && dataArrayDuplicate[i][2]==="End" && sessionType !== "End") //if start and end exist for the session
                            {
                                sessions.push({user,startTime:ts,endTime:dataArrayDuplicate[i][0]})
                                dataArrayDuplicate.splice(0,1)
                                dataArrayDuplicate.splice(i-1,1)
                                sessionPairExist = !sessionPairExist
                                break;
                            }
                        }
                        if (!sessionPairExist) // if no session pair exist
                        {
                            if(sessionType==='Start')
                            {
                                sessions.push({user,startTime:ts,endTime:endTimeDoc})
                            }
                            else
                            {
                                sessions.push({user,startTime:starTimeDoc,endTime:ts})
                            }
                            dataArrayDuplicate.splice(0,1)
                        }
                    }
                }
            return sessions
        },

    calcBillingStats: // calculating stats( no of sessions, consumedtime)
        (sessionArray)=>
        {
            let calculatedSessions = {}
            for(let i=0;i<sessionArray.length;i++)
            {
                if(calculatedSessions[sessionArray[i].user])
                {
                    calculatedSessions[sessionArray[i].user] = {
                        sessions:calculatedSessions[sessionArray[i].user].sessions+1,
                        consumed:calculatedSessions[sessionArray[i].user].consumed+timeCalc.calcTimeDiff(sessionArray[i])}
                
                                            }
                else
                {
                    calculatedSessions[sessionArray[i].user] = { sessions:1, consumed:timeCalc.calcTimeDiff(sessionArray[i])}
                }
            }
            return calculatedSessions
        },
    }
