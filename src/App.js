import { ThemeProvider } from '@material-tailwind/react';
import theme from '@material-tailwind/react/theme'; // Adjust the path accordingly
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Ensure Routes and Route are imported
import './App.css';
import Index from './pages';
import About from './pages/about';
import Cart from './pages/cart';
import Store from './pages/store';
import Dashbord from './pages/normal/dashbord';
import Profile from './pages/normal/profile';
import AboutUser from './pages/normal/about.user';
import Services from './pages/services';
import Contact from './pages/contact';
import { Flip, ToastContainer } from 'react-toastify';
import Login from './pages/login';
import Register from './pages/register';
import CustomNavbar from './components/Navbar';
import Home from './pages/normal/home';
import UserProvider from './context/user.provider';
import AdminHome from './pages/admin/admin.home';
import AddProduct from './pages/admin/add.product';
import AdminDashboard from './pages/admin/admin.dashbord';
function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer
            theme='dark'
            draggable={true}
            transition={Flip}
            position='top-center'
            hideProgressBar={true}
            autoClose={2000}
          />
          <CustomNavbar />
          <Routes>
            <Route path='/' element={<Index />} />    
            <Route path='/about' element={<About />} /> 
            <Route path='/service' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/store' element={<Store />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/users' element={<Dashbord />}>
              <Route path='home' element={<Home />} /> 
              <Route path='profile' element={<Profile />} /> 
              <Route path='about' element={<AboutUser />} /> 
            </Route>
            <Route path='/admin' element={<AdminDashboard />}>
              <Route path='home' element={<AdminHome/>} />
              <Route path='add-product' element={<AddProduct/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
   
  );
}

export default App;
