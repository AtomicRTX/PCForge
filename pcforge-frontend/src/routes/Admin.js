import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import UserService from '../services/user.service';

const Admin = () => {
    const [admin, setAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setIsLoggedIn(true);
            UserService.isAdmin()
                .then(data => {
                    setAdmin(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching admin status:', error);
                    setLoading(false);
                });
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isLoggedIn === false) {
        return <Navigate to="/" />;
    }

    return (
        <div className="w-full h-full">
            {admin ? <Outlet /> :  <Navigate to="/" />}
        </div>
    );
};

export default Admin;