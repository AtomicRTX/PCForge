import React, { useEffect, useState } from 'react'

import Background from '../components/Background'
import Navigation from '../components/Navigation'
import UserSetupList from '../components/UserSetups/UserSetupList'
import ComputerService from '../services/computer.service'

const UserSetupsPage = () => {

    const[setups, setSetups] = useState([]);

    useEffect(() => {
        ComputerService.getAllComputers()
          .then(data => setSetups(data)
          )
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

  return (
    <>
      <Background>
        <Navigation/>
        <UserSetupList setups={setups}/>
      </Background>
    </>
  )
}

export default UserSetupsPage