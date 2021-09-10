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

function App() {
  const [isLogin, setIsLogin] = useState('');
  //const [userData, setUserData] = useState();
  return (
    <>
      <Router>
        <Navbar isLogin={isLogin}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/user/reports' component={Reports} />
          <Route path='/user/time' component={Time} />
          <Route path='/auth/login' component={() => <Login setIsLogin={setIsLogin}/> } />
          <Route path='/auth/registration' component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
