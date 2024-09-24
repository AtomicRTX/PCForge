import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import CPU from '../assets/CPU.svg'
import GPU from '../assets/GPU.svg'
import Motherboard from '../assets/Motherboard.svg'
import RAM from '../assets/RAM.svg'
import Case from '../assets/Case.svg'
import Power from '../assets/Power.svg'
import SSD from '../assets/SSD.svg'

import ComponentService from '../services/component.service';

const ConfiguratorY = () => {

  // Listy z danymi komponentami

  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [motherboards, setMotherboards] = useState([]);
  const [ram, setRam] = useState([]);
  const [computerCase, setComputerCase] = useState([]);
  const [powerSupply, setPowerSupply] = useState([]);
  const [drive, setDrive] = useState([]);

  // Wybrane komponenty

  const [selectedCpu, setSelectedCpu] = useState(null);  
  const [selectedGpu, setSelectedGpu] = useState(null);  
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);  
  const [selectedRam, setSelectedRam] = useState(null);  
  const [selectedComputerCase, setSelectedComputerCase] = useState(null);
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [selectedDrive, setSelectedDrive] = useState(null);

  //Zmienne pomocnicze

  const [socket, setSocket] = useState(null);
  const [motherboardType, setMotherboardType] = useState(null);
  const [powerType, setPowerType] = useState(null);
  const [gpuSize, setGpuSize] = useState(null);
  const [memoryCapacity, setMemoryCapacity] = useState(null);
  const [memorySlots, setMemorySlots] = useState(null);
  const [memoryType, setMemoryType] = useState(null);
  const [tdp, setTdp] = useState(null);
  
  // Wartość domyślna list

  const defaultOption = {
    value: null,
    label: 'Select',
    socket: null
  };

  // Pobranie listy CPU z bazy danych

  useEffect(() => {
    ComponentService.getCorrectCPU(tdp, socket)
      .then(data => {
        const cpuOptions = data.map(cpu => ({
          value: cpu.cpu_id,
          label: cpu.name+` @`+cpu.base_clock+`GHz`,
          socket: cpu.socket
        }));
        setCpus([defaultOption, ...cpuOptions]);
      })
      .catch(error => {
        console.error('Error fetching CPUs:', error);
      });
  }, [selectedMotherboard]);

  // Pobranie listy GPU z bazy danych

  useEffect(() => {
    ComponentService.getCorrectGPU(tdp, gpuSize)
      .then(data => {
        const gpuOptions = data.map(gpu => ({
          value: gpu.gpu_id,
          label: gpu.name+` `+gpu.vram+`GB`,
          gpuSize: gpu.gpuSize
        }));
        setGpus([defaultOption, ...gpuOptions]);
      })
      .catch(error => {
        console.error('Error fetching GPUs:', error);
      });
  }, [selectedComputerCase]);

  // Pobranie listy plyt glownych z bazy danych

  useEffect(() => {
    ComponentService.getCorrectMotherboard(socket, memoryCapacity, memorySlots, memoryType, motherboardType)
      .then(data => {
        const mbOptions = data.map(mb => ({
          value: mb.mb_id,
          label: mb.name,
          socket: mb.socket,
          memoryCapacity: mb.memory_capacity,
          memorySlots: mb.memory_slots,
          memoryType: mb.memory_type,
          form: mb.form_factor
        }));
        setMotherboards([defaultOption, ...mbOptions]);
      })
      .catch(error => {
        console.error('Error fetching Motherboards:', error);
      });
  }, [selectedCpu, selectedRam, selectedComputerCase]);

  // Pobranie listy kosci RAM z bazy danych

  useEffect(() => {
    ComponentService.getCorrectRAM(memoryCapacity, memorySlots, memoryType)
      .then(data => {
        const ramOptions = data.map(ram => ({
          value: ram.ram_id,
          label: ram.name+` `+ram.sticks+`x`+ram.size+`GB`,
          memoryCapacity: ram.size,
          memorySlots: ram.sticks,
          memoryType: ram.ram_type
        }));
        setRam([defaultOption, ...ramOptions]);
      })
      .catch(error => {
        console.error('Error fetching RAMs:', error);
      });
  }, [selectedMotherboard]);

  // Pobranie listy obudów z bazy danych

  useEffect(() => {
    ComponentService.getCorrectComputerCase(motherboardType, gpuSize, powerType)
      .then(data => {
        const ccOptions = data.map(cc => ({
          value: cc.case_id,
          label: cc.name,
          motherboardType: cc.motherboard,
          gpuSize: cc.gpu_size,
          powerType: cc.power_supply
        }));
        setComputerCase([defaultOption, ...ccOptions]);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      });
  }, [selectedMotherboard, selectedGpu, selectedPowerSupply]);

  // Pobranie listy zasilaczy z bazy danych

  useEffect(() => {
    ComponentService.getCorrectPower(tdp, powerType)
      .then(data => {
        const pOptions = data.map(p => ({
          value: p.power_id,
          label: p.name+` `+p.watt+`W`,
          powerType: p.size
        }));
        setPowerSupply([defaultOption, ...pOptions]);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      });
  }, [selectedCpu, selectedGpu, selectedComputerCase]);

  // Pobranie listy dysków z bazy danych

  useEffect(() => {
    ComponentService.getCorrectStorage()
      .then(data => {
        const stOptions = data.map(st => ({
          value: st.st_id,
          label: st.name+` `+st.size+`GB`
        }));
        setDrive([defaultOption, ...stOptions]);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      });
  }, []);

  // Funkcje odpowiadające za wybranie elementu

  const handleCpuChange = (selectedOption) => {
    setSelectedCpu(selectedOption);
    setSocket(selectedOption.socket);
  };

  const handleGpuChange = (selectedOption) => {
    setSelectedGpu(selectedOption);
    setGpuSize(selectedOption.gpuSize);
  };

  const handleMbChange = (selectedOption) => {
    setSelectedMotherboard(selectedOption);
    setSocket(selectedOption.socket);
    setMemoryCapacity(selectedOption.memoryCapacity);
    setMemorySlots(selectedOption.memorySlots);
    setMemoryType(selectedOption.memoryType);
    setMotherboardType(selectedOption.form);
  };

  const handleRamChange = (selectedOption) => {
    setSelectedRam(selectedOption);
    setMemoryCapacity(selectedOption.memory_capacity);
    setMemorySlots(selectedOption.memory_slots);
    setMemoryType(selectedOption.memoryType);
  };

  const handleComputerCaseChange = (selectedOption) => {
    setSelectedComputerCase(selectedOption);
    setMotherboardType(selectedOption.form);
    setGpuSize(selectedOption.gpuSize);
    setPowerSupply(selectedOption.powerType);
  };

  const handlePowerChange = (selectedOption) => {
    setSelectedPowerSupply(selectedOption);
    setPowerSupply(selectedOption.powerType);
  };

  const handleSSDChange = (selectedOption) => {
    setSelectedDrive(selectedOption);
  };

  // Style do react select

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'orange' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px orange' : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'orange' : state.isSelected ? '#ff8c00' : 'white',
    }),
  }

  return (
    <main className='flex justify-center items-center flex-col w-3/4 h-4/5 bg-white rounded-xl'>
      <p className='text-center text-xl my-4 font-bold'>Configurator PC</p>
      <div className='grid grid-cols-4 gap-4 h-3/4 m-4'>
        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={CPU} className='mx-auto w-1/3' alt="CPU"/>
          <p className='text-center text-lg my-4 font-bold'>CPU</p>
          <Select name='selectedCPU' options={cpus} value={selectedCpu} onChange={handleCpuChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={GPU} className='mx-auto w-1/3' alt="GPU"/>
          <p className='text-center text-lg my-4 font-bold'>GPU</p>
          <Select name='selectedGPU' options={gpus} value={selectedGpu} onChange={handleGpuChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={Motherboard} className='mx-auto w-1/3' alt="Motherboard"/>
          <p className='text-center text-lg my-4 font-bold'>Motherboard</p>
          <Select name='selectedMotherboard' options={motherboards} value={selectedMotherboard} onChange={handleMbChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={RAM} className='mx-auto w-1/3' alt="RAM"/>
          <p className='text-center text-lg my-4 font-bold'>RAM</p>
          <Select name='selectedRAM' options={ram} value={selectedRam} onChange={handleRamChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={Case} className='mx-auto w-1/3' alt="Case"/>
          <p className='text-center text-lg my-4 font-bold'>Case</p>
          <Select name='selectedComputerCase' options={computerCase} value={selectedComputerCase} onChange={handleComputerCaseChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={Power} className='mx-auto w-1/3' alt="Power"/>
          <p className='text-center text-lg my-4 font-bold'>Power Supply</p>
          <Select name='selectedPowerSupply' options={powerSupply} value={selectedPowerSupply} onChange={handlePowerChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>

        <label className='w-full h-full flex flex-col items-center justify-center rounded-lg bg-gray-50'>
          <img src={SSD} className='mx-auto w-1/3' alt="SSD"/>
          <p className='text-center text-lg my-4 font-bold'>Storage</p>
          <Select name='selectedStorage' options={drive} value={selectedDrive} onChange={handleSSDChange} placeholder="Select" className='mx-auto w-5/6' styles={customStyles}/>
        </label>
      </div>
      <button className="bg-orange-500 text-white rounded-lg h-10 hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-1/3 my-2">Save setup</button>
    </main>
  );
} 

export default ConfiguratorY;