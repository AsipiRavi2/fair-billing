module.exports = 
    {   
    rawDataToArray:
         (rawData) => 
            {
                var dataArray = rawData.split("\r\n").map((ele)=>
                    {
                    let deltaArray = ele.split(" ")
                    deltaArray[0] = deltaArray[0].split(":").map((e)=>parseInt(e)).reduce((acc,prev)=>acc*60+prev)
                    return deltaArray
                    })
                return dataArray
            },

    parseBySessions: 
        (dataArray)=>
        {
            let starTimeDoc = dataArray[0][0], endTimeDoc = dataArray[dataArray.length-1][0];
            let dataArrayDuplicate = dataArray
            let sessions = []
            while (dataArrayDuplicate.length>0){
                let time,user,type;
                [time,user,type] = dataArrayDuplicate[0]
                if (dataArrayDuplicate.length==1){
                    // console.log("if")
                    if(type==='Start'){
                        sessions.push({no:sessions.length,user,st:time,et:endTimeDoc})
                    }
                    else{
                        sessions.push({no:sessions.length,user,st:starTimeDoc,et:time})
                    }
                    dataArrayDuplicate.splice(0,1)
                }
                else{
                    // console.log('main else')
                    let sessionPairExist = false

                    for(let i=1;i<dataArrayDuplicate.length;i++){
                        // console.log("x",user===dataArrayDuplicate[i][1] && dataArrayDuplicate[i][2]==="End")
                        if(user===dataArrayDuplicate[i][1] && dataArrayDuplicate[i][2]==="End" && type !== "End"){
                            sessions.push({no:sessions.length,user,st:time,et:dataArrayDuplicate[i][0]})
                            dataArrayDuplicate.splice(0,1)
                            dataArrayDuplicate.splice(i-1,1)
                            sessionPairExist = !sessionPairExist
                            // console.log(sessionPairExist)
                            break;
                        }
                    }
                    if (!sessionPairExist){
                        // console.log('if 2nd')
                        if(type==='Start'){
                            sessions.push({no:sessions.length,user,st:time,et:endTimeDoc})
                        }
                        else{
                            sessions.push({no:sessions.length,user,st:starTimeDoc,et:time})
                        }
                        dataArrayDuplicate.splice(0,1)
                    }
                }
            }
            return sessions
        },

        calculateStats: 
            (sessionArray)=>{
                let a = {}
                for(let i=0;i<sessionArray.length;i++){
                    if(a[sessionArray[i].user]){
                        a[sessionArray[i].user] = {
                                                    sessions:a[sessionArray[i].user].sessions+1,
                                                    consumed:a[sessionArray[i].user].consumed+(sessionArray[i].et-sessionArray[i].st)}
                    }
                    else{
                        a[sessionArray[i].user] = {sessions:1,consumed:sessionArray[i].et-sessionArray[i].st}
                    }
                }
                return a
            }
    }
