import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/home/home';
import Error from './pages/error';
import Profile from './pages/profile';
import Login from './pages/auth/login';
// import Error from './pages/error';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path="/" element={<Nav />}>
          <Route index element={<Home />} /> {/* / */}
          <Route path="*" element={<Error />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Home />} />
          <Route path='login' element={<Login/>}/>
          <Route path="profile/:id" element={<Profile/>}/>
        </Route>
        {/* <Route path="*" element={<App/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
