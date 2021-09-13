import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles_time.css";
import {FloatingLabel,
        Form} from 'react-bootstrap';

const Timer = () => {
  const token = localStorage.getItem('token');
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [operation, setOperation] = useState('')
  let AllTimeSecond = (hour * (60 * 60))+ ( minute * 60) + second; 

  useEffect(() => {
    let intervalId;
    if(operation){
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
    }}
    return () => clearInterval(intervalId);
  }, [isActive, counter, operation]);

  if (!isActive && second > 0){
    console.log("PAUSE", `${operation} continue ${hour} : ${minute} : ${second}`);
    console.log(AllTimeSecond)
  };

  
 

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
    setOperation('');
    document.getElementById('myInput').value = '';
    console.log("RESET",`${operation} continue ${hour} : ${minute} : ${second}`);
    console.log(AllTimeSecond);
    sendData();
  }


  const sendData = () => {
    axios.post('http://localhost:3001/user/time/send', {
      operation: operation,
      time: AllTimeSecond
    },{headers: {'authorization': `Bearer ${token}`}})
    .then((response)=> {
      console.log(response);
      alert(response.data)
    });
  };

  return (
    
    <div className="container">
      <div className="time">
      <span className="minute">{hour}</span>
        <span>:</span>
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)} className="start">
          {isActive && operation ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} className="reset">
          Reset
        </button>
      </div>
      <div>
      <FloatingLabel label="What are you doing..." className="my-3" >
            <Form.Control id="myInput" type="text" placeholder="What are you doing..." onChange={(e) => {setOperation(e.target.value)}}/> 
        </FloatingLabel>
    </div>
    </div>
  );
};

export default Timer;
