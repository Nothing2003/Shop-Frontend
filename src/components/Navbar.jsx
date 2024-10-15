import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#dropdownNavbarLink') && !event.target.closest('#dropdownNavbar')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className={`app ${theme}` } >
      <nav className="bg-blue-400 border-gray-200 dark:bg-gray-900 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
             <img src="/images/shop.jpeg" alt="Shop Icon" className="h-12 w-12 dark:bg-white rounded-full dark:border-gray-500" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyShop</span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu} 
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-blue-500 rounded-lg bg-blue-400 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="relative">
          <button
            id="dropdownNavbarLink"
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
          >
            Product Category
          <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
           >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
            />
            </svg>
            </button>

          {isDropdownOpen && (
          <div
            id="dropdownNavbar"
            className="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Smart TVs
                    </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                       Smart Phone
                      </Link>
                    </li>
                    <li>
                      <Link
                       to="/"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Laptop
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              More
            </Link>
          </div>
                </div>
                 ) }
              </li>
              <li>
                <Link to="/service" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </Link>
              </li>
              <li>
                
                <Link to="/cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Cart(12)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Contact
                </Link>
              </li>
              <li className=''>
                <Link to="/users/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Login
                </Link>
              </li>
              <li className=''>
                <Link to="/users/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Signup
                </Link>
              </li>
              <li>
                <button
                  className="text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:hover:bg-blue-100 dark:focus:ring-blue-800 flex  dark:bg-white"
                  onClick={toggleTheme}
                >
                    <img src={theme==='light'? '/images/light.png':'/images/dark.png'} alt="" className="h-5 w-10 mr-2 rounded" />
                  
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CustomNavbar;
