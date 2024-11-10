import React, {useState, useEffect} from 'react';

import Setup from './Setup';
import UserService from '../../services/user.service';
import ReactPaginate from "react-paginate";

const YourSetupList = ({setups}) => {

    const [user, setUser] = useState(null);
    const [filteredSetup, setFilteredSetup] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        UserService.getUser()
            .then(data => {
                    setUser(data);
                    setFilteredSetup(setups.filter((setup) => setup.user_id === user.user_id));
                }
            )
            .catch(() => {
                setUser(null);
                setFilteredSetup(setups);
            });
    }, [setups]);

    const endOffset = itemOffset + itemsPerPage;
    const currentSetups = filteredSetup.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredSetup.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredSetup.length;
        setItemOffset(newOffset);
    };

    const handleDiscard = (cs_id) => {
        setFilteredSetup(prevSetups => prevSetups.filter(setup => setup.cs_id !== cs_id));
    };

    return (
        <div key={itemOffset} className='flex flex-col h-full w-5/6 mx-auto mt-5 gap-4 relative'>
            {currentSetups && currentSetups.map((setup, index) => (
                <Setup key={index} computerSetup={setup} onDiscard={handleDiscard} remove={true}/>))}
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

export default YourSetupList;