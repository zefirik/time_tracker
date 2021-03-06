import React, {useState} from 'react';
import "./registr.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FloatingLabel,
        Form,
        Button} from 'react-bootstrap';


function Login() {
  
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
 
  const [loginStatus, setLoginStatus] = useState('');
  const token = localStorage.getItem('token');

  const login = () => {
    axios.post('http://localhost:3001/api/login', {
      email: emailLogin, 
      password: passwordLogin
    }).then((response)=> {
      if(response.data.message){
        setLoginStatus(response.data.message)
      }else{
        localStorage.setItem("token",response.data.token);
        //setUserId(response.data.result.rows[0].id);
        console.log(response.data);
        if(response.data.result.rows[0].role === 1)
        {setLoginStatus(`Hello ${response.data.result.rows[0].username}! You are Admin`);
        }else{
        setLoginStatus(`Hello ${response.data.result.rows[0].username}! You are User`);}
    };
  });
};

const logout = () => {
  localStorage.removeItem('token');
  setLoginStatus(false)
};

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <FloatingLabel label="Email address">
            <Form.Control type="email" placeholder="Email" onChange={(e) => {setEmailLogin(e.target.value)}}/>
        </FloatingLabel>
        <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" onChange={(e) => {setPasswordLogin(e.target.value)}}/>
        </FloatingLabel>
        
        {(localStorage.getItem("token") === null) ? <Button variant="outline-primary" className="my-3" onClick={login}>Login</Button> : <Button variant="outline-primary" className="my-3" onClick={logout}>LogOUT</Button>}
        <Link to='/registration'>
          <label>Registration</label>
        </Link>
      </div>
        <h2>{loginStatus}</h2>
    
    </>
  );
}

export default Login;