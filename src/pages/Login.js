import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import "./styles.css";

function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { email, pass } = document.forms[0];
        console.log(email, pass);

        setIsLoaded(false);
        await fetch('https://t5cck11g43.execute-api.us-east-1.amazonaws.com/dev/login', {
            method: 'PUT',
            body: JSON.stringify({
                "email": email.value,
                "password": pass.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.message !== "Login Unsuccessful" && data.message !== "Internal server error"){
                    localStorage.setItem("email", email.value);
                    localStorage.setItem("userName", data.message.user_name)
                    setIsSubmitted(true);
                } else {
                    setErrorMessages({ name: "pass", message: "Invalid username or password"});
                }
                setIsLoaded(true);
            })
            .catch((err) => {
                setIsLoaded(true);
                setErrorMessages({ name: "pass", message: "Invalid username or password" });
            });
    };

    const navigate = useNavigate();

    function goToRegister() {
        navigate("/register");
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (

        <div className="form">
            <form onSubmit={handleSubmit} name="loginForm">
                <div className="input-container">
                    <label>Email </label>
                    <input type="text" name="email" required />
                    {renderErrorMessage("email")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input className="register" type="button" value="Register" onClick={() => {
                        goToRegister()
                    }} />
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Login</div>
                {isSubmitted ? <Navigate replace={true} to='/dashboard' /> : <>{isLoaded ? renderForm : <BeatLoader color="#36d7b7" />}</>}
            </div>
        </div>
    );
};

export default Login;