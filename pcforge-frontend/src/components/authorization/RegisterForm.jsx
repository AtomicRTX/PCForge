import React, {useState, useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';

import logo from '../../assets/Logo.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import AuthService from "../../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-red-500 text-sm mt-2">This field is required!</div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="text-red-500 text-sm mt-2">This is not a valid email.</div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 20) {
        return (
            <div className="text-red-500 text-sm mt-2">The password must be 6 - 20 characters.</div>
        );
    }
};

const RegisterForm = () => {

    const navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );

            navigate("/login");
        }
    };

    return (
        <main
            className='flex flex-col m-auto bg-white sm:rounded-3xl w-full md:w-2/5 lg:w-1/4 md:h-5/6 lg:h-5/6 h-screen shadow-lg p-5'>
            <Link to={-1}>
                <FontAwesomeIcon className='size-6 lg:size-8' icon={faCircleArrowLeft}/>
            </Link>
            <img src={logo} className='w-1/5 mx-auto' alt="LOGO"/>
            <p className='mx-auto font-bold lg:text-3xl text-2xl'>PCForge</p>
            <Form onSubmit={handleRegister} ref={form}>
                <div>
                    <div className="my-6 mx-5">
                        <label className="block my-1 font-medium text-gray-700">Username</label>
                        <Input name="username" type="text" placeholder="Username"
                               className="mt-1 w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-sky-500"
                               value={username} onChange={onChangeUsername} validations={[required]}/>
                    </div>
                    <div className="my-6 mx-5">
                        <label className="block my-1 font-medium text-gray-700">Email</label>
                        <Input name="email" type="text" placeholder="username@gmail.com"
                               className="mt-1 w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-sky-500"
                               value={email} onChange={onChangeEmail} validations={[required, validEmail]}/>
                    </div>
                    <div className="my-6 mx-5">
                        <label className="block my-1 font-medium text-gray-700">Password</label>
                        <Input type="password" placeholder="Password"
                               className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-sky-500"
                               value={password} onChange={onChangePassword} validations={[required, vpassword]}/>
                    </div>
                    <div className="mx-5">
                        <button
                            className="bg-sky-500 text-white rounded-lg h-10 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-full my-2">Register
                            now
                        </button>
                    </div>
                </div>

                {message && (
                    <div className="mb-4">
                        <div
                            className={successful ? "text-green-500 text-sm mt-2 text-center" : "text-red-500 text-sm mt-2 text-center"}>{message}</div>
                    </div>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
            <div className="flex items-center justify-center mt-6">
                <p className="text-gray-600">Already have an account?</p>
                <Link to="/login" className="text-sky-500 hover:underline ml-1">
                    Sign in
                </Link>
            </div>
        </main>
    );
}

export default RegisterForm;