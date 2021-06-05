import React from 'react';
import './App.css';
import { EditUser } from './components/EditUser'
import { DisplayUsername } from './components/DisplayUsername'
import { currentUserStore } from './stores/CurrentUser.store';
import mainLogo from './imgs/mainLogo.png';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={mainLogo} alt="failed" />
        <hr />
        <DisplayUsername userStore={currentUserStore} />
        <EditUser userStore={currentUserStore} />
      </header>
    </div>
  );
};

export default App;
