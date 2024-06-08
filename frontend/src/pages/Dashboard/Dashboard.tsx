import React, { Component, useEffect, useState } from "react";

import { PageView } from "layout/PageView";

import { Calender } from "./Calender";
import { EventList } from "./EventList";
import { BalanceTrigger } from "./BalanceDialog";

import FriendsIcon from "./icons/friends.svg";
import TeamIcon from "./icons/team.svg";
import TrainingIcon from "./icons/training.svg";
import Events from "./icons/events.svg";

import LinkPlaymateIcon from "./icons/link-playmate.svg";
import LinkEventIcon from "./icons/link-event.svg";

import "./styles.css";

function MainContent() {

  return (
    <section className='grid grid-cols-4 grid-rows-[repeat(2,auto)] gap-5'>
      <div role='button' className='dashboard-majar-card bg-blue-high'>
        <h1>My Playmate</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Malesuada et cras cras odio
          cras duis mollis. Adipiscing orci lobortis nullam odio nunc arcu elit.
          Blandit felis mauris mattis
        </p>
        <s className='flex-grow' />
        <img className='self-end' src={LinkPlaymateIcon} />
      </div>
      <div role='button' className='dashboard-majar-card bg-yellow'>
        <h1>Create Event</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Malesuada et cras cras odio
          cras duis mollis. Adipiscing orci lobortis nullam odio nunc arcu elit.
          Blandit felis mauris mattis
        </p>
        <s className='flex-grow' />
        <img className='self-end' src={LinkEventIcon} />
      </div>

      <button className='dashboard-actions group'>
        <div className='group-hover:bg-blue-high/20'>
          <img src={FriendsIcon} />
        </div>
        <span>Add friends</span>
      </button>
      <button className='dashboard-actions group'>
        <div className='group-hover:bg-blue-high/20'>
          <img src={TeamIcon} />
        </div>
        <span>Join a team</span>
      </button>
        <BalanceTrigger />
      <button className='dashboard-actions group'>
        <div className='group-hover:bg-blue-high/20'>
          <img src={TrainingIcon} />
        </div>
        <span>Add training</span>
      </button>
    </section>
  );
}

function SideView({events} : any) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <section className=''>
      <div className='mb-5 flex gap-x-4'>
        <div className='flex items-start'>
          <div className='box-content rounded-full bg-grey-low p-4'>
            <img className='w-5' src={Events} />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-medium'>Events</h3>
          <p className='text-fine text-grey-type'>Games schedules</p>
        </div>
      </div>

      <Calender setSelectedDate={setSelectedDate} />
      <EventList events={events} date={selectedDate} />
    </section>
  );
}

export function Dashboard() {

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
          status: "Accepted"
        }),
    })
    .then((res) => res.json())
    .then((data) => {
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
        setFriendRequests(data.data);
        setLoaded(true);
    });
  }, [events]);

  return (
    <PageView title='Welcome Andrew'>
      <div className='flex flex-col gap-x-5 gap-y-16 desktop:flex-row desktop:items-start'>
        <MainContent />
        <SideView events={events} />
      </div>
    </PageView>
  );
}
