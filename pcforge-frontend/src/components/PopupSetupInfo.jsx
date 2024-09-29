import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function PopupInfo(props) {
  return (props.trigger) ? (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center' onClick={() => props.setTrigger(false)}>
      <div className='relative p-8 w-full max-w-3xl bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
        <button onClick={() => props.setTrigger(false)} className='absolute top-2 left-2'><FontAwesomeIcon className='size-6 lg:size-8' icon={faCircleArrowLeft} /></button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default PopupInfo
