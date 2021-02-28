import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';
import getToken from './lib/tokens';
import { db } from './lib/firebase';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('userToken', token);
    db.collection('userTokens').add({
      tokenName: token,
    });
    setToken(token);
  };

  const confirmDeleteUserToken = () => {
    const confirmed = window.confirm(
      `Are you sure you want to create a new list or join a different list?`,
    );
    if (confirmed) {
      localStorage.removeItem('userToken');
      setToken('');
    }
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          {/* Go to list view if token exists otherwise redirected to home */}
          {token ? <List token={token} /> : <Redirect to="/" />}
        </Route>

        <Route path="/add-item">
          {/* Go to add item view if token exists otherwise redirected to home */}
          {token ? <AddItem token={token} /> : <Redirect to="/" />}
        </Route>

        <Route path="/">
          {/* Redirect to list view if token exists otherwise render Welcome */}
          {token ? (
            <Redirect to="/list" />
          ) : (
            <Welcome onClick={handleClick} setToken={setToken} />
          )}
        </Route>
      </Switch>

      <Navigation confirmDeleteUserToken={confirmDeleteUserToken} />
      <Footer />
    </div>
  );
}

export default App;
