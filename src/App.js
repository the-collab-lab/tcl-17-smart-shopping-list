import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Test />

      <Switch>
        <Route path="/list">
          <List />
        </Route>

        <Route path="/add-item">
          <AddItem />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
