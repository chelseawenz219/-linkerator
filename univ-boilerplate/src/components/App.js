//IMPORT REACT
import React, { useState, useEffect } from 'react';

//NEED TO GET THE API DONE FIRST PRIOR TO IMPORTING - LEAVING DUMMY DATA FOR NOW
import {
  getSomething
} from '../api';

const App = () => {
  //NEED TO GET STATE NAMES ON WHAT WE WANT
  const [message, setMessage] = useState('');

  useEffect(() => {
    //PUT API FUNCTION BELOW
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  //CHANGE WEDNESDAY
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>
    </div>
  );
}

export default App;
