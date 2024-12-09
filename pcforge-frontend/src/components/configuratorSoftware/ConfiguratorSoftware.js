import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";

import SoftwareSelect from "./SoftwareSelect";
import UserService from "../../services/user.service";
import ComputerService from "../../services/computer.service";
import SoftwareService from "../../services/software.service";
import gameIcon from '../../assets/GameIcon.png'
import programIcon from '../../assets/ProgramIcon.png'

const ConfiguratorSoftware = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const [gamesOptions, setGamesOptions] = useState([])

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
    }, [user]);

    useEffect(() => {
        SoftwareService.getAllGames().then(data =>
            setGamesOptions(data.map(dat => ({ value: dat.game_id, label: dat.name}))))
        SoftwareService.getAllPrograms().then(data => setProgramsOptions(data.map(dat => ({ value: dat.program_id, label: dat.name}))))
    }, []);

    const handleComputerCreator = (e) => {
        e.preventDefault();

        ComputerService.createComputerSetupByGames()
            .then(() => {
                    navigate("/");
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
                        <SoftwareSelect name="Games in minimal settings" options={gamesOptions} image={gameIcon}/>

                        <SoftwareSelect name="Games in recommend settings" options={gamesOptions} image={gameIcon}/>

                        <SoftwareSelect name="Programs in minimal settings" options={programsOptions} image={programIcon}/>

                        <button
                            className="bg-sky-500 text-white rounded-lg h-10 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-1/3 my-2">Generate
                            setup
                        </button>
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