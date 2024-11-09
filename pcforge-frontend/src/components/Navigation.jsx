import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Ikony

import logo from '../assets/Logo.svg'
import d_profile from '../assets/default-profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

// Serwisy

import AuthService from "../services/auth.service";
import UserService from '../services/user.service';

const Navigation = () => {

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const menuRefSetup = useRef(null);
  const menuRefUser = useRef(null);

  // Zmienne do menu

  const [dropdownUser, setDropdownUser] = useState(false);
  const [dropdownSetup, setDropdownSetup] = useState(false);

  useEffect(() => {
    UserService.getUser().then(data => setUser(data)).catch(() => {setUser(null);});
  }, []);

  // Funkcje do menu

  const toggleDropdownUser = () => {
    setDropdownUser(!dropdownUser);
  }
  
  const toggleDropdownSetup = () => {
    setDropdownSetup(!dropdownSetup);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRefSetup.current && !menuRefSetup.current.contains(event.target)) {
      setDropdownSetup(false);
    }
    if (menuRefUser.current && !menuRefUser.current.contains(event.target)) {
      setDropdownUser(false);
    }
  };

  const logOut = () =>{
    AuthService.logout();
    navigate(0);
  }

  return (
    <nav className='w-full h-16 top-0 bg-white shadow-lg justify-between flex sticky relative'>
      <Link to="/" className="w-1/6 flex text-center">
        <img src={logo} className='ml-5 mr-2' alt="LOGO"/>
        <p className='my-auto text-xl font-bold font-mono opacity-90'>PC_Forge</p>
      </Link>
      <ul className="flex text-center space-x-16 absolute left-1/2 transform -translate-x-1/2">
        <li className='hover:text-sky-500 my-auto opacity-90'>
          <Link to="/">Home</Link>
        </li>
        <li className="relative inline-block" ref={menuRefSetup}>
          <button onClick={toggleDropdownSetup} className="flex hover:text-sky-500 min-h-16" type='button'>
            <Link to="#" className="my-auto opacity-90">
              Computer Setup
            </Link>
            {dropdownSetup ?
              <FontAwesomeIcon className='my-auto mx-2 opacity-75' icon={faCaretUp} />
              :
              <FontAwesomeIcon className='my-auto mx-2 opacity-75' icon={faCaretDown} />

            }
          </button>
          <div className={`${dropdownSetup ? false : 'hidden'} bg-gray-100 text-center shadow-lg absolute w-full`}>
            <ul class="text-sm text-gray-700">
              <li>
                <Link to="/confy" className="block py-2 hover:text-sky-500 opacity-90">By yourself</Link>
              </li>
              <li>
                <Link to="#" className="block py-2 hover:text-sky-500 opacity-90">By your games</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className='hover:text-sky-500 my-auto opacity-90'>
          <Link to="/userSetups" className="button">
            Users setups
          </Link>
        </li>
      </ul>
        {user ? (
          <div className='h-full' ref={menuRefUser}>
            <button onClick={toggleDropdownUser} className="flex hover:text-sky-500" type='button'>
              <div className='my-auto text-sm w-44'>
                <p className='my-auto font-semibold opacity-90'>{user.username}</p>
                <p className='my-auto break-all whitespace-normal opacity-70'>{user.email}</p>
              </div>
              <img src={user.photo ? user.photo : d_profile} className='mx-5 my-1 max-h-14 border border-gray-800' alt="LOGO"/>
            </button>
            <div className={`${dropdownUser ? false : 'hidden'} bg-gray-100 text-center shadow-lg`}>
              <ul class="text-sm text-gray-700 opacity-90">
                <li>
                  <Link to="#" className="block py-2 hover:text-sky-500">My profile</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 hover:text-sky-500">My setups</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 hover:text-sky-500">Saved setups</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 hover:text-sky-500" onClick={logOut}>Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        ): (
          <Link to="/login" className="flex hover:text-sky-500">
            <div className='my-auto font-semibold w-44'>
              <p className='my-auto'>Log in to platform</p>
            </div>
            <img src={d_profile} className='mx-5 my-1 max-h-14' alt="LOGO"/>
          </Link>
        )}
    </nav>
  );
}

export default Navigation;