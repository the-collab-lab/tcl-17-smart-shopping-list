import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import getToken from './lib/tokens';
// import TestWelcome from './components/TestWelcome';
// import CreateNewList from './components/CreateNewList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('userToken', token);
    setToken(token);
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/list">{token ? <List /> : <Redirect to="/" />}</Route>

        <Route path="/add-item">
          {token ? <AddItem /> : <Redirect to="/" />}
        </Route>

        <Route path="/">
          {token ? <Redirect to="/list" /> : <Welcome onClick={handleClick} />}
          {/* <TestWelcome />
          {token ? <Redirect to="/list" /> : <CreateNewList onClick={handleClick} />} */}
        </Route>
      </Switch>

      <Navigation />
    </div>
  );
}

export default App;
