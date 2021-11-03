module.exports={
    calcTimeDiff: // caculate time diff in seconds
        (sessionDetails)=>
        {
            let startTimeSec = sessionDetails.startTime.split(":").map((e)=>parseInt(e)).reduce((acc,prev)=>acc*60+prev)
            let endTimeSec = sessionDetails.endTime.split(":").map((e)=>parseInt(e)).reduce((acc,prev)=>acc*60+prev)
            return endTimeSec - startTimeSec
        },
}