import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Ikony

import logo from '../assets/Logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Walidacja

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// Serwisy

import AuthService from "../services/auth.service";

// Sprawdzenie maila i czy pole jest puste

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

const LoginForm = () => {

  const navigate = useNavigate();

  // Formularz

  const form = useRef();
  const checkBtn = useRef();

  // Dane

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Funkcje obslugi zmiany danych w polach

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  // Obsluga logowania

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        () => {
          setMessage("Incorrect data");
        }
      );
    }
  };

  return (
    <main className='flex flex-col m-auto bg-white sm:rounded-3xl w-full md:w-2/5 lg:w-1/4 md:h-3/4 lg:h-3/4 h-screen shadow-lg p-5'>
      <Link to={-1}>
        <FontAwesomeIcon className='size-6 lg:size-8' icon={faCircleArrowLeft} />
      </Link>
      <img src={logo} className='w-1/5 mx-auto' alt="LOGO"/>
      <p className='mx-auto font-bold lg:text-3xl text-2xl'>PCForge</p>
      <Form onSubmit={handleLogin} ref={form}>
        <div className="my-6 mx-5">
          <label className="block my-1 font-medium text-gray-700">Email</label>
          <Input name="email" type="text" placeholder="username@gmail.com" className="mt-1 w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-sky-500" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
        </div>
        <div className="my-6 mx-5">
          <label className="block my-1 font-medium text-gray-700">Password</label>
          <Input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg h-10 px-4 focus:outline-none focus:border-sky-500" value={password} onChange={onChangePassword} validations={[required]}/>
        </div>
        <div className="mx-5">
          <button className="bg-sky-500 text-white rounded-lg h-10 hover:bg-sky-700 focus:outline-none focus:bg-sky-900 w-full my-2">Login now</button>
        </div>
          {message && (<div className="mb-4"><div className="text-red-500 text-sm mt-2 text-center">{message}</div></div>)}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      <div className="flex items-center justify-center mt-6">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/register" className="text-sky-500 hover:underline ml-1">Sign up</Link>
      </div>
    </main>
  );
}

export default LoginForm;