import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";

import CPU from '../../assets/CPU.svg'
import GPU from '../../assets/GPU.svg'
import Motherboard from '../../assets/Motherboard.svg'
import RAM from '../../assets/RAM.svg'
import Case from '../../assets/Case.svg'
import Power from '../../assets/Power.svg'
import SSD from '../../assets/SSD.svg'

import ComponentService from '../../services/component.service';
import ComputerService from '../../services/computer.service';
import UserService from '../../services/user.service';
import ComponentSelect from "./ComponentSelect";

const ConfiguratorUser = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');

    const [cpus, setCpus] = useState([]);
    const [gpus, setGpus] = useState([]);
    const [motherboards, setMotherboards] = useState([]);
    const [ram, setRam] = useState([]);
    const [computerCase, setComputerCase] = useState([]);
    const [powerSupply, setPowerSupply] = useState([]);
    const [drive, setDrive] = useState([]);

    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedGpu, setSelectedGpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);
    const [selectedComputerCase, setSelectedComputerCase] = useState(null);
    const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
    const [selectedDrive, setSelectedDrive] = useState(null);

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

    useEffect(() => {
        UserService.getUser()
            .then(data => setUser(data)
            )
            .catch(error => {
                console.error('Error:', error);
                setUser(null);
            });
    }, []);

    useEffect(() => {
        ComponentService.getCorrectCPU(null, socket)
            .then(data => {
                const cpuOptions = data.map(cpu => ({
                    value: cpu.cpu_id,
                    label: cpu.name + ` @` + cpu.base_clock + `GHz`,
                    socket: cpu.socket,
                    tdp: cpu.tdp
                }));
                setCpus(cpuOptions);
            })
            .catch(error => {
                console.error('Error fetching Motherboards:', error);
            }); // eslint-disable-next-line
    }, [socket]);

    useEffect(() => {
        ComponentService.getCorrectGPU(null, gpuSize)
            .then(data => {
                const gpuOptions = data.map(gpu => ({
                    value: gpu.gpu_id,
                    label: gpu.name + ` ` + gpu.vram + `GB`,
                    gpuSize: gpu.gpuSize,
                    tdp: gpu.tdp
                }));
                setGpus(gpuOptions);
            })
            .catch(error => {
                console.error('Error fetching GPUs:', error);
            }); // eslint-disable-next-line
    }, [gpuSize]);

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

    useEffect(() => {
        ComponentService.getCorrectRAM(memoryCapacity, memorySlots, memoryType)
            .then(data => {
                const ramOptions = data.map(ram => ({
                    value: ram.ram_id,
                    label: ram.name + ` ` + ram.sticks + `x` + ram.size + `GB`,
                    memoryCapacity: ram.size,
                    memorySlots: ram.sticks,
                    memoryType: ram.ram_type
                }));
                setRam(ramOptions);
            })
            .catch(error => {
                console.error('Error fetching RAMs:', error);
            }); // eslint-disable-next-line
    }, [memoryCapacity, memorySlots, memoryType]);

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
    }, [motherboardType, gpuSize, powerType]);

    useEffect(() => {
        ComponentService.getCorrectPower(null, powerType)
            .then(data => {
                const pOptions = data.map(p => ({
                    value: p.power_id,
                    label: p.name + ` ` + p.watt + `W`,
                    powerType: p.size,
                    watt: p.watt
                }));
                setPowerSupply(pOptions);
            })
            .catch(error => {
                console.error('Error fetching ComputerCases:', error);
            }); // eslint-disable-next-line
    }, [powerType]);

    useEffect(() => {
        ComponentService.getCorrectStorage()
            .then(data => {
                const stOptions = data.map(st => ({
                    value: st.st_id,
                    label: st.name + ` ` + st.size + `GB`
                }));
                setDrive(stOptions);
            })
            .catch(error => {
                console.error('Error fetching ComputerCases:', error);
            }); // eslint-disable-next-line
    }, []);

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

    const handleComputerCreator = (e) => {
        e.preventDefault();
        setMessage('');
        if (selectedComputerCase == null || selectedCpu == null || selectedGpu == null || selectedDrive == null || selectedMotherboard == null || selectedPowerSupply == null || selectedRam == null) {
            setMessage('You need to choice all components.');
        } else if ((tdp.cpu + tdp.gpu + 80 + 10 + 5) > selectedPowerSupply.watt) {
            setMessage(`You choice too weak power supply. You need at least ${(tdp.cpu + tdp.gpu + 80 + 10 + 5)} W.`);
        } else {
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

    return (
        <main className='flex justify-center items-center flex-col w-5/6 h-full mt-5 mb-10 mx-auto bg-white rounded-xl'>
            {user ? (
                <>
                    <p className='text-center text-2xl font-bold font-mono opacity-90 my-4'>PC Configurator</p>
                    <Form onSubmit={handleComputerCreator} className='relative flex items-center flex-col h-full'>
                        <div className='grid grid-cols-4 gap-6 h-5/6 my-4'>
                            <ComponentSelect name='CPU'
                                             icon={CPU}
                                             value={selectedCpu}
                                             options={cpus}
                                             onChange={handleCpuChange}
                                             placeholder="Select CPU"/>

                            <ComponentSelect name='GPU'
                                             icon={GPU}
                                             value={selectedGpu}
                                             options={gpus}
                                             onChange={handleGpuChange}
                                             placeholder="Select GPU"/>

                            <ComponentSelect name='Motherboard'
                                             icon={Motherboard}
                                             value={selectedMotherboard}
                                             options={motherboards}
                                             onChange={handleMbChange}
                                             placeholder="Select motherboard"/>

                            <ComponentSelect name='RAM'
                                             icon={RAM}
                                             value={selectedRam}
                                             options={ram}
                                             onChange={handleRamChange}
                                             placeholder="Select RAM"/>

                            <ComponentSelect name='Computer case'
                                             icon={Case}
                                             value={selectedComputerCase}
                                             options={computerCase}
                                             onChange={handleComputerCaseChange}
                                             placeholder="Select computer case"/>

                            <ComponentSelect name='Power supply'
                                             icon={Power}
                                             value={selectedPowerSupply}
                                             options={powerSupply}
                                             onChange={handlePowerChange}
                                             placeholder="Select power supply"/>
                            <ComponentSelect name='Storage'
                                             icon={SSD}
                                             value={selectedDrive}
                                             options={drive}
                                             onChange={handleSSDChange}
                                             placeholder="Select storage"/>
                        </div>
                        <button
                            className="bg-sky-500 text-white rounded-lg h-10 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2">Save
                            setup
                        </button>
                        {message && <div className='absolute bottom-4 text-red-600 font-bold'>{message}</div>}
                    </Form>
                </>
            ) : (
                <div className='space-y-20'>
                    <p className='text-3xl mx-5'>If you want to create computer setup you need to log in</p>
                    <Link to="/login" className="flex items-center justify-center  hover:text-sky-500">
                        <button
                            className='bg-sky-500 text-white rounded-lg h-20 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-2/3 my-2'>
                            <p className=''>Log in to platform</p>
                        </button>
                    </Link>
                </div>
            )
            }
        </main>
    );
}

export default ConfiguratorUser;