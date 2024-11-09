import React from 'react';
import Select from 'react-select';

const ComponentSelect = ({ name, icon, value, options, placeholder, onChange }) => {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#5d9dfd' : provided.borderColor,
            boxShadow: state.isFocused ? '0 0 0 1px #5d9dfd' : provided.boxShadow,
            "&:hover": {
                borderColor: "#5d9dfd"
            },
            opacity: 0.9
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#5d9dfd' : state.isSelected ? '#9fc9fd' : 'white',
            opacity: 0.9
        }),
    }

    return (
        <label className='flex flex-col relative items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md w-80'>
            <img src={icon} className='mx-auto w-1/2 h-40' alt={name}/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>{name}</p>
            <Select
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isClearable={true}
                className='mx-auto w-72'
                styles={customStyles}
            />
            <div className='absolute top-64 text-red-600 text-sm'></div>
        </label>
    )
}
export default ComponentSelect;