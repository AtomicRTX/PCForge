import React, {useState, useEffect} from 'react';

import Setup from '../setups/Setup';
import UserService from '../../services/user.service';

const HomeSetupList = ({setups}) => {

    const [user, setUser] = useState(null);
    const [filteredSetup, setFilteredSetup] = useState([]);

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

    const limitedSetups = filteredSetup.slice(0, 3);

    return (
        <div className='flex flex-col h-full w-5/6 mx-auto mt-5 gap-4 relative'>
            {limitedSetups.map((setup, index) => (
                    <Setup key={index} computerSetup={setup} />
                ))}
        </div>
    )
}

export default HomeSetupList;