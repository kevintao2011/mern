import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/home/home';
import Error from './pages/error';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Exco from './pages/structure/exco';
import Deputation from './pages/structure/deputation';
import Judicial from './pages/structure/judicial';
import Editorialboard from './pages/structure/editorialboard';
// import Error from './pages/error';
import Manage from './pages/society/manage';
import './App.css';
import { AuthProvider } from './components/session';
import SetupAccount from './pages/account/setupAccount';

function App() {
  console.log("load app.jsx")
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          < Route path="/" element={<Nav />}>
            <Route index element={<Home />} /> 
            <Route path="home" element={<Home />} />
            <Route path="structure">
              <Route path="exco" element={<Exco />} />
              <Route path="deputation" element={<Deputation />} />
              <Route path="judicial" element={<Judicial />} />
              <Route path="editorialboard" element={<Editorialboard />} />
            </Route>
            
            <Route path="society">
              <Route path="manage" element={<Manage />} />
            </Route>
        <Route path="account">
              <Route path="setup" element={<SetupAccount />} />
            </Route>
            <Route path='login' element={<Login/>}/>
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<Profile/>}/>
            <Route path="*" element={<Error />} />
            
          </Route>
          
          {/* <Route path="*" element={<App/>}/> */}
        </Routes>
        </AuthProvider>
      {/* <Routes>
        <Route path="/error" element={<Error />} />
      </Routes> */}
    </BrowserRouter>
    
  );
}

export default App;
