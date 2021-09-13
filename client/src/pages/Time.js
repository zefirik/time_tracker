import React, { useState, useEffect } from "react";
import "./styles_time.css";

const Timer = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 3600);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        let computedHour =
          String(hourCounter).length === 1
            ? `0${hourCounter}`
            : hourCounter;    

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHour);

        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  if (!isActive){
    console.log("PAUSE",`${hour} : ${minute} : ${second}`);
  };
 

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
    console.log("RESET",`${hour} : ${minute} : ${second}`);
  }

  return (
    <>
    <div class="container">
      <div class="time">
      <span class="minute">{hour}</span>
        <span>:</span>
        <span class="minute">{minute}</span>
        <span>:</span>
        <span class="second">{second}</span>
      </div>
      <div class="buttons">
        <button onClick={() => setIsActive(!isActive)} class="start">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} class="reset">
          Reset
        </button>
      </div>
    </div>
    <>
    
    </>
    </>
  );
};

export default Timer;