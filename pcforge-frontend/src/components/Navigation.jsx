import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg'
import d_profile from '../assets/default-profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import AuthService from "../services/auth.service";
import UserService from '../services/user.service';

const Navigation = () => {
  const [user, setUser] = useState({});

  const [dropdownUser, setDropdownUser] = useState(false);
  const [dropdownSetup, setDropdownSetup] = useState(false);

  useEffect(() => {
    UserService.getUser()
      .then(data => setUser(data)
      )
      .catch(error => {
        console.error('Error:', error);
        setUser(null);
      });
  }, []);

  const toggleDropdownUser = () => {
    setDropdownUser(!dropdownUser);
  };

  const toggleDropdownSetup = () => {
    setDropdownSetup(!dropdownSetup);
  };

  const logOut = () =>{
    AuthService.logout();
    window.location.reload();
}

  return (
    <nav className='w-full h-16 absolute top-0 bg-white shadow-lg justify-between flex'>
      <Link to="/" className="flex text-center">
        <img src={logo} className='mx-5' alt="LOGO"/>
        <p className='my-auto text-xl font-bold'>PCForge</p>
      </Link>
      <ul className="flex text-center space-x-16">
        <li className='hover:text-orange-500 my-auto'>
          <Link to="/" className="font-bold">Home</Link>
        </li>
        <li>
          <button onClick={toggleDropdownSetup} className="flex hover:text-orange-500 min-h-16" type='button'>
            <Link to="#" className="my-auto">
              Computer Setup
            </Link>
            <FontAwesomeIcon className='my-auto mx-2' icon={faCaretDown} />
          </button>
          <div className={`${dropdownSetup ? false : 'hidden'} bg-gray-100 text-center shadow-lg`}>
            <ul class="text-sm text-gray-700">
              <li>
                <Link to="#" className="block py-2 hover:text-orange-500">By yourself</Link>
              </li>
              <li>
                <Link to="#" className="block py-2 hover:text-orange-500">By your games</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className='hover:text-orange-500 my-auto'>
          <Link to="#" className="button">
            Users setups
          </Link>
        </li>
      </ul>
        {user ? (
          <div>
            <button onClick={toggleDropdownUser} className="flex hover:text-orange-500" type='button'>
              <div className='my-auto text-sm w-44'>
                <p className='my-auto font-semibold'>{user.username}</p>
                <p className='my-auto break-all whitespace-normal'>{user.email}</p>
              </div>
              <img src={user.photo} className='mx-5 my-1 max-h-14' alt="LOGO"/>
            </button>
            <div className={`${dropdownUser ? false : 'hidden'} bg-gray-100 text-center shadow-lg`}>
              <ul class="text-sm text-gray-700">
                <li>
                  <Link to="#" className="block py-2 hover:text-orange-500">My profile</Link>
                </li>
                <li>
                  <Link to="#" className="block py-2 hover:text-orange-500" onClick={logOut}>Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        ): (
          <Link to="/login" className="flex hover:text-orange-500">
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