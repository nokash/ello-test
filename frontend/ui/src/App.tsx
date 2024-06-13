import React, { useEffect } from 'react';
//import { Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
//import './App.css';
import BookAssignment from './components/book.assignment.view';

const App: React.FC = (props: any)  => {
  useEffect(() => {

  }, props);
  return (
    <div className="App">
      {/* <NavBar/> */}
      {/* <Header title="Header" />  */}
      <BookAssignment/>
      {/* <header className="App-header"> </header> */}
      
      <main>
        
       
      </main>
    </div>
  );
}

export default App;
