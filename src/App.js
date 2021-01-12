import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AddItem from './components/AddItem';
import List from './components/List';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          <List />
        </Route>

        <Route path="/add-item">
          <AddItem />
        </Route>

        <Route path="/">
          <Welcome />
        </Route>
      </Switch>

      <Navigation />
    </div>
  );
}

export default App;

// A shopping list consists of a set of items associated with a user’s token. Creating a new list consists of the following sequence:

// Generate a new, unique token
// Save the token to localStorage
// Show the user the list view
// The following script should be used to generate a suitable token: src/lib/tokens.js

// AC:

// For users who do not already have a token/list, a button or link exists on the home screen that allows them to create a new list X
// Clicking the button/link generates a new token and saves it to localStorage
// Once the token has been created and saved, the user is redirected to the "list" view
// For users who do have a token already saved in localStorage, they should be shown/redirected to the "list" view
