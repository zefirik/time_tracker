import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import "./styles_time.css";
import {FloatingLabel,
        Form} from 'react-bootstrap';
import {StoreContext} from '../components/storage/context';

const Timer = () => {
  const {state} = useContext(StoreContext);
  const userId = state.userData.data.id;
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [operation, setOperation] = useState('');
  const [dateOperation, setDateOperation] = useState('')
  let AllTimeSecond = +((+hour * (60 * 60))+ ( +minute * 60) + +second); 

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
        getCurrentDate();

        setCounter((counter) => counter + 1);
      }, 1000);
    }}
    return () => clearInterval(intervalId);
  }, [isActive, counter, operation]);

  if (!isActive && second > 0){
    console.log("PAUSE", `${operation} continue ${hour} : ${minute} : ${second}`);
    console.log(AllTimeSecond);
    console.log(dateOperation);
  };

  function getCurrentDate(){

    let newDate = new Date()
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    setDateOperation(`${year}/${month<10?`0${month}`:`${month}`}/${day}`);
    }
 

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
    setOperation('');
    document.getElementById('myInput').value = '';
    console.log("RESET",`${operation} continue ${hour} : ${minute} : ${second}`);
    console.log(AllTimeSecond)
    if(operation){sendData();}
   
    console.log(dateOperation);

  }



  const sendData = () => {
    axios.post('http://localhost:3001/user/time/send', {
      operation: operation.toLowerCase(),
      time: AllTimeSecond,
      id: userId,
      date: dateOperation,
    })
    .then((response)=> {
      console.log(response);
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
          Stop
        </button>
      </div>
      <div>
      <FloatingLabel label="What are you doing..." className="my-3" >
            <Form.Control id="myInput" type="text" placeholder="Please enter action" onChange={(e) => {setOperation(e.target.value)}}/> 
        </FloatingLabel>
    </div>
    </div>
  );
};

export default Timer;
