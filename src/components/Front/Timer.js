import {useEffect, useState} from 'react';

function Timer () {
    const [timer, setTimer] = useState(new Date());

    useEffect(() => {
        const timerInterval = setInterval(() => setTimer(new Date()), 1000);
        return () => {
             clearInterval(timerInterval);
        }
   }, []);

    return (
        <div>
            <div className="time-div">
                <h1 className="date">{timer.toDateString()}</h1>
                <h1 className="timer">{timer.toTimeString("en-US").slice(0, 8)}</h1>
            </div>
        </div>
    )
}

export default Timer;