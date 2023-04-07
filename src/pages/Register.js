import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import "./styles.css";

const Register = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = async (event) => {
      //Prevent page reload
      event.preventDefault();

      var { email, pass, username } = document.forms[0];
      console.log(email, pass, username);

      setIsLoaded(false);
      await fetch('https://t5cck11g43.execute-api.us-east-1.amazonaws.com/dev/login/register', {
          method: 'PUT',
          body: JSON.stringify({
              "email": email.value,
              "password": pass.value,
              "user_name": username.value
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
          .then((response) => response.json())
          .then((data) => {
              if(data.message === "New Item created/updated"){
                  alert("User created");
                  setIsSubmitted(true);
              } else if(data.message === "User already exists"){
                  alert("User already exists");
              }
              else {
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
              <div className="input-container">
                  <label>Username </label>
                  <input type="text" name="username" required />
                  {renderErrorMessage("username")}
              </div>
              <div className="button-container">
                  {/* <input className="register" type="button" value="Register" onClick={() => {
                      goToRegister()
                  }} /> */}
                  <input type="submit" value="Register"/>
              </div>
          </form>
      </div>
  );

  return (
      <div className="app">
          <div className="login-form">
              <div className="title">Register</div>
              {isSubmitted ? <Navigate replace={true} to='/' /> : <>{isLoaded ? renderForm : <BeatLoader color="#36d7b7" />}</>}
          </div>
      </div>
  );
  };
  
  export default Register;