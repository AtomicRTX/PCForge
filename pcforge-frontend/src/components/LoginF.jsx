import React, { useState, useRef } from "react";
import logo from '../assets/Logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

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

const LoginF = () => {
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    console.log(email);
    console.log(password);

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          setLoading(false);
          setMessage("Incorrect data");
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col bg-white sm:rounded-3xl w-full md:w-2/5 lg:w-1/4 md:h-3/4 lg:h-3/4 h-screen shadow-lg p-5'>
        <Link to={-1}>
            <FontAwesomeIcon className='size-6 lg:size-8' icon={faCircleArrowLeft} />
        </Link>
        <img src={logo} className='w-1/5 mx-auto' alt="LOGO"/>
        <p className='mx-auto font-bold lg:text-3xl text-2xl'>PCForge</p>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="my-6 mx-5">
            <label className="block my-1 font-medium text-gray-700">Email</label>
            <Input name="email" type="text" placeholder="username@gmail.com" className="mt-1 w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-orange-500" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
          </div>
          <div className="my-6 mx-5">
            <label className="block my-1 font-medium text-gray-700">Password</label>
            <Input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-orange-500" value={password} onChange={onChangePassword} validations={[required]}/>
          </div>
          <div className="mx-5">
            <button className="bg-orange-500 text-white rounded-lg h-10 hover:bg-orange-700 focus:outline-none focus:bg-orange-900 w-full my-2">Login now</button>
          </div>
          
          {message && (
            <div className="mb-4">
              <div className="text-red-500 text-sm mt-2 text-center">{message}</div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      <div className="flex items-center justify-center mt-6">
        <p className="text-gray-600">
          Don't have an account?
        </p>
        <Link to="/register" className="text-orange-500 hover:underline ml-1">
          Sign up
        </Link>
        </div>
    </main>
  );
}

export default LoginF;