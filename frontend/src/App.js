
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import AuthContext from './context/auth-context';

/**
 * The main file for project. The Root file for all the logical branching of the project
 */
function App() {

  /** only declare routes over here, program logic should be covered in thier respective files/folders */

  /** alternative solution for axios */
  // const get = async () => {
  //   const res = fetch('http://localhost:3000') // for checking the connection to the backend
  //   console.log(res);
  // }
  // get()

  return (
    <div className="App">
      <main>
        <Routes>
          {/* going to the landing page/ home page */}
          <Route path='/' element={<Home/>} />  
        </Routes>
      </main>
    </div>
  );
}

export default App;
