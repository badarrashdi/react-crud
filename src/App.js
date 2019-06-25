import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Students from './components/Students';
import Student from './components/Student';
import './App.css';
import Header from './includes/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Route exact path="/" component={Students} />
          <Route path="/student/:id" component={Student} />

      </Router>
    </div>
  );
}

export default App;
