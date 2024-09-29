import React, { useState, useEffect } from 'react';

import Setup from './UserSetup';
import UserService from '../services/user.service';

const SetupList = ({setups}) => {

    const[user, setUser] = useState(null);
    const[filteredSetup, setFilteredSetup] = useState([]);

    useEffect(() => {
        UserService.getUser()
          .then(data => {
            setUser(data);
            setFilteredSetup(setups.filter((setup) => setup.user_id !== user.user_id));
          }
          )
          .catch(() => {
            setUser(null);
            setFilteredSetup(setups);
          });
    }, [setups]);

    return (
        <div className='flex flex-col h-full p-16 gap-4 overflow-auto'>
            {filteredSetup.map((setup) => (<Setup computerSetup={setup}/>))}
        </div>
      )
}

export default SetupList;