import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/user.service';
import d_profile from "../../assets/default-profile.jpg";

const ProfileInfo = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUser()
            .then(data => setUser(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEditProfile = () => {
        navigate("/edit");
    };

    return (
        <div className="relative mx-auto mt-14 p-8 w-1/4 h-3/4 bg-white rounded-lg">
            <div>
                <div className="flex mx-auto items-center w-1/2">
                    <img src={user.photo ? user.photo : d_profile} alt="User" className='w-64 mx-auto mb-10'/>
                </div>
                <div className="text-center mb-5">
                    <p className="space-x-2">Username: </p>
                    <p className='font-bold mb-5'>{user.username}</p>
                    <p className='space-x-2'>E-mail:</p>
                    <p className='font-bold mb-5'>{user.email}</p>
                    <p className='space-x-2'>Phone number: </p>
                    <p className='font-bold mb-5'>{user.phone ? user.phone : "Not given"}</p>
                </div>
            </div>
            <div className="flex h-fit w-full items-center justify-center mt-40">
                <button onClick={handleEditProfile}
                        className='bg-sky-500 text-white rounded-lg h-20 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2'>Edit profile
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo;