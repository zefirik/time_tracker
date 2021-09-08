import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
