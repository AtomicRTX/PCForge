import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";

//Ikony komponentow

import CPU from '../assets/CPU.svg'
import GPU from '../assets/GPU.svg'
import Motherboard from '../assets/Motherboard.svg'
import RAM from '../assets/RAM.svg'
import Case from '../assets/Case.svg'
import Power from '../assets/Power.svg'
import SSD from '../assets/SSD.svg'

//Service

import ComponentService from '../services/component.service';
import ComputerService from '../services/computer.service';
import UserService from '../services/user.service';

const ConfiguratorY = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

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
  const [tdp, setTdp] = useState({
    cpu: 0,
    gpu: 0
  });

  // Pobranie aktywnego uzytkownika

  useEffect(() => {
    UserService.getUser()
      .then(data => setUser(data)
      )
      .catch(error => {
        console.error('Error:', error);
        setUser(null);
      });
  }, []);

  // Pobranie listy CPU z bazy danych

  useEffect(() => {
    ComponentService.getCorrectCPU(null, socket)
      .then(data => {
        const cpuOptions = data.map(cpu => ({
          value: cpu.cpu_id,
          label: cpu.name+` @`+cpu.base_clock+`GHz`,
          socket: cpu.socket,
          tdp: cpu.tdp
        }));
        setCpus(cpuOptions);
      })
      .catch(error => {
        console.error('Error fetching CPUs:', error);
      }); // eslint-disable-next-line
  }, [socket]);

  // Pobranie listy GPU z bazy danych

  useEffect(() => {
    ComponentService.getCorrectGPU(null, gpuSize)
      .then(data => {
        const gpuOptions = data.map(gpu => ({
          value: gpu.gpu_id,
          label: gpu.name+` `+gpu.vram+`GB`,
          gpuSize: gpu.gpuSize,
          tdp: gpu.tdp
        }));
        setGpus(gpuOptions);
      })
      .catch(error => {
        console.error('Error fetching GPUs:', error);
      }); // eslint-disable-next-line
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
        setMotherboards(mbOptions);
      })
      .catch(error => {
        console.error('Error fetching Motherboards:', error);
      }); // eslint-disable-next-line
    console.log(socket)
  }, [socket, memoryCapacity, memorySlots, memoryType, motherboardType]);

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
        setRam(ramOptions);
      })
      .catch(error => {
        console.error('Error fetching RAMs:', error);
      }); // eslint-disable-next-line
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
        setComputerCase(ccOptions);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      }); // eslint-disable-next-line
  }, [selectedMotherboard, selectedGpu, selectedPowerSupply]);

  // Pobranie listy zasilaczy z bazy danych

  useEffect(() => {
    ComponentService.getCorrectPower(null, powerType)
      .then(data => {
        const pOptions = data.map(p => ({
          value: p.power_id,
          label: p.name+` `+p.watt+`W`,
          powerType: p.size,
          watt: p.watt
        }));
        setPowerSupply(pOptions);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      }); // eslint-disable-next-line
  }, [selectedCpu, selectedGpu, selectedComputerCase]);

  // Pobranie listy dysków z bazy danych

  useEffect(() => {
    ComponentService.getCorrectStorage()
      .then(data => {
        const stOptions = data.map(st => ({
          value: st.st_id,
          label: st.name+` `+st.size+`GB`
        }));
        setDrive(stOptions);
      })
      .catch(error => {
        console.error('Error fetching ComputerCases:', error);
      }); // eslint-disable-next-line
  }, []);

  // Funkcje odpowiadające za wybranie elementu

  const handleCpuChange = (selectedOption) => {
    setSelectedCpu(selectedOption);

    setSocket(selectedOption ? selectedOption.socket : (selectedMotherboard ? selectedMotherboard.socket : null));
    tdp.cpu = selectedOption ? selectedOption.tdp : 0;
  };

  const handleGpuChange = (selectedOption) => {
    setSelectedGpu(selectedOption);

    setGpuSize(selectedOption ? selectedOption.gpuSize : (selectedComputerCase ? selectedComputerCase.gpuSize : null));
    tdp.gpu = selectedOption ? selectedOption.tdp : 0;
  };

  const handleMbChange = (selectedOption) => {
    setSelectedMotherboard(selectedOption);

    setSocket(selectedOption ? selectedOption.socket : (selectedCpu ? selectedCpu.socket : null));
    setMemoryCapacity(selectedOption ? selectedOption.memoryCapacity : (selectedRam ? selectedRam.memoryCapacity : null));
    setMemorySlots(selectedOption ? selectedOption.memorySlots : (selectedRam ? selectedRam.memorySlots : null));
    setMemoryType(selectedOption ? selectedOption.memoryType : (selectedRam ? selectedRam.memoryType : null));
    setMotherboardType(selectedOption ? selectedOption.form : (selectedComputerCase ? selectedComputerCase.form : null));
  };

  const handleRamChange = (selectedOption) => {
    setSelectedRam(selectedOption);

    setMemoryCapacity(selectedOption ? selectedOption.memoryCapacity : (selectedMotherboard ? selectedMotherboard.memoryCapacity : null));
    setMemorySlots(selectedOption ? selectedOption.memorySlots : (selectedMotherboard ? selectedMotherboard.memorySlots : null));
    setMemoryType(selectedOption ? selectedOption.memoryType : (selectedMotherboard ? selectedMotherboard.memoryType : null));
  };

  const handleComputerCaseChange = (selectedOption) => {
    setSelectedComputerCase(selectedOption);

    setMotherboardType(selectedOption ? selectedOption.form : (selectedMotherboard ? selectedMotherboard.form : null));
    setGpuSize(selectedOption ? selectedOption.gpuSize : (selectedGpu ? selectedGpu.gpuSize : null));
    setPowerType(selectedOption ? selectedOption.powerType : (selectedPowerSupply ? selectedPowerSupply.powerType : null));
  };

  const handlePowerChange = (selectedOption) => {
    setSelectedPowerSupply(selectedOption);
    setPowerType(selectedOption ? selectedOption.powerType : (selectedComputerCase ? selectedComputerCase.powerType : null));
  };

  const handleSSDChange = (selectedOption) => {
    setSelectedDrive(selectedOption);
  };

  // Funkcja odpowiadająca za stworzenie zestawu

  const handleComputerCreator = (e) => {
    e.preventDefault();
    setMessage('');
    if(selectedComputerCase == null || selectedCpu == null || selectedGpu == null || selectedDrive == null || selectedMotherboard == null || selectedPowerSupply == null || selectedRam == null){
      setMessage('You dont choice all components');
    }
    if((tdp.cpu + tdp.gpu + 80 + 10 + 5) > selectedPowerSupply.watt){
      setMessage(`You choice too weak power supply. You need at least ${(tdp.cpu + tdp.gpu + 80 + 10 + 5)} W.`);
    }
    else{
      ComputerService.createComputerSetup(user.user_id, selectedComputerCase.value, selectedCpu.value, selectedGpu.value, selectedRam.value, selectedMotherboard.value, selectedPowerSupply.value, selectedDrive.value)
      .then(() => {
        setMessage(`Create successful.\n`);
        navigate("/");
      })
      .catch(error => {
        const comMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(`Create failed. Details: Error: ${comMessage}`);
      });
    }
  }

  // Style do react select

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'orange' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px orange' : provided.boxShadow,
      "&:hover": {
        borderColor: "orange"
      },
      opacity: 0.9
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'orange' : state.isSelected ? '#ff8c00' : 'white',
      opacity: 0.9
    }),
  }

  return (
    <main className='flex justify-center items-center flex-col w-5/6 h-5/6 m-auto bg-white rounded-xl'>
      {user ? (
      <>
      <p className='text-center text-xl my-4 font-bold'>PC Configurator</p>
      <Form onSubmit={handleComputerCreator} className='flex justify-center items-center flex-col h-full'>
        <div className='grid grid-cols-4 gap-4 h-5/6 m-4'>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={CPU} className='mx-auto w-1/3' alt="CPU"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>CPU</p>
            <Select name='selectedCPU' options={cpus} value={selectedCpu} onChange={handleCpuChange} placeholder="Select" isClearable={true} className='mx-auto w-72' styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={GPU} className='mx-auto w-1/3' alt="GPU"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>GPU</p>
            <Select name='selectedGPU' options={gpus} value={selectedGpu} onChange={handleGpuChange}
                    placeholder="Select" isClearable={true} className='mx-4 w-72' styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={Motherboard} className='mx-auto w-1/3' alt="Motherboard"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>Motherboard</p>
            <Select name='selectedMotherboard' options={motherboards} value={selectedMotherboard}
                    onChange={handleMbChange} placeholder="Select" isClearable={true} className='mx-auto w-72' styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={RAM} className='mx-auto w-1/3' alt="RAM"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>RAM</p>
            <Select name='selectedRAM' options={ram} value={selectedRam} onChange={handleRamChange} placeholder="Select" isClearable={true}
                    className='mx-auto w-72' styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={Case} className='mx-auto w-1/3' alt="Case"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>Case</p>
            <Select name='selectedComputerCase' options={computerCase} value={selectedComputerCase}
                    onChange={handleComputerCaseChange} placeholder="Select" isClearable={true} className='mx-auto w-72'
                    styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={Power} className='mx-auto w-1/3' alt="Power"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>Power Supply</p>
            <Select name='selectedPowerSupply' options={powerSupply} value={selectedPowerSupply}
                    onChange={handlePowerChange} placeholder="Select" isClearable={true} className='mx-auto w-72' styles={customStyles}/>
          </label>

          <label className='flex flex-col items-center justify-center rounded-lg border border-[#e9e9e9] shadow-md'>
            <img src={SSD} className='mx-auto w-1/3' alt="SSD"/>
            <p className='text-center text-lg my-4 font-bold opacity-80'>Storage</p>
            <Select name='selectedStorage' options={drive} value={selectedDrive} onChange={handleSSDChange}
                    placeholder="Select" isClearable={true} className='mx-auto w-72' styles={customStyles}/>
          </label>

        </div>
        <button
            className="bg-orange-500 text-white rounded-lg h-10 hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-1/3 my-2">Save setup</button>
        {message && <div className='text-red-600 font-bold'>{message}</div>}
      </Form>
      </>
      ):(
      <div className='space-y-20'>
        <p className='text-3xl mx-5'>If you want to create computer setup you need to log in</p>
        <Link to="/login" className="flex items-center justify-center  hover:text-orange-500">
          <button className='bg-orange-500 text-white rounded-lg h-20 hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-2/3 my-2'>
            <p className=''>Log in to platform</p>
          </button>
        </Link>
      </div>
      )
      }
    </main>
  );
}

export default ConfiguratorY;