import React, { useState, useEffect } from 'react';

import Setup from './SavedSetup';
import UserService from '../../services/user.service';
import ComputerService from "../../services/computer.service";
import ReactPaginate from "react-paginate";

const SavedSetupList = ({setups}) => {

    const[user, setUser] = useState(null);
    const[filteredSetup, setFilteredSetup] = useState([]);

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        UserService.getUser()
            .then(data => {
                    setUser(data);
                }
            );
        if (user) {
            const fetchSavedSetups = async () => {
                const savedSetups = [];
                for (const setup of setups) {
                    const isSaved = await ComputerService.isSavedComputer(setup.cs_id);
                    if (isSaved) {
                        savedSetups.push(setup);
                    }
                }
                setFilteredSetup(savedSetups);
            };

            fetchSavedSetups();
        }
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
            {currentSetups && currentSetups.map((setup, index) => (<Setup key={index} computerSetup={setup} onDiscard={handleDiscard}/>))}
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
                activeClassName="bg-sky-300 text-white"
                activeLinkClassName="bg-sky-300 text-white"
                forcePage={Math.floor(itemOffset / itemsPerPage)}
            />
        </div>
    )
}

export default SavedSetupList;