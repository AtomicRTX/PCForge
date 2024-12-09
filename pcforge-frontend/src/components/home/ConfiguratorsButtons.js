import React, {useState, useEffect} from 'react';
import UserService from '../../services/user.service';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faDesktop, faGamepad, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const ConfiguratorsButtons = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        UserService.getUser()
            .then(data => setUser(data)
            )
            .catch(() => {
                setUser(null);
            });
    }, []);
    return (
        <div className='flex mx-auto w-5/6 h-1/4 space-x-10 justify-center items-center'>
            <Link to="/confy" className='text-center w-1/2 h-1/2 border bg-white shadow-lg rounded-lg justify-center p-5'>
                <div className="flex h-1/2 mb-5 space-x-2 justify-center">
                    <FontAwesomeIcon icon={faPlus} className="opacity-80 h-full"/>
                    <FontAwesomeIcon icon={faDesktop} className="opacity-80 h-full"/>
                </div>
                <p className="font-bold text-lg opacity-80 h-1/2">
                    Manual configurator
                </p>
            </Link>
            <Link to="/confs" className='text-center w-1/2 h-1/2 border bg-white shadow-lg rounded-lg justify-center p-5'>
                <div className="flex h-1/2 mb-5 space-x-2 justify-center">
                    <FontAwesomeIcon icon={faPlus} className="opacity-80 h-full"/>
                    <FontAwesomeIcon icon={faClipboard} className="opacity-80 h-full"/>
                </div>
                <p className="font-bold text-lg opacity-80 h-1/2">
                    Configurator by software
                </p>
            </Link>
        </div>
    )
}
export default ConfiguratorsButtons;