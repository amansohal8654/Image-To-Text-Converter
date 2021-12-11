import './App.css';
import {Navbar, Fileuploader} from'./components';
import React from 'react';


function App() {
  return (
    <div className="App">
      <Navbar />
        <div className="container">
          <Fileuploader/>
        </div>
    </div>
  );
}

export default App;
