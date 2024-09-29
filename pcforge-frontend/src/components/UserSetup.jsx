import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Ikony

import Setup from '../assets/Setup.svg';

// Serwisy

import PopupInfo from './PopupSetupInfo';
import ComponentService from '../services/component.service';
import UserService from '../services/user.service';
import ComputerService from '../services/computer.service';

const ComputerSetup = ({computerSetup}) => {

    const[user, setUser] = useState(null);

    const[buttonPopup, setButtonPopup] = useState(false);

    const [cpu, setCpu] = useState({});
    const [gpu, setGpu] = useState({});
    const [motherboard, setMotherboard] = useState({});
    const [ram, setRam] = useState({});
    const [computerCase, setComputerCase] = useState({});
    const [power, setPower] = useState({});
    const [storage, setStorage] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        UserService.getUser()
          .then(data => setUser(data)
          )
          .catch(() => {
            setUser(null);
          });
    }, []);

    useEffect(() => {
        ComponentService.getCPU(computerSetup.cpu_id).then(data => setCpu(data));
        ComponentService.getGPU(computerSetup.gpu_id).then(data => setGpu(data));
        ComponentService.getMotherboard(computerSetup.mb_id).then(data => setMotherboard(data));
        ComponentService.getRAM(computerSetup.ram_id).then(data => setRam(data));
        ComponentService.getComputerCase(computerSetup.ram_id).then(data => setComputerCase(data));
        ComponentService.getPower(computerSetup.ram_id).then(data => setPower(data));
        ComponentService.getStorage(computerSetup.st_id).then(data => setStorage(data));
    }, []);

    useEffect(() => {
        if(user != null)
        ComputerService.isSavedComputer(computerSetup.cs_id).then(data => setIsSaved(data));
        console.log(isSaved);
    }, [user]);

    return(
        <button onClick={() => setButtonPopup(true)} className='text-left'>
            <div className='flex bg-white h-48 p-4 rounded-lg justify-between'>
                <div className='flex'>
                <img src={Setup} className='w-36' alt="Setup" />
                <div className='flex space-x-12 my-auto w-3/5'>
                    <div>
                        <p className="mb-5">Processor: <p className='font-bold w-96'>{cpu.name} @{cpu.base_clock}GHz</p></p>
                        <p className="p">Video card: <p className='font-bold'>{gpu.name} {gpu.vram}GB</p></p>
                    </div>
                    <div>
                        <p className="mb-5">RAM: <p className='font-bold w-36'>{ram.size} GB</p></p>
                        <p className="p">Storage: <p className='font-bold'>{storage.size} GB</p></p>
                    </div>
                    <div>
                        <p className="mb-5 w-48">Average expert overall : <p className='font-bold'>5.0/5.0</p><p>5 opinion</p></p>
                    </div>
                </div>
                </div>
                {user ? (
                
                isSaved ? (
                    <button className="bg-gray-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-1/6 h-3/4 my-auto" onClick={(e) => { e.stopPropagation(); }}> Discard setup </button>
                ) : (
                    <button className="bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-1/6 h-3/4 my-auto" onClick={(e) => { e.stopPropagation(); }}> Save setup </button>
                )
                ): (
                <Link to="/login" className="flex items-center bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-1/6 h-3/4 my-auto">
                    <p className="mx-auto">Log in to save</p>
                </Link>
                )}
            </div>
            <PopupInfo trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <p className='text-center font-bold text-xl mt-4 mb-12'>Setup info</p>
                    <p className="flex mb-5 space-x-2">Processor: 
                        <p className='font-bold ml-2'>{cpu.name} @{cpu.base_clock}GHz</p>
                        <p className='font-bold'>{cpu.cores} cores, {cpu.threads} threads</p>
                    </p>
                    <p className="flex mb-5">Video card: 
                        <p className='font-bold ml-2'>{gpu.name} {gpu.vram}GB</p>
                    </p>
                    <p className="flex mb-5">Motherboard: 
                    <p className='font-bold ml-2'>{motherboard.name}</p>
                    </p>
                    <p className="flex mb-5">RAM: 
                        <p className='font-bold ml-2'>{ram.name} {ram.size} GB</p>
                    </p>
                    <p className="flex mb-5">Case: 
                        <p className='font-bold ml-2'>{computerCase.name}</p>
                    </p>
                    <p className="flex mb-5">Power Supply: 
                        <p className='font-bold ml-2'>{power.name} {power.watt}W</p>
                    </p>
                    <p className="flex mb-5">Storage: 
                        <p className='font-bold ml-2'>{storage.name} {storage.size}GB</p>
                    </p>
            </PopupInfo>
        </button>
    )
}
export default ComputerSetup;