import "./styles.css";

import { Tab } from "@headlessui/react";

import { PageView } from "layout/PageView";
import axios from "axios";
import { UploadAvatar } from "components/UploadAvatar/UploadAvatar";
import InputComponent from "components/InputComponent";
import { Switch } from "components/Switch";
import { useState, useEffect } from "react";

function AccountSettings({userData}: any) {
  const [profilePicPath, setProfilePicPath] = useState("");
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [userName, setUserName] = useState()
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [userNameError, setUserNameError] = useState(false)

  const updateAccountSettings = () => {
    if (!firstName) setFirstNameError(true)
    if (!lastName) setLastNameError(true)
    if (!userName) setUserNameError(true)
    if (!firstName || !lastName || !userName) return
    console.log(firstName, lastName, userName)

    fetch("http://127.0.0.1:7001/updateProfile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        fname: firstName,
        lname: lastName,
        email: userName,
        profilePic: profilePicPath
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.data == "token expired") {
          window.localStorage.clear();
          window.location.href = "../../login";
      }
      else {
        if (data.status == "ok") {
        }
      }
    });
  }

  const saveProfilePic = async (e) => {
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    // Add the token to the body of the request
    formData.append("token", window.localStorage.getItem("token"));

    try {
      const res = await axios.post(
        "http://127.0.0.1:7001/picUpload",
        formData
      );
      console.log(res);
      setProfilePicPath(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (userData) {
      setProfilePicPath(userData.profilePic)
      setFirstName(userData.fname)
      setLastName(userData.lname)
      setUserName(userData.email)
    }
  }, [userData])

  return (
    <section>
      <div className='flex items-center gap-x-5'>
        <UploadAvatar profilePicPath={profilePicPath} onClick={() => document.getElementById("avatarFileInput")?.click()} />
        <h2 className='min-w-0 overflow-hidden text-ellipsis text-lg font-medium'>
          Upload profile picture
        </h2>
        <input style={{opacity: "0"}} onChange={saveProfilePic} type="file" name="file" accept="image/png, image/gif, image/jpeg" id="avatarFileInput" className="input-file" />
      </div>

      <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-6'>
        <InputComponent label='First name' onChange={setFirstName} init={firstName} placeholder='First name' type='text' style='settings w-full md:w-80' showError={firstNameError} />
        {/* <div className='app-textbox settings w-full md:w-80'>
          <label>First name</label>
          <div className='app-textbox-area'>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' />
          </div>
        </div> */}
        <InputComponent label='Last name' onChange={setLastName} init={lastName} placeholder='Last name' type='text' style='settings w-full md:w-80' showError={lastNameError} />
        {/* <div className='app-textbox settings w-full md:w-80'>
          <label>Last name</label>
          <div className='app-textbox-area'>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' />
          </div>
        </div> */}
      </div>

      <div className='mt-6'>
      <InputComponent label='User name' onChange={setUserName} init={userName} placeholder='User name' type='text' style='settings w-full md:w-80' showError={userNameError} />
        {/* <div className='app-textbox settings w-full md:w-80'>
          <label>User name</label>
          <div className='app-textbox-area'>
            <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='First name' />
          </div>
        </div> */}
      </div>

      <button onClick={updateAccountSettings} className='mt-12 flex w-full items-center justify-center rounded-half bg-blue-high px-20 py-3 text-dim-black hover:bg-blue-high/80 md:w-auto'>
        Save
      </button>
    </section>
  );
}

function SecuritySettings({
  onOldPasswordChange,
  onNewPasswordChange,
  onSubmit
}: any) {
  return (
    <section>
      <div className='app-textbox settings w-full md:w-[42rem]'>
        <label>Current password</label>
        <div className='app-textbox-area'>
          <input onChange={(e) => onOldPasswordChange(e.target.value)} placeholder='First name' />
        </div>
      </div>
      <div className='app-textbox settings mt-6 w-full md:w-[42rem]'>
        <label>New password</label>
        <div className='app-textbox-area'>
          <input onChange={(e) => onNewPasswordChange(e.target.value)} placeholder='Must be 8 characters long' />
        </div>
      </div>

      <div className='app-textbox settings mt-6 w-full md:w-[42rem]'>
        <label>Confirm password</label>
        <div className='app-textbox-area'>
          <input placeholder='Must match with new password' />
        </div>
      </div>

      <button onClick={() => onSubmit()} className='mt-12 flex w-full items-center justify-center rounded-half bg-blue-high px-20 py-3 text-dim-black hover:bg-blue-high/80 md:w-auto'>
        Save
      </button>
    </section>
  );
}

function NotificationSettings() {
  return (
    <section className='w-full md:w-[48rem]'>
      <div className='flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>Event alerts</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified about upcoming events
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: true }} />
        </div>
      </div>

      <div className='mt-7 flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>New friend alert</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified when someone adds you as friend
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: true }} />
        </div>
      </div>

      <div className='mt-7 flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>Invitation alerts</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified when you receive new invitation to an events
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: false }} />
        </div>
      </div>

      <div className='mt-7 flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>Score request alerts</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified when a captain share a score of an event with you
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: false }} />
        </div>
      </div>

      <div className='mt-7 flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>Recommended events alerts</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified about recommended events around you
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: true }} />
        </div>
      </div>

      <div className='mt-7 flex items-start'>
        <div className='min-w-0 grow'>
          <h2 className='text-lg font-medium'>Event state alerts</h2>
          <p className='mt-1 text-sm text-grey-classic'>
            Get notified about the beginning and ending of an event
          </p>
        </div>
        <div className='ml-6 shrink-0 pt-1.5'>
          <Switch inputProps={{ defaultChecked: true }} />
        </div>
      </div>
    </section>
  );
}

export function Settings() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [userData, setUserData] = useState();

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:7001/getUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setUserData(data.data);
      
      if (data.data == "token expired") {
        if (window.location.pathname !== "/login") {
          window.localStorage.clear();
          window.location.href = "../../login";
        }
      }
    });

}, []);

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

  function updatePassword() {
    fetch("http://127.0.0.1:7001/changePassword", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        oldPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          window.localStorage.setItem("messageType", "success");
          setPopupMessage(data.data);
        } else {
          window.localStorage.setItem("messageType", "danger");
          setPopupMessage(data.error);
        }
      });
  }

  return (
    <PageView title='Settings'>
      <Tab.Group manual defaultIndex={0}>
        <Tab.List className='mb-12 flex max-w-full gap-x-2 overflow-x-scroll'>
          <Tab className='app-tab shrink-0 whitespace-nowrap !px-7'>
            Account Settings
          </Tab>
          <Tab className='app-tab shrink-0 whitespace-nowrap !px-7'>
            Security Settings
          </Tab>
          <Tab className='app-tab shrink-0 whitespace-nowrap !px-7'>
            Notification Settings
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AccountSettings userData={userData} />
          </Tab.Panel>
          <Tab.Panel>
            <SecuritySettings onSubmit={updatePassword} onOldPasswordChange={setOldPassword} onNewPasswordChange={setNewPassword} />
          </Tab.Panel>
          <Tab.Panel>
            <NotificationSettings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageView>
  );
}
