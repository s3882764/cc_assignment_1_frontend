import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import "./styles.css";

function Login() {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "q",
            password: "q"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        email: "invalid username",
        pass: "invalid password"
    };

    // const navigateToDashboard = {
    //     useNavigate("/register")
    // }

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { email, pass } = document.forms[0];
        console.log(email, pass);
        await fetch('https://t5cck11g43.execute-api.us-east-1.amazonaws.com/dev/login', {
            method: 'PUT',
            body: JSON.stringify({
                "email":email.value,
                "password":pass.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setIsSubmitted(true);
            })
            .catch((err) => {
                setErrorMessages({ name: "loginForm", message: errors.pass });
            });


        // const userData = database.find((user) => user.username === email.value);

        // if (userData) {
        //     if (userData.password !== pass.value) {
        //         setErrorMessages({ name: "pass", message: errors.pass });
        //     } else {
        //         setIsSubmitted(true);
        //     }
        // } else {
        //     setErrorMessages({ name: "email", message: errors.email });
        // }
    };

    const navigate = useNavigate();

    function goToRegister() {
        navigate("/register");
    }


    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (

        <div className="form">
            <form onSubmit={handleSubmit} name="loginForm">
                <div className="input-container">
                    <label>Username </label>
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
                {isSubmitted ? <Navigate replace={true} to='/dashboard' /> : renderForm}
                {/* {renderForm} */}

            </div>
        </div>
    );
};

export default Login;