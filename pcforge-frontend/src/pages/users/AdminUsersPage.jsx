import React, {useEffect, useState} from 'react'

import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import UserService from "../../services/user.service";
import AdminUsersList from "../../components/users/AdminUsersList";

const AdminUsersPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getAllUsers()
            .then(data => setUsers(data)
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <>
            <Background>
                <Navigation/>
                <AdminUsersList users={users}/>
            </Background>
        </>
    )
}

export default AdminUsersPage