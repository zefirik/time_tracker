import React, {useState} from 'react';
import "./registr.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FloatingLabel,
        Form,
        Button} from 'react-bootstrap';

function Registration() {
    const [userNameReg, setUserNameReg] = useState(''); 
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        axios.post('http://localhost:3001/auth/registration', {
          username: userNameReg,
          email: emailReg, 
          password: passwordReg
        }).then((response)=> {
          console.log(response);
          alert(response.data);
          window.location.href = "/auth/login";
        });
      };

  return (
    <div className="registration">
        <h1>Registration</h1>
        <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Name" onChange={(e) => {setUserNameReg(e.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel label="Email address">
            <Form.Control type="email" placeholder="Email" onChange={(e) => {setEmailReg(e.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" onChange={(e) => {setPasswordReg(e.target.value)}}/>
        </FloatingLabel>

        
        <Button variant="outline-primary" className="my-3" onClick={register}>Registration</Button>
        <Link to='/auth/login'>
          <label>Login</label>
        </Link>
  </div>
  );
}

export default Registration;