import React from 'react';
import Select from 'react-select';

const SoftwareSelect = ({name, value, options, placeholder, onChange}) => {

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
        <label
            className='flex flex-col relative rounded-lg border border-[#e9e9e9] shadow-md w-4/5 p-5'>
            <p className='text-left text-lg my-4 font-bold opacity-80'>{name}</p>
            <Select
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isClearable={true}
                className='mx-auto w-full'
                styles={customStyles}
                isMulti={true}
            />
        </label>
    )
}
export default SoftwareSelect;