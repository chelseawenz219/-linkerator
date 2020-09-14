//IMPORT REACT
import React from 'react';

//NEED TO GET THE API DONE FIRST PRIOR TO IMPORTING - LEAVING DUMMY DATA FOR NOW
import {
  getTags
} from '../api';


const App = () => {
 getTags();
  
  return (
    <div className="App">
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
