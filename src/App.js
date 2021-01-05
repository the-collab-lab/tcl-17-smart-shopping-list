import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Test from './components/Test';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Test />
      <Navigation />

      <Switch></Switch>
    </div>
  );
}

export default App;
