import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import UserContext from '../context/user.context';

const CustomNavbar = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userContext=useContext(UserContext)

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const doLogout=()=>{
    
    userContext.logout()
    
  }

  return (
    <AppBar position="static" className="bg-blue-400 dark:bg-gray-900 flex">
      <Toolbar>
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/shop.jpeg" alt="Shop Icon" className="h-12 w-12 dark:bg-white rounded-full" />
          <Typography variant="h6" className="dark:text-white">
            MyShop
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuToggle}
          sx={{ display: { xs: 'block', md: 'none' } }} // Show only on mobile
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }}>
          <Link to="/" className="text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700">Home</Link>
          <Link to="/service" className="text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700">Features</Link>
          <Link to="/about" className="text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700 ">About</Link>
          <Link to="/cart" className="text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700">Cart(12)</Link>
          <Link to="/contact" className="text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700">Contact</Link>

          {
              userContext.isLogin ? (
                // Add content for logged-in users here, like a logout button or user profile link.
                <>
                {
                  userContext.isAdminUser &&(
                    <>
                      <Link component={Link}  to="/admin/home" className='text-white mx-2 hover:scale-105       dark:hover:text-blue-600 hover:text-gray-700'>
                        Admin Dashboard
                      </Link>
                    </>
                  )
                }

                <Link component={Link} to={`/users/profile/${userContext?.userData?.user?.userId}`} onClick={handleMenuClose} className='text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700'>
                  {userContext?.userData?.user?.name}
                </Link>
                 <Link component={Link}  onClick={doLogout} className='text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700'>
                 Logout
               </Link>
                </>
              ) : (
                <>
                  <Link component={Link} to="/login" onClick={handleMenuClose} className='text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700'>Login</Link>
                  <Link component={Link} to="/register" onClick={handleMenuClose} className='text-white mx-2 hover:scale-105 dark:hover:text-blue-600 hover:text-gray-700'>Register</Link>
                </>
              )
            }

          {/* Dropdown Menu for Desktop */}
          <Link onClick={handleDropdownOpen} component={Link} className='text-white mx-2 hover:scale-105  dark:hover:text-blue-600 hover:text-gray-700 flex'>
              Product Category

              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={20}
                  width={25}
                  viewBox="0 0 448 512"
                  fill="currentColor" 
                  className=' pt-2 pl-1'
                >
                  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
            </Link>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)} // Ensure open prop is a boolean
              onClose={handleDropdownClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem component={Link} to="/smart-tvs" onClick={handleDropdownClose} className='hover:scale-105 dark:hover:text-blue-600'>Smart TVs</MenuItem>
              <MenuItem component={Link} to="/smart-phones" onClick={handleDropdownClose} className='hover:scale-105 dark:hover:text-blue-600'>Smart Phones</MenuItem>
              <MenuItem component={Link} to="/laptops" onClick={handleDropdownClose} className='hover:scale-105 dark:hover:text-blue-600'>Laptops</MenuItem>
              <MenuItem component={Link} to="/more" onClick={handleDropdownClose} className='hover:scale-105 '>More</MenuItem>
            </Menu>

          <IconButton onClick={toggleTheme} color="inherit" className='hover:scale-110 '>
              {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Box>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            position: 'absolute',
            top: '64px', // height of AppBar
            right: 0,
            bgcolor: theme=== 'dark' ? 'black' : 'darkblue', // Corrected to "black"
            boxShadow: 3,
            zIndex: 1,
            width: '200px',
          }}
          
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose} className=' hover:scale-105'>Home</MenuItem>
            <MenuItem component={Link} to="/service" onClick={handleMenuClose} className=' hover:scale-105'>Features</MenuItem>
            <MenuItem component={Link} to="/about" onClick={handleMenuClose} className=' hover:scale-105'>About</MenuItem>
            <MenuItem component={Link} to="/cart" onClick={handleMenuClose} className=' hover:scale-105'>Cart(12)</MenuItem>
            <MenuItem component={Link} to="/contact" onClick={handleMenuClose} className=' hover:scale-105'>Contact</MenuItem>
            {
              userContext.isLogin ? (
                // Add content for logged-in users here, like a logout button or user profile link.
                <>

                {
                  userContext.isAdminUser &&(
                    <>
                      <MenuItem component={Link}  to="/admin/home" className='text-white mx-2 hover:scale-105       dark:hover:text-blue-600 hover:text-gray-700'>
                        Admin Dashboard
                      </MenuItem>
                    </>
                  )
                }


                <MenuItem component={Link} to={`/users/profile/${userContext?.userData?.user?.userId}`} onClick={handleMenuClose} className='hover:scale-105'>
                  {userContext?.userData?.user?.name}
                </MenuItem>
                 <MenuItem component={Link}  onClick={doLogout} className='hover:scale-105'>
                 Logout
               </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose} className='hover:scale-105'>Login</MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleMenuClose} className='hover:scale-105'>Register</MenuItem>
                </>
              )
            }
            {/* Dropdown for Mobile */}
            <MenuItem  onClick={handleDropdownOpen} className='text-black flex'>
              Product Category  
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={18}
                  width={18}
                  viewBox="0 0 448 512"
                  fill="currentColor" 
                  className='pt-1 pl-2'
                >
                  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
            </MenuItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)} // Ensure open prop is a boolean
              onClose={handleDropdownClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem component={Link} to="/smart-tvs" onClick={handleDropdownClose} className='hover:scale-105'>Smart TVs</MenuItem>
              <MenuItem component={Link} to="/smart-phones" onClick={handleDropdownClose} className='hover:scale-105'>Smart Phones</MenuItem>
              <MenuItem component={Link} to="/laptops" onClick={handleDropdownClose} className='hover:scale-105'>Laptops</MenuItem>
              <MenuItem component={Link} to="/more" onClick={handleDropdownClose} className='hover:scale-105'>More</MenuItem>
            </Menu>

            <IconButton onClick={toggleTheme} color="inherit" className='hover:scale-105 '>
              {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
