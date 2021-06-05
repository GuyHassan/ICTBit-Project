import React from 'react';
import './App.css';
import { EditUser } from './components/EditUser'
import { DisplayUsername } from './components/DisplayUsername'
import { currentUserStore } from './stores/CurrentUser.store';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <DisplayUsername userStore={currentUserStore} />
        <EditUser userStore={currentUserStore} />
      </header>
    </div>
  );
};

export default App;
