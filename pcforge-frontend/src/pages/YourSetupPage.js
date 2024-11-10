import React, { useEffect, useState } from 'react'

import Background from '../components/Background'
import Navigation from '../components/Navigation'
import ComputerService from '../services/computer.service'
import YourSetupList from "../components/YourSetups/YourSetupList";

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
                <YourSetupList setups={setups}/>
            </Background>
        </>
    )
}

export default UserSetupsPage