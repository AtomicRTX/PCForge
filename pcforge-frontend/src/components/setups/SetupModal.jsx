import React from 'react';
import Modal from 'react-modal';
import SETUP from "../../assets/Setup.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";

const SetupModal = ({cs_id, setup, isModalOpen, onClose}) => {
    Modal.setAppElement('#root');
    const closeModal = (e) => {
        e.stopPropagation()
        onClose(false);
    }
    return (
        <Modal isOpen={isModalOpen} contentLabel="Setup info"
               className='relative p-8 w-full max-w-3xl bg-white rounded-lg'
               overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center backdrop-blur-[2px] z-20'>
            <button onClick={closeModal} className='absolute top-2 left-2'><FontAwesomeIcon
                className='size-6 lg:size-8' icon={faCircleArrowLeft}/></button>
            <img src={SETUP} className='w-48 mx-auto' alt="Setup"/>
            <p className='text-center font-bold text-xl mt-4 mb-12'>Setup Info #{cs_id}</p>
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
        </Modal>
    )
}
export default SetupModal