import React from 'react';

const Background = (props) => {
  return (
    <div className='flex items-center justify-center bg-cover bg-center h-screen w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500'>
      {props.children}
    </div>
  );
}

export default Background;