import React from 'react';

import Navigation from "../../components/template/Navigation";
import Background from "../../components/template/Background";
import EditProfile from "../../components/users/EditProfile";


const EditProfilePage = () => {
    return (
        <>
            <Background>
                <Navigation/>
                <EditProfile/>
            </Background>
        </>
    )
}

export default EditProfilePage