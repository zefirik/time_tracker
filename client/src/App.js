import React, {useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Time from './pages/Time';
import Reports from './pages/Reports';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import GuardedRoute from './middlewares/GuardedRoute';



function App() {
  const [isLogin, setIsLogin] = useState('');
  //console.log(isLogin);
  //const [userData, setUserData] = useState();
  const[isAutheticated, setisAutheticated] = useState();

  const logout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setisAutheticated(false);
  };


  return (
    <>
      <Router>
        <Navbar isLogin={isLogin} logout={logout}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <GuardedRoute path='/user/reports' component={Reports} auth={isAutheticated}/>
          <GuardedRoute path='/user/time' component={Time} auth={isAutheticated}/>
          <Route path='/auth/login' component={() => <Login setIsLogin={setIsLogin} setisAutheticated={setisAutheticated} logout={logout}/> } />
          <Route path='/auth/registration' component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
