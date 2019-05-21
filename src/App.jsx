import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Client from './components/Clients';
import Movies from './components/Movies';
import RentalInfo from './components/RentalInfo';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App h-full">
          <div className="app-header h-12">
            <NavBar />
          </div>
          <div className="app-section h-full">
            <Route path="/movie" component={Movies} />
            <Route path="/client" component={Client} />
            <Route path="/rental-info" component={RentalInfo} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
