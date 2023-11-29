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
import Society from './pages/society/society';
import SocietyList from './pages/society/societyList';
import ActivityForm from './components/ActivityForm';
import EditActivity from './pages/society/EditActivity';
import CreateProduct from './pages/society/product/CreateProduct';
import CounterForm from './components/counterForm';
import EditProduct from './pages/society/product/EditProduct.bak';
import Storage from './pages/storage/Storage';
import Shop from './pages/shop/shop';
import SocList from './pages/socList'

import Cart from './pages/shop/Cart';
import CheckOut from './pages/shop/CheckOut';
import Product from './pages/shop/Product';
import NewCreateProduct from './pages/society/product/NewCreateProduct';
import AdminPage from './pages/admin/AdminPage';
import CreateProductPage from './pages/society/product/CreateProductPage';
import EditMembership from './pages/society/membership/EditMembership';
import FuntionalParentComponent from './pages/Test/FuntionalParentComponent';
import CreateSingleProductContainer from './pages/society/product/CreateSingleProductContainer';
import 'rsuite/dist/rsuite.min.css';
import Instagramauth from './pages/society/instagram/Instagramauth';
import CreateForm from './components/FormComponents/CreateForm';
import { InfoProvider } from './components/Contexts/InfoContexts';
import { NotiProvider } from './components/Contexts/notificationContext';
import { Toaster } from 'sonner';

function App() {
  console.log("load app.jsx")
  return (
    
    <BrowserRouter>
      <InfoProvider>
        <AuthProvider>
          {/* <NotiProvider> */}
       

            <Routes>
              < Route path="/" element={<Nav/>}>
                <Route index element={<Home />} /> 
                <Route path="counter" element={<CounterForm />} />
                <Route path="home" element={<Home />} />
                <Route path="soclist" element={<SocList />} />
                <Route path="structure">
                  <Route path="exco" element={<Exco />} />
                  <Route path="s" element={<Storage />} />
                  <Route path="deputation" element={<Deputation />} />
                  <Route path="judicial" element={<Judicial />} />
                  <Route path="editorialboard" element={<Editorialboard />} />
                </Route>
                <Route path="admin" element={<AdminPage />} />
                <Route path="createform" element={<CreateForm />} />
                <Route path="test" element={<FuntionalParentComponent />} />
                
                <Route path="shop" >
                  <Route exact path="product" element={<Shop/>}/>
                  <Route exact path="cart" element={<Cart/>}/>
                  <Route exact path="checkout" element={<CheckOut/>}/>
                  <Route exact path="product/:sku" element={<Product />} />
                </Route>
                
                
                <Route exact path="society" element={<SocietyList />} />
                <Route exact path="society/:code" element={<Society />} >  
                  {/* <Route path="manage" element={<Manage />} /> */}
                </Route>
                <Route path="/society/:code/manage" element={<Manage />} />
                <Route path="/society/:code/manage/instagramauth" element={<Instagramauth />} />
                <Route path="society/:code/createactivity" element={<ActivityForm />} />
                <Route path="society/:code/createproduct" element={<CreateProductPage/>} />
                <Route path="society/:code/createsingleproduct" element={<CreateSingleProductContainer/>} />
            <Route exact path="society/:code/manage/:id/editactivity" element={<EditActivity />} />
            <Route exact path="society/:code/manage/:id/editproduct" element={<EditProduct />} />
            <Route exact path="society/:code/manage/editproduct/:id" element={<EditProduct />} />
            <Route exact path="society/:code/editmembership" element={<EditMembership />} />
                
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
        
          {/* </NotiProvider> */}
        </AuthProvider>
      </InfoProvider>
      {/* <Routes>
        <Route path="/error" element={<Error />} />
      </Routes> */}
      <Toaster richColors/>
    </BrowserRouter>
    
  );
}

export default App;
