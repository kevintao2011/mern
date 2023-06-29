import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/home/home';
import Error from './pages/error';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import session from './components/session';
import Exco from './pages/structure/exco';
import Deputation from './pages/structure/deputation';
import Judicial from './pages/structure/judicial';
import Editorialboard from './pages/structure/editorialboard';
// import Error from './pages/error';

import './App.css';
import Session from './components/session';


function App() {
  return (
    
    <BrowserRouter>
      
      <Routes>
        < Route path="/" element={<Nav />}>
          <Route index element={<Home />} /> 
          <Route path="*" element={<Error />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Home />} />
          <Route path="structure">
           
            <Route path="exco" element={<Exco />} />
            <Route path="deputation" element={<Deputation />} />
            <Route path="judicial" element={<Judicial />} />
            <Route path="editorialboard" element={<Editorialboard />} />

          </Route>
          <Route path='login' element={<Login/>}/>
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile/>}/>
          
          
        </Route>
        
        {/* <Route path="*" element={<App/>}/> */}
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
