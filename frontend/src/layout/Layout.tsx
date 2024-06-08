import React, { Component, useEffect, useState } from "react";
import "./styles.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { Menu, Transition } from "@headlessui/react";
import { commonTransitionProps } from "components/PanelTransition";
import { NotificationsTarget } from "./Notifications";
import { Sidebar } from "./Sidebar";
import profileDownArrow from "assets/profile-down-arrow.svg";
import profileImg from "assets/profile.jpg";
import Hamburger from "assets/hamburger.svg";
import { useMenu } from "utils";
import * as icons from "./icons";
import ConnectWalletButton from "./Wallet/ConnectWalletButton";


function UserMenuContent() {
  const navigate = useNavigate();
  return (
    <>
      <Menu.Item
        as='li'
        className='flex cursor-pointer items-center gap-x-3.5 rounded-half px-4 py-3 hover:bg-blue-high/10'
        onClick={() => navigate("/settings")}
      >
        <icons.Settings />
        Settings
      </Menu.Item>
      <Menu.Item
        as='li'
        className='flex cursor-pointer items-center gap-x-3.5 rounded-half px-4 py-3 hover:bg-blue-high/10'
      >
        <icons.Help />
        Help
      </Menu.Item>
      <Menu.Item
        as='li'
        className='flex cursor-pointer items-center gap-x-3.5 rounded-half px-4 py-3 hover:bg-blue-high/10'
        onClick={() => {
          window.localStorage.clear();
          window.location.href = "../../login";
        }}
      >
        <icons.Logout />
        Log Out
      </Menu.Item>
    </>
  );
}

function UserMenuTarget({ children }: React.PropsWithChildren) {
  const m = useMenu();

  return (
    <Menu>
      <Menu.Button ref={e => m.setReferenceElem(e as any)}>
        {children}
      </Menu.Button>

      <Transition {...commonTransitionProps} className='z-[999999]'>
        <Menu.Items
          ref={e => m.setFloatingElement(e as any)}
          style={m.styles.popper}
          {...m.attributes.popper}
          as='ul'
          className='z-[9999999] min-w-[15rem] overflow-hidden rounded-half bg-grey-low outline-none'
        >
          <UserMenuContent />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function UserProfile({userData} : any) {
  return (
      <>
            <UserMenuTarget>
              <p className='ml-8 box-content flex cursor-pointer select-none items-center rounded-md p-2 transition-colors hover:bg-blue-high/10'>
                {userData.fname} {userData.lname}
                <img className='ml-1' src={profileDownArrow} />
              </p>
            </UserMenuTarget>

            <UserMenuTarget>
              <img
                className='ml-4 box-content h-7 w-7 cursor-pointer rounded-full p-2 transition-colors hover:bg-blue-high/10'
                src={userData.profilePic}
              />
            </UserMenuTarget>

            <p className='ml-8 bg-blue-high rounded-md transition-colors hover:bg-blue-high/10'>
                <ConnectWalletButton/>
            </p>
            
      </>
  );
}

export function Layout() {
  let [open, setOpen] = React.useState(false);

  const [loaded, setLoaded] = useState(false);    

  const [userData, setUserData] = useState("");
  const [events, setEvents] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const [admin, setAdmin] = useState(false);

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
          if (data.data.userType == "Admin") {
              setAdmin(true);
          }
  
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
    if(!userData) return;

    fetch("http://127.0.0.1:7001/getEvents", {
        method: "POST",
        crossDomain: true,
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        status: "Pending Invite"
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.data == "token expired") {
          return;
        }
        setEvents(data.data);
    });
  }, [userData]);
  
  useEffect(() => {
    if(!events) return;

    fetch("http://127.0.0.1:7001/getFriendRequests", {
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
        setLoaded(true);

        if (data.data == "token expired") {
          return;
        }
        setFriendRequests(data.data);
    });
  }, [events]);

  return (
    <>
      {!loaded && (
          <BarLoader color="#5ce5e2" 
          cssOverride={{
            display: "block",
            margin: "10vh auto",
            borderColor: "red",
          }}
          size={10}
        />
      )}
      {loaded && (
        <>
        <LayoutSidebar open={open} setOpen={setOpen} userData={userData} />
        <ContentPane setOpen={setOpen} userData={userData} events={events} friendRequests={friendRequests} />
        </>
      )}

    </>
  );
}

function ContentPane({ setOpen, userData, events, friendRequests }: any) {
  const [title, setTitle] = React.useState<React.ReactNode>(null);
  const [actions, setActions] = React.useState<React.ReactNode>(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Set type in events array to "eventInvite"
    events.forEach((event: any) => {
      event.type = "eventInvite";
    });
  
    // Set type in friend requests array to "friendRequest"
    friendRequests.forEach((friendRequest: any) => {
      friendRequest.type = "friendRequest";
    });
  
    // Combine events and friend requests into notifications array
    let notificationsTemp = events.concat(friendRequests);
    setNotifications(notificationsTemp)
  }, [events, friendRequests])

  return (
    <section className='flex max-h-full min-h-full min-w-0 max-w-full flex-1 flex-col overflow-y-auto overflow-x-hidden bg-sheet desktop:overflow-y-hidden'>
      <header className='flex flex-wrap items-center px-5 py-3'>
        <div className='flex items-center desktop:hidden'>
          <button
            className='mr-2 box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
            onClick={() => setOpen(true)}
          >
            <img src={Hamburger} />
          </button>
          <h1 className='text-2xl font-extrabold text-blue-high'>LOGO</h1>
        </div>

        <div className='order-1 mt-0 flex w-full items-center justify-between desktop:order-none desktop:mt-0 desktop:w-auto'>
          <h1 className='py-6 text-2xl font-bold desktop:py-0'>{title}</h1>
          <div className='flex items-center gap-x-0.5 desktop:hidden'>
            {actions}
          </div>
        </div>

        <div className='flex flex-1 items-center justify-end'>
          <NotificationsTarget notifications={notifications} setNotifications={setNotifications} />
          <div className='hidden items-center desktop:flex'>
            <UserProfile userData={userData} />
          </div>
          

        </div>
      </header>

      <div className='min-h-0 min-w-0 flex-1 px-5 pt-0 desktop:overflow-y-auto desktop:pt-8 [&>:last-child]:mb-8'>
        <Outlet context={{ setTitle, setActions }} />
      </div>
    </section>
  );
}

function LayoutSidebar({ open, setOpen, userData }: any) {
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {open && (
        <div
          className='fixed z-[3002] h-screen w-screen bg-black/30 desktop:hidden'
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
      <aside id='sidebar' className='self-stretch' data-app-open={open}>
        <Sidebar userData={userData} />
      </aside>
    </>
  );
}