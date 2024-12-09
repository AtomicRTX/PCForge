import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import SETUP from "../../assets/Setup.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";
import ComponentService from "../../services/component.service";
import ComputerService from "../../services/computer.service";

const CreateSetupModal = ({computerSetup, isModalOpen, onClose}) => {
    Modal.setAppElement('#root');

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

    const closeModal = (e) => {
        e.stopPropagation()
        onClose(false);
    }

    useEffect(() => {
        if(computerSetup.cpu_id){
            ComponentService.getCPU(computerSetup.cpu_id).then(data => setSetup(prevSetup => ({...prevSetup, cpu: data})));
            ComponentService.getGPU(computerSetup.gpu_id).then(data => setSetup(prevSetup => ({...prevSetup, gpu: data})));
            ComponentService.getMotherboard(computerSetup.mb_id).then(data => setSetup(prevSetup => ({...prevSetup, motherboard: data})));
            ComponentService.getRAM(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, ram: data})));
            ComponentService.getComputerCase(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, case: data})));
            ComponentService.getPower(computerSetup.ram_id).then(data => setSetup(prevSetup => ({...prevSetup, power: data})));
            ComponentService.getStorage(computerSetup.st_id).then(data => setSetup(prevSetup => ({...prevSetup, storage: data})));
        }
    }, [isModalOpen]);

    return (
        <Modal isOpen={isModalOpen} contentLabel="Setup info"
               className='relative mt-14 p-8 w-2/3 h-2/3 bg-white rounded-lg'
               overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center backdrop-blur-[2px] z-20'>
            <div className="text-center font-bold text-2xl">
                Created setup
            </div>
            <div className="flex my-12">
                <div className="flex items-center w-1/3">
                    <img src={SETUP} className='w-64 mx-auto' alt="Setup"/>
                </div>
                <div>
                    <p className="flex mb-5 space-x-2">Processor:
                        <p className='font-bold ml-2'>{setup.cpu.name} @{setup.cpu.base_clock}GHz</p>
                        <p className='font-bold'>{setup.cpu.cores} cores, {setup.cpu.threads} threads</p>
                    </p>
                    <p className="flex mb-5">Video card:
                        <p className='font-bold ml-2'>{setup.gpu.name} {setup.gpu.vram}GB</p>
                    </p>
                    <p className="flex mb-5">Motherboard:
                        <p className='font-bold ml-2'>{setup.motherboard.name}</p>
                    </p>
                    <p className="flex mb-5">RAM:
                        <p className='font-bold ml-2'>{setup.ram.name} {setup.ram.size} GB</p>
                    </p>
                    <p className="flex mb-5">Case:
                        <p className='font-bold ml-2'>{setup.case.name}</p>
                    </p>
                    <p className="flex mb-5">Power Supply:
                        <p className='font-bold ml-2'>{setup.power.name} {setup.power.watt}W</p>
                    </p>
                    <p className="flex mb-5">Storage:
                        <p className='font-bold ml-2'>{setup.storage.name} {setup.storage.size}GB</p>
                    </p>
                </div>
            </div>
            <div className="flex h-fit w-full items-center justify-center">
                <button onClick={closeModal}
                        className='bg-sky-500 text-white rounded-lg h-20 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2'>Close
                </button>
            </div>
        </Modal>
    )
}
export default CreateSetupModal