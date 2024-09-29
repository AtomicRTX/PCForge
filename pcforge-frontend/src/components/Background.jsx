import React from 'react';

const Background = (props) => {
  return (
    <div className='flex flex-col bg-cover bg-center h-screen w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500'>
      {props.children}
    </div>
  );
}

export default Background;