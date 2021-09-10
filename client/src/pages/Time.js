import React, {useState} from 'react';
import { useStopwatch } from 'react-timer-hook';
import {Button,
        Container} from 'react-bootstrap';

        function MyStopwatch() {
          const {
            seconds,
            minutes,
            hours,
            days,
            isRunning,
            start,
            pause,
            reset,
          } = useStopwatch({ autoStart: false });

      return (
        <Container>
        <div className='text-center'>
          <h1>TIMER</h1>
          <div style={{fontSize: '100px'}}>
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
          <p>{isRunning ? 'Running' : 'Not running'}</p>
          <Button variant="outline-primary" onClick={start}>Start</Button>
          <Button variant="outline-dark" onClick={pause}>Pause</Button>
          <Button variant="outline-primary" onClick={reset}>Reset</Button>
        </div>
        </Container>
      );
    }  


  
function Time() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}

export default Time;