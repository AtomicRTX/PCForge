import React, {useState, useEffect} from 'react';

import User from './User';
import UserService from '../../services/user.service';
import ReactPaginate from "react-paginate";

const AdminUsersList = ({users}) => {

    const [user, setUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        UserService.getUser()
            .then(data => {
                    setUser(data);
                }
            )
            .catch(() => {
                setUser(null);
            });
        setLoading(true);
    }, [users]);

    const endOffset = itemOffset + itemsPerPage;
    const currentUsers = users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleDiscard = () => {
        window.location.reload()
    };

    if(!loading){
        <>
        </>
    }
    console.log(currentUsers)
    return (
        <div key={itemOffset} className='flex flex-col h-full w-5/6 mx-auto mt-5 gap-4 relative'>
            {currentUsers && currentUsers.map((user, index) => (
                <User key={index} user={user} onDiscard={handleDiscard}/>))}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center space-x-2 absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 rounded-lg bg-white"
                pageLinkClassName="px-4 py-2 rounded-lg bg-white hover:bg-sky-500 hover:text-white"
                previousLinkClassName="px-4 py-2 rounded-lg bg-white hover:bg-sky-500 hover:text-white"
                nextLinkClassName="px-4 py-2 rounded-lg bg-white hover:bg-sky-500 hover:text-white"
                activeClassName="text-sky-500"
                activeLinkClassName="text-sky-500"
                forcePage={Math.floor(itemOffset / itemsPerPage)}
            />
        </div>
    )
}
export default AdminUsersList;