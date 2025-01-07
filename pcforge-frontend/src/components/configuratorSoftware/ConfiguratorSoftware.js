import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";

import SoftwareSelect from "./SoftwareSelect";
import UserService from "../../services/user.service";
import ComputerService from "../../services/computer.service";
import SoftwareService from "../../services/software.service";
import gameIcon from '../../assets/GameIcon.png'
import programIcon from '../../assets/ProgramIcon.png'
import CreateSetupModal from "../configuratorUser/CreateSetupModal";

const ConfiguratorSoftware = () => {

    const navigate = useNavigate();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [user, setUser] = useState({});

    const [gamesMinOptions, setGamesMinOptions] = useState([])
    const [gamesRecOptions, setGamesRecOptions] = useState([])

    const [programsOptions, setProgramsOptions] = useState([])

    const [gamesMin, setGamesMin] = useState([])

    const [gamesRec, setGamesRec] = useState([])

    const [programs, setPrograms] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        UserService.getUser()
            .then(data => setUser(data)
            )
            .catch(error => {
                setUser(null);
            });
        setLoading(false)
    }, []);
    const [setup, setSetup] = useState({
        cpu_id: null,
        gpu_id: null,
        mb_id: null,
        ram_id: null,
        cs_id: null,
        power_id: null,
        st_id: null
    })

    useEffect(() => {
        SoftwareService.getAllGames().then(data => {
            setGamesRecOptions(data.map(game => ({
                value: game.game_id,
                label: game.name,
                hdd_space: game.hdd_space,
                min_cpu_cores: 0,
                min_cpu_speed: 0,
                min_cpu_threads: 0,
                min_gpu_vram: 0,
                min_ram: 0,
                recom_cpu_cores: game.recom_cpu_cores,
                recom_cpu_speed: game.recom_cpu_speed,
                recom_cpu_threads: game.recom_cpu_threads,
                recom_gpu_vram: game.recom_gpu_vram,
                recom_ram: game.recom_ram
            })));

            setGamesMinOptions(data.map(game => ({
                value: game.game_id,
                label: game.name,
                hdd_space: game.hdd_space,
                min_cpu_cores: game.min_cpu_cores,
                min_cpu_speed: game.min_cpu_speed,
                min_cpu_threads: game.min_cpu_threads,
                min_gpu_vram: game.min_gpu_vram,
                min_ram: game.min_ram,
                recom_cpu_cores: 0,
                recom_cpu_speed: 0,
                recom_cpu_threads: 0,
                recom_gpu_vram: 0,
                recom_ram: 0
            })));
        });
        SoftwareService.getAllPrograms().then(data => setProgramsOptions(data.map(program => ({
            value: program.program_id,
            label: program.name,
            hdd_space: program.hdd_space,
            min_cpu_cores: program.min_cpu_cores,
            min_cpu_speed: program.min_cpu_speed,
            min_cpu_threads: program.min_cpu_threads,
            min_gpu_vram: program.min_gpu_vram,
            min_ram: program.min_ram
        }))));
    }, []);

    const handleComputerCreator = (e) => {
        e.preventDefault();
        const games = [...gamesMin, ...gamesRec];
        ComputerService.createComputerSetupByGames(games, programs)
            .then(data => {
                setSetup(data.data)
                setIsCreateModalOpen(true)
                console.log(setup)
                })
                .catch(error => {
                    const comMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                });
        }

    if(loading){
        <></>
    }

    return (
        <main className='flex justify-center items-center flex-col w-5/6 h-full mt-5 mb-10 mx-auto bg-white rounded-xl'>
            {user ? (
                <>
                    <p className='text-center text-2xl font-bold font-mono opacity-90 my-4'>PC Configurator</p>
                    <Form onSubmit={handleComputerCreator} className='relative flex items-center flex-col h-full w-full space-y-10'>
                        <SoftwareSelect
                            name="Games in minimal settings"
                            options={gamesMinOptions}
                            value={gamesMin}
                            onChange={setGamesMin}
                            image={gameIcon}
                        />

                        <SoftwareSelect
                            name="Games in recommend settings"
                            options={gamesRecOptions}
                            value={gamesRec}
                            onChange={setGamesRec}
                            image={gameIcon}
                        />

                        <SoftwareSelect
                            name="Programs in minimal settings"
                            options={programsOptions}
                            value={programs}
                            onChange={setPrograms}
                            image={programIcon}
                        />
                        <button
                            className="bg-sky-500 text-white rounded-lg h-10 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2">Generate
                            setup
                        </button>
                        <CreateSetupModal isModalOpen={isCreateModalOpen} computerSetup={setup} onClose={() => navigate("/")}/>
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

export default ConfiguratorSoftware;