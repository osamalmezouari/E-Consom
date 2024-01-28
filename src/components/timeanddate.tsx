import {useEffect, useState} from "react";

const TimeDate = () => {
    const [timeState, setTime] = useState(new Date())

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000)
        return () => clearInterval(intervalID)
    }, []);

    interface newestTimeType {
        currentMonth: string,
        currentYear: number,
        currentDay: string,
        currentTime: string
    }

    const newestTime: newestTimeType = {
        currentMonth: timeState.toLocaleDateString('fr-US', {month: "long"}).substring(0, 3),
        currentYear: timeState.getFullYear(),
        currentDay: timeState.toLocaleDateString('fr-US', {dateStyle: 'long'}).substring(0, 2),
        currentTime: timeState.toLocaleDateString('fr-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).substring(10),
    }

    return <>
        <div className={' flex gap-10'}>
            <div className={'flex gap-4 items-center '}>
                <div className={'bg-calandericon bg-contain bg-no-repeat w-10 h-10'}></div>
                <p className={'text-gray-400 uppercase font-medium font-sans'}
                   style={{fontSize: "14px"}}>{newestTime.currentDay} {newestTime.currentMonth} , {newestTime.currentYear}</p>
            </div>
            <div className={'flex gap-4 items-center '}>
                <div className={'bg-watchicon bg-contain bg-no-repeat w-10 h-10'}></div>
                <p className={'text-gray-400 uppercase font-medium font-sans '}
                   style={{fontSize: "14px"}}> {newestTime.currentTime}</p>
            </div>
        </div>
    </>
}
export default TimeDate
