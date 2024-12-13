import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import SETUP from "../../assets/Setup.svg";
import ReactStars from "react-rating-stars-component";
import ComputerService from "../../services/computer.service";
import ComponentService from "../../services/component.service";

const ConfiguratorUserModal = ({computerSetup, isModalOpen, onClose, onSave, onChangeSetup}) => {
    Modal.setAppElement('#root');

    const [setup, setSetup] = useState({
        cpu: {},
        gpu: {},
        motherboard: {},
        ram: {},
        case: {},
        power: {},
        storage: {},
        rating: []
    })

    const [setups, setSetups] = useState([])

    const closeModal = (e) => {
        e.stopPropagation()
        onClose(false);
    }

    const fetchDetailsForSetup = (setup) => {
        ComponentService.getCPU(setup.cpu_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, cpu: data } : s
            ))
        );
        ComponentService.getGPU(setup.gpu_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, gpu: data } : s
            ))
        );
        ComponentService.getMotherboard(setup.mb_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, motherboard: data } : s
            ))
        );
        ComponentService.getRAM(setup.ram_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, ram: data } : s
            ))
        );
        ComponentService.getComputerCase(setup.case_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, case: data } : s
            ))
        );
        ComponentService.getPower(setup.power_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, power: data } : s
            ))
        );
        ComponentService.getStorage(setup.st_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, storage: data } : s
            ))
        );
        ComputerService.getRatingsOfComputerSetup(setup.cs_id).then(data =>
            setSetups(prevSetups => prevSetups.map(s =>
                s.id === setup.id ? { ...s, rating: { rating: data[0], count: data[1] } } : s
            ))
        );
    };

    useEffect(() => {
        if(computerSetup.cpu_id){
            ComputerService.getSimilarComputers(
                computerSetup.cpu_id,
                computerSetup.gpu_id,
                computerSetup.ram_id,
                computerSetup.mb_id,
                computerSetup.power_id,
                computerSetup.cs_id,
                computerSetup.st_id)
                .then(data => setSetups(data))
        }
    }, [computerSetup, isModalOpen]);

    useEffect(() => {
        if (setups.length > 0) {
            setups.forEach(setup => {
                fetchDetailsForSetup(setup);
            });
        }
    }, [setups.length]);

    return (
        <Modal isOpen={isModalOpen} contentLabel="Setup info"
               className='relative mt-14 p-8 w-2/3 h-2/3 bg-white rounded-lg'
               overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center backdrop-blur-[2px] z-20'>
            <div className="text-center font-bold text-2xl">
                Similar setups
            </div>
            <div className="my-12 h-[calc(100%-100px)] pb-20">
                {setups.length !== 0 ? (
                    setups.map((setup) => (
                        <div
                            key={setup.cs_id}
                            onClick={() => onChangeSetup(setup)}
                            className="text-left"
                        >
                            <div className="flex bg-white h-36 p-4 rounded-lg justify-between text-sm">
                                <div className="flex">
                                    <img src={SETUP} className="w-24" alt="Setup"/>
                                    <div className="flex space-x-2 my-auto w-3/5">
                                        <div className='flex space-x-12 my-auto w-4/5 items-center'>
                                            <div>
                                                <p className="mb-5">Processor: <p
                                                    className='font-bold w-96'>{setup.cpu?.name} @{setup.cpu?.base_clock}GHz</p>
                                                </p>
                                                <p className="p">Video card: <p
                                                    className='font-bold'>{setup.gpu?.name} {setup.gpu?.vram}GB</p></p>
                                            </div>
                                            <div>
                                                <p className="mb-5">RAM: <p
                                                    className='font-bold w-36'>{setup.ram?.size} GB</p></p>
                                                <p className="p">Storage: <p
                                                    className='font-bold'>{setup.storage?.size} GB</p></p>
                                            </div>
                                            <div>
                                                <p className="mb-5 w-48 mt-7">
                                                    <div className="flex items-center space-x-2">
                                                        <ReactStars
                                                            key={`stars_${setup.rating?.rating}`}
                                                            count={5}
                                                            value={setup.rating?.rating}
                                                            edit={false}
                                                            size={24}
                                                            isHalf={true}
                                                            activeColor="#0ea5e9"
                                                        />
                                                        <p className="mt-1 text-sm">{setup.rating?.rating}</p>
                                                    </div>
                                                    <p className="text-sm ml-1">
                                                        {setup.rating?.count} opinion
                                                    </p>
                                                </p>
                                            </div>
                                            <button onClick={(setup) => onChangeSetup(setup)} className="bg-sky-500 text-base text-white rounded-lg hover:bg-sky-700 focus:outline-none px-4 py-2 flex-grow max-w-[200px] min-w-[150px] h-20">
                                                Overview this setup
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (<div className='w-full h-full flex justify-center items-center text-center text-2xl'>No similar setup</div>)}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                <button
                    className="bg-sky-500 text-white rounded-lg h-20 w-1/3 px-6 hover:bg-sky-700 focus:outline-none focus:bg-sky-900"
                    onClick={e => onSave(e)}
                >
                    Save that setup
                </button>
            </div>
        </Modal>
    )
}
export default ConfiguratorUserModal