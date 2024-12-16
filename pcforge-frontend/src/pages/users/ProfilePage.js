import React from 'react';

import ProfileInfo from '../../components/users/ProfileInfo'
import Navigation from "../../components/template/Navigation";
import Background from "../../components/template/Background";


const ProfilePage = () => {
    return (
        <>
            <Background>
                <Navigation/>
                <ProfileInfo/>
            </Background>
        </>
    )
}

export default ProfilePage