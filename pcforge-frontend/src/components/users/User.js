import React, {useState} from 'react';
import d_profile from "../../assets/default-profile.jpg";
import DeleteModal from "../setups/DeleteModal";
import UserService from "../../services/user.service";

const User = ({user, onDiscard}) => {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = (e) => {
        UserService.deleteUser(user.user_id);
        if (onDiscard)
            onDiscard(user.user_id);
    };

    return (
        <div className='relative flex bg-white h-36 p-4 rounded-lg text-sm'>
            <img src={user.photo ? user.photo : d_profile} className='w-28' alt="Setup"/>
            <div className='flex ml-10 my-auto'>
                <div>
                    <p className="mb-5">Name: <p
                        className='font-bold w-96'>{user.username}</p></p>
                    <p className="mb-5">Email: <p
                        className='font-bold w-96'>{user.email}</p></p>
                </div>
            </div>
            <button
                className="absolute bg-red-500 text-base top-7 right-4 text-white rounded-lg hover:bg-red-700 focus:outline-none w-1/6 h-3/5 my-auto"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true)
                }}> Delete user
            </button>
            <DeleteModal isModalOpen={isDeleteModalOpen} onDelete={(e) => {handleDeleteClick(e); setIsDeleteModalOpen(false)}} onClose={() => setIsDeleteModalOpen(false)}/>
        </div>
    )
}
export default User;