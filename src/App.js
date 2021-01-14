import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import getToken from './lib/tokens';

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
        <Route path="/list">
          {/* Go to list view if token exists otherwise redirected to home */}
          {token ? <List /> : <Redirect to="/" />}
        </Route>

        <Route path="/add-item">
          {/* Go to add item view if token exists otherwise redirected to home */}
          {token ? <AddItem /> : <Redirect to="/" />}
        </Route>

        <Route path="/">
          {/* Redirect to list view if token exists otherwise render Welcome */}
          {token ? <Redirect to="/list" /> : <Welcome onClick={handleClick} />}
        </Route>
      </Switch>

      <Navigation />
    </div>
  );
}

export default App;
