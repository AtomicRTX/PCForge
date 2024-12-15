import React, {useEffect, useState} from 'react'

import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import ComputerService from '../../services/computer.service'
import AdminSetupList from "../../components/setups/AdminSetupList";

const AdminSetupsPage = () => {

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
                <AdminSetupList setups={setups}/>
            </Background>
        </>
    )
}

export default AdminSetupsPage