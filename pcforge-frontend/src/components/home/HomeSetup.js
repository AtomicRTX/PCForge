import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import SETUP from '../../assets/Setup.svg';

import ComponentService from '../../services/component.service';
import UserService from '../../services/user.service';
import ComputerService from '../../services/computer.service';
import SetupModal from "../setups/SetupModal";

import ReactStars from "react-rating-stars-component";

const HomeSetup = ({computerSetup, onDiscard, remove}) => {

    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState({rating: 0, count: 0})

    const [setup, setSetup] = useState({
        cpu: {},
        gpu: {},
        motherboard: {},
        ram: {},
        case: {},
        power: {},
        storage: {},
        user: computerSetup.user_id
    })

    useEffect(() => {
        UserService.getUser()
            .then(data => setUser(data)
            )
            .catch(() => {
                setUser(null);
            });
    }, []);

    useEffect(() => {
        ComponentService.getCPU(computerSetup.cpu_id).then(data => setSetup(prevSetup => ({...prevSetup, cpu: data})));
        ComponentService.getGPU(computerSetup.gpu_id).then(data => setSetup(prevSetup => ({...prevSetup, gpu: data})));
        ComponentService.getMotherboard(computerSetup.mb_id).then(data => setSetup(prevSetup => ({...prevSetup, motherboard: data})));
        ComponentService.getRAM(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, ram: data})));
        ComponentService.getComputerCase(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, case: data})));
        ComponentService.getPower(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, power: data})));
        ComponentService.getStorage(computerSetup.st_id).then(data => setSetup(prevSetup => ({...prevSetup, storage: data})));
        ComputerService.getRatingsOfComputerSetup(computerSetup.cs_id).then(data => setRating({rating: data[0], count: data[1]}))

    }, [computerSetup, isModalOpen]);

    useEffect(() => {
        if (user != null)
            ComputerService.isSavedComputer(computerSetup.cs_id).then(data => setIsSaved(data));
    }, [user]);

    const handleSaveClick = (e) => {
        e.stopPropagation();
        ComputerService.saveComputer(computerSetup.cs_id).then(() => ComputerService.isSavedComputer(computerSetup.cs_id).then(data => setIsSaved(data)));
        if (onDiscard)
            onDiscard(computerSetup.cs_id);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        ComputerService.deleteComputer(computerSetup.cs_id);
        if (onDiscard)
            onDiscard(computerSetup.cs_id);
    };
    return (
        <button onClick={() => setIsModalOpen(true)} className='text-left'>
            <div className='flex bg-white h-36 p-4 rounded-lg justify-between'>
                <div className='flex'>
                    <img src={SETUP} className='w-36' alt="Setup"/>
                    <div className='flex space-x-12 my-auto w-3/5'>
                        <div>
                            <p className="mb-5">Processor: <p
                                className='font-bold w-96'>{setup.cpu.name} @{setup.cpu.base_clock}GHz</p></p>
                            <p className="p">Video card: <p
                                className='font-bold'>{setup.gpu.name} {setup.gpu.vram}GB</p></p>
                        </div>
                        <div>
                            <p className="mb-5">RAM: <p className='font-bold w-36'>{setup.ram.size} GB</p></p>
                            <p className="p">Storage: <p className='font-bold'>{setup.storage.size} GB</p></p>
                        </div>
                        <div>
                            <p className="mb-5 w-48 mt-7">
                                <div className="flex items-center space-x-2">
                                    <ReactStars
                                        key={`stars_${rating.rating}`}
                                        count={5}
                                        value={rating.rating}
                                        edit={false}
                                        size={24}
                                        isHalf={true}
                                        activeColor="#0ea5e9"
                                    />
                                    <p className="mt-1 text-sm">{rating.rating}</p>
                                </div>
                                <p className="text-sm ml-1">
                                    {rating.count} opinion
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
                {user ? (
                    remove ? (
                        <button className="bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none w-1/6 h-3/4 my-auto" onClick={(e) => {handleDeleteClick(e);}}> Delete setup</button>
                    ) : (
                        isSaved ? (
                            <button className="bg-gray-500 text-white rounded-lg hover:bg-sky-700 focus:outline-none w-1/6 h-3/4 my-auto" onClick={(e) => {handleSaveClick(e);}}> Discard setup </button>
                        ) : (
                            <button className="bg-sky-500 text-white rounded-lg hover:bg-sky-700 focus:outline-none w-1/6 h-3/4 my-auto" onClick={(e) => {handleSaveClick(e);}}> Save setup </button>
                        )
                    )

                ) : (
                    <Link to="/login"
                          className="flex items-center bg-sky-500 text-white rounded-lg hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/6 h-3/4 my-auto">
                        <p className="mx-auto">Log in to save</p>
                    </Link>
                )}
            </div>
            <SetupModal cs_id={computerSetup.cs_id} setup={setup} isModalOpen={isModalOpen} onClose={(m) => setIsModalOpen(m)} user={user}/>
        </button>
    )
}
export default HomeSetup;