
import React from 'react';
import { Link} from 'react-router-dom';

function Home() {
  return (
  <>
    <div className='home'>
      <h1>Greeting for TimeTracker</h1>
    </div>
    <div className="d-flex justify-content-center">
      For using this app you need to  <Link to='/auth/registration' className = "mx-1">registration</Link> or <Link to='/auth/login' className = "mx-1">login</Link>
    </div>
  </>
  );
}

export default Home;