import React from 'react';
import Modal from 'react-modal';

const SetupModal = ({isModalOpen, onClose, onDelete}) => {
    Modal.setAppElement('#root');

    const closeModal = (e) => {
        e?.stopPropagation()
        onClose(false);
    }

    return (
        <Modal isOpen={isModalOpen} contentLabel="Setup info"
               className='relative p-8 w-full max-w-2xl bg-white rounded-lg h-1/5'
               overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center backdrop-blur-[2px] z-20'
               onRequestClose={closeModal}>
            <div className="text-center">
                <p className="font-bold text-xl mb-4">Are you sure you want to delete this setup?</p>
                <p className="mb-8">This action cannot be undone.</p>
                <div className="flex justify-center space-x-4">
                    <button onClick={closeModal} className="bg-gray-500 w-56 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none">
                        Cancel
                    </button>
                    <button onClick={(e) => {
                        e.stopPropagation(); onDelete(e)}} className="bg-red-500 w-56 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none">
                        Yes, delete it
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default SetupModal