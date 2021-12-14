import './App.css';
import {Navbar, Fileuploader} from'./components';
import React from 'react';
import {Helmet} from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Image To Text Converter</title>
        <meta name="description" content="This App help you To extract text from an image"/>
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
        <div className="container">
          <Fileuploader/>
        </div>
    </div>
  );
}

export default App;
