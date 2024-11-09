import React from 'react';

const Background = (props) => {
  return (
    <div className='flex flex-col bg-cover bg-center h-screen w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500'>
      {props.children}
    </div>
  );
}

export default Background;