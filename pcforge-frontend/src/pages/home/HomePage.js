import React, {useEffect, useState} from 'react'
import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import ConfiguratorsButtons from "../../components/home/ConfiguratorsButtons";
import ComputerService from "../../services/computer.service";
import HomeSetupList from "../../components/home/HomeSetupList";

const HomePage = () => {

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
                <ConfiguratorsButtons/>
                <div className="text-2xl font-bold text-white text-center my-5">User setups</div>
                <HomeSetupList setups={setups}/>
            </Background>
        </>
    )
}

export default HomePage