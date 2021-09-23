import React, {useEffect, useReducer}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Time from './pages/Time';
import Reports from './pages/Reports';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import GuardedRoute from './middlewares/GuardedRoute';
import {StoreContext} from './components/storage/context';
import {reducer, initialState} from './components/storage/store';



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("TYT STATE",state);
  

  useEffect(() => {
    reload();
    }, []);

    const outStorage = () => {
      dispatch({ type: "LOGOUT" });
    };
    const reload = () => {
      dispatch({ type: "RELOAD" });
    };

    //  Добавить проверку информации с токена и отчистить локалсторидж от любых данных кроме JWT
    //  на сервере проверку по ендпоинту декодер уже написал. 
    //  Заменить диспатч Reload на полноценный с вычеткой данных  user с jwt
    // const dataStorage = (data) => {
    //   dispatch({ type: "LOGIN", payload: {data} });
    // };

    // let getFromLocalStorage = async () => {
    //   let result = {};
    //   console.log("got it");
    //   const token = await localStorage.getItem("token");
    //   return axios({
    //     method: "post",
    //     url: "http://localhost:3001/auth/decodetoken",
    //     data: { token },
    //   })
    //     .then(async function (response) {
    //       result = await response.data;
    //     })
    //     .then(function () {

    //       console.log("Decoder result", result);
    //       return dataStorage(result);
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // };
  
  const logout = () => {
    localStorage.clear();
    outStorage();
  };


  return (
    <div>
      <StoreContext.Provider value={{dispatch, state}}>
      <Router>
        <Navbar logout={logout}/>
        <Switch>
          <Route path='/' exact component={Home} />
          <GuardedRoute path='/user/reports' component={Reports} auth={state.isAutheticated}/>
          <GuardedRoute path='/user/time' component={Time} auth={state.isAutheticated}/>
          <Route path='/auth/login' component={() => <Login logout={logout}/> } />
          <Route path='/auth/registration' component={Registration} />
        </Switch>
      </Router>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
