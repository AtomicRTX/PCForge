import React, {useEffect, useState} from 'react'

import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import SavedSetupList from '../../components/setups/SavedSetupList'
import ComputerService from '../../services/computer.service'

const UserSetupsPage = () => {

    const [setups, setSetups] = useState([]);

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
                <SavedSetupList setups={setups}/>
            </Background>
        </>
    )
}

export default UserSetupsPage