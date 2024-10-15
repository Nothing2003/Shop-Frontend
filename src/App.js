
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages';
import About from './pages/about';
import Cart from './pages/cart';
import Store from './pages/Store';
import Dashbord from './pages/normal/dashbord';
import Profile from './pages/normal/profile';
import AboutUser from './pages/normal/about.user';
import Services from './pages/services';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';


function App() {
  return (
   
   <BrowserRouter >
   <CustomNavbar />
   <Routes>
    <Route path='/' element={< Index/>}/>    
    <Route path='/about' element={< About/>}/> 
    <Route path='/service' element={ <Services/>}/>
    <Route path='/contact' element={ <Contact/>}/>
    <Route path='/cart' element={< Cart/>}/>
    <Route path='/store' element={< Store/>}/>
    <Route path='/users'element={<Dashbord />} >
      <Route path='profile' element={<Profile />} /> 
      <Route path='about' element={<AboutUser />} /> 
    </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
