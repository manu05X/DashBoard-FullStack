import "./styles.css";

import React, { Component, useState, useEffect } from "react";

import { Tab } from "@headlessui/react";

import { PageView } from "layout/PageView";
import InputComponent from "components/InputComponent";
import { UploadAvatar } from "components/UploadAvatar/UploadAvatar";
import { Switch } from "components/Switch";

function Login({
  onSubmit,
  onUsernameChange,
  onPasswordChange,
} : any) {
  return (
    <section>

      <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-6'>
        <InputComponent label="Username" onChange={onUsernameChange} type="text" placeholder='Username' style="w-full md:w-80" />
      </div>

      <div className='mt-6'>
        <InputComponent label="Password" onChange={onPasswordChange} type="password" placeholder='Password' style="w-full md:w-80" />
      </div>

      <button onClick={() => onSubmit()} className='mt-12 flex w-full items-center justify-center rounded-half bg-blue-high px-20 py-3 text-dim-black hover:bg-blue-high/80 md:w-auto'>
        Login
      </button>
    </section>
  );
}

function Register({
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  onFnameChange,
  onLnameChange,
  onUserTypeChange
}: any) {
  return (
    <section>

      <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-6'>
        <InputComponent label="First Name" onChange={onFnameChange} type="text" placeholder='First Name' style="w-full md:w-80" />
        <InputComponent label="Last Name" onChange={onLnameChange} type="text" placeholder='Last Name' style="w-full md:w-80" />
      </div>

      <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-6'>
        <InputComponent label="Username" onChange={onUsernameChange} type="text" placeholder='Username' style="w-full md:w-80" />
      </div>

      <div className='mt-6'>
        <InputComponent label="Password" onChange={onPasswordChange} type="password" placeholder='Password' style="w-full md:w-80" />
      </div>

      <button onClick={() => onSubmit()} className='mt-12 flex w-full items-center justify-center rounded-half bg-blue-high px-20 py-3 text-dim-black hover:bg-blue-high/80 md:w-auto'>
        Register
      </button>
    </section>
  );
}

export function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userType, setUserType] = useState("");

  const [loginBtnColor, setLoginBtnColor] = useState("bg-dark");

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const closePopup = function() {
    // This function is called when the user clicks on the close button of the popup

    // Hide the popup
    setPopupVisible(false);
  }

  useEffect(() => {
      if(popupMessage != "" && popupMessage != undefined && popupMessage != null){
          console.log("popupMessage: ", popupMessage);

          // Set the popup visible to true
          setPopupVisible(true);

          // Remove the popup message from the local storage
          window.localStorage.removeItem("message");

          // Make the popup visible for 5 seconds
          setTimeout(() => {
              setPopupVisible(false);
          }
          , 7001);

          console.log("popupVisible: ", popupVisible);
      } else {
          setPopupVisible(false);
      }
  }, [popupMessage]);

  useEffect(() => {
    // Get the popup message from the local storage
    setPopupMessage(window.localStorage.getItem("message"));
    setPopupVisible(false);
  }, []);

  useEffect(() => {
    if(email && password){
      setLoginBtnColor("bg-current");
    } else {
      setLoginBtnColor("bg-dark");
    }
  }, [email, password]);

  function login() {
    fetch("http://127.0.0.1:7001/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./../..";
        } else {
          window.localStorage.setItem("messageType", "danger");
          setPopupMessage(data.error);
        }
      });
  }

  function register() {
    fetch("http://127.0.0.1:7001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        userType,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./../..";
        } else {
          window.localStorage.setItem("messageType", "danger");
          setPopupMessage(data.error);
        }
      });
  }

  return (
    <PageView title='Login'>
      <Tab.Group manual defaultIndex={0}>
        
        <Tab.List className='mb-12 flex max-w-full gap-x-2 overflow-x-scroll'>
          <Tab className='app-tab shrink-0 whitespace-nowrap !px-7'>
            Login
          </Tab>
          <Tab className='app-tab shrink-0 whitespace-nowrap !px-7'>
            Register
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <Login onSubmit={login} onUsernameChange={setEmail} onPasswordChange={setPassword} />
          </Tab.Panel>
          <Tab.Panel>
            <Register 
              onSubmit={register} 
              onUsernameChange={setEmail} 
              onPasswordChange={setPassword}
              onFnameChange={setFname}
              onLnameChange={setLname}
              onUserTypeChange={setUserType} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </PageView>
  );
}
