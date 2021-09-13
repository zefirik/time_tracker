import React, {useState} from 'react';
import "./registr.css";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {FloatingLabel,
        Form,
        Button} from 'react-bootstrap';


function Login({setIsLogin,setisAutheticated, logout}) {
  
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
 
  const [loginStatus, setLoginStatus] = useState('');
  const history = useHistory();
  //const token = localStorage.getItem('token');

  const login = () => {
    axios.post('http://localhost:3001/auth/login', {
      email: emailLogin, 
      password: passwordLogin
    }).then((response)=> {
      console.log(response);
      if(response.data.message){
        setLoginStatus(response.data.message)
      }else{
        localStorage.setItem("token",response.data.token);
        //console.log(response.data);
        setLoginStatus(`Hello ${response.data.result.username}!`);
        setIsLogin(response.data.result.username);
        setisAutheticated(true);
        history.push("/user/time");
    };
  });
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
        <Link to='/auth/registration'>
          <label>Registration</label>
        </Link>
        <h2>{loginStatus}</h2>
      </div>
       
    
    </>
  );
}

export default Login;