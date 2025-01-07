import React, {useEffect, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import UserService from "../../services/user.service";
import authHeader from "../../services/auth-header";
import d_profile from "../../assets/default-profile.jpg";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUser()
            .then(data => {
                setUser(data);
                setUsername(data.username || '');
                setPhone(data.phone || '');
                setPhoto(data.photo || null);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setPhoto(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', username);
        formData.append('phone', phone);

        if (photo) {
            formData.append('photo', photo);
        }

        console.log(formData)

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/user/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...authHeader(),
                },
            });
            navigate("/profile");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative mx-auto mt-14 p-8 w-1/4 h-3/4 bg-white rounded-lg">
            <div className="flex mx-auto items-center w-1/2">
                <img src={user.photo ? user.photo : d_profile} alt="User"
                     className='w-64 mx-auto mb-10'/>
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-semibold text-gray-700">Photo</label>
                <div
                    {...getRootProps()}
                    className="mt-1 border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer hover:bg-gray-100"
                >
                    <input {...getInputProps()} />
                    {photo ? (
                        <p className="text-sm text-gray-600">Selected file: {photo.name}</p>
                    ) : (
                        <p className="text-sm text-gray-500">Drop photo</p>
                    )}
                </div>
            </div>

            <div className="flex h-fit w-full items-center justify-center mt-24">
                <button
                    type="submit"
                    className='bg-sky-500 text-white rounded-lg h-20 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2'>
                    Update profile
                </button>
            </div>
        </form>
);
};

export default EditProfile;