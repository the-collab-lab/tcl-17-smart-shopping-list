import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';

function App() {
  const token = 'user token';
  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          <List />
        </Route>

        <Route path="/add-item">
          <AddItem token={token} />
        </Route>

        <Route path="/">
          <Welcome />
        </Route>
      </Switch>

      {/* <Test /> */}
      <Navigation />
    </div>
  );
}

export default App;
