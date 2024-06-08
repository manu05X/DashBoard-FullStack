import cx from "classnames";
import { PageView } from "layout/PageView";

import { ListBox } from "components/ListBox";
import Pattern from "assets/ghost-pattern.svg";
import SearchIcon from "assets/search.svg";
import FilterIcon from "assets/filter.svg";
import IconDate from "assets/input-date.svg";
import RightArrow from "assets/right-arrow.svg";
import CalenderComponent from "components/CalendarComponent";

import "./styles.css";

import ProfileIMG from "assets/playmate-profile.jpg";
import RowIcon1 from "assets/pm-row-1.svg";
import RowIcon2 from "assets/pm-row-2.svg";
import RowIcon3 from "assets/pm-row-3.svg";
import React, { Component, useEffect, useState } from "react";
import { set } from "date-fns";

function ProfileBox({userData, own, friendStatus} : any) {
  const sendFriendRequest = (friendId: string) => {
    fetch("http://127.0.0.1:7001/sendFriendRequest", {
        method: "POST",
        crossDomain: true,
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        friendId
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        
    });
  }

  const goToSetting = () => {
    window.location.href = "/settings"
  }

  return (
    <header className='relative flex flex-wrap justify-between gap-y-8 overflow-hidden rounded-card bg-grey-low px-7 py-6'>
      <img className='absolute right-0 top-0 hidden sm:block' src={Pattern} />
      <div className='relative flex items-center gap-x-4'>
        <div className='overflow-hidden rounded-full'>
          <img className='h-25 w-25' src={userData.profilePic} />
        </div>
        <div className='mr-6 min-w-0'>
          <h1 className='text-[1.5625rem] font-bold'>{userData.fname + " " + userData.lname}</h1>
          <p className='text-fine text-grey-classic'>{userData.description}</p>
        </div>
      </div>

      <div className='relative w-full items-center sm:flex sm:w-auto'>
        <div className='mb-7 flex max-w-full gap-x-6 overflow-x-auto sm:mb-0'>
          <div className='pm-stat'>
            <h3>80.5%</h3>
            <p>Win rate</p>
          </div>
          <div className='pm-stat'>
            <h3>22</h3>
            <p>Teams games</p>
          </div>
          <div className='pm-stat'>
            <h3>31</h3>
            <p>Training</p>
          </div>
          <div className='pm-stat'>
            <h3>{userData.numFriends}</h3>
            <p>Friends</p>
          </div>
        </div>
        {
          !own
            ? friendStatus
              ? <></>
              : <button onClick={() => sendFriendRequest(userData.id)} className='w-full rounded-card bg-blue-high px-4 py-2.5 text-black transition-colors hover:bg-blue-high/80 sm:ml-12 sm:w-auto'>
                  Add Friend
                </button>
            : <button onClick={() => goToSetting()} className='w-full rounded-card bg-blue-high px-4 py-2.5 text-black transition-colors hover:bg-blue-high/80 sm:ml-12 sm:w-auto'>
                Edit Profile
              </button>
        }
      </div>
    </header>
  );
}

function Filters(props: any) {
  const { setSelectedTeam, setSelectedSport, setSelectedDate, setSearchKey, selectedTeam, selectedSport, selectedDate, searchKey } = props;
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setfiltersOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [sports, setSports] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false)

  const clearFilter = () => {
    setSelectedTeam(null)
    setSelectedSport(null)
    setSelectedDate("")
    setSearchKey("")
  }

  useEffect(() => {
    fetch("http://127.0.0.1:7001/getTeams", {
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
      setTeams(data.data);
    });

    fetch("http://127.0.0.1:7001/getSports", {
      method: "GET",
      crossDomain: true,
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setSports(data.data);
    });
  }, [])

  return (
    <section className='mt-12 flex flex-wrap items-center gap-y-4'>
      <h2 className='mr-12 flex-1 whitespace-nowrap text-lg font-medium'>
        Sport activities
      </h2>

      <div
        className={cx(
          "md:order-0 order-1 flex-wrap items-center gap-x-5 gap-y-5 md:!flex",
          filtersOpen ? "flex" : "hidden"
        )}
      >
        <ListBox
          placeholder='Teams'
          className='minimal min-w-[12rem]'
          selected={selectedTeam}
          onChangeValue={setSelectedTeam}
          data={
            teams.map((sport) => {
                return sport.name;
            })
          }
        />
        <ListBox
          placeholder='Sports'
          className='minimal min-w-[12rem]'
          selected={selectedSport}
          onChangeValue={setSelectedSport}
          data={
            sports.map((sport) => {
                return sport.name;
            })
          }
        />
        <div className='relative flex min-w-[12rem] rounded-card border border-grey-high px-3 py-2.5 relative'>
          <input
            onFocus={() => setShowCalendar(true)}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='flex-1 appearance-none bg-transparent text-white placeholder:text-grey-subtle'
            placeholder='Select date'
            size={1}
          />
          <img
            className='pointer-events-none absolute right-0 mx-3 w-6 self-center'
            src={IconDate}
          />
          {
            showCalendar && 
              <div className="absolute calendar">
                <CalenderComponent setSelectedDate={setSelectedDate} outSideClickFunc={() => setShowCalendar(false)} />
              </div>
          }
        </div>
        <div className='flex min-w-[18rem] overflow-hidden rounded-card border border-grey-high'>
          <img className='mx-4 my-3 w-6' src={SearchIcon} />
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className='flex-1 bg-transparent text-white'
            placeholder='Search for event'
            size={1}
          />
        </div>
        <p
          role='button'
          className='self-center text-dim-white underline transition-colors hover:text-blue-high'
          onClick={clearFilter}
        >
          Clear Filters
        </p>
      </div>
      <div className='flex md:hidden'>
        <button
          onClick={() => setSearchOpen(x => !x)}
          className='box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
        >
          <img src={SearchIcon} />
        </button>
        <button
          onClick={() => setfiltersOpen(x => !x)}
          className='box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
        >
          <img src={FilterIcon} />
        </button>
      </div>

      {searchOpen && (
        <div className='flex w-full overflow-hidden rounded-card border border-grey-high'>
          <img className='mx-4 my-3 w-6' src={SearchIcon} />
          <input
            className='flex-1 bg-transparent text-white'
            placeholder='Search for event'
            size={1}
          />
        </div>
      )}
    </section>
  );
}

interface ResultStatusProps {
  letter: string;
  bgColorClass: string;
}
function ResultStatus(props: ResultStatusProps) {
  return (
    <div
      className={cx(
        "box-content flex h-6 w-6 items-center justify-center rounded-half p-0.5 text-dim-black",
        props.bgColorClass
      )}
    >
      {props.letter}
    </div>
  );
}

function ViewMore() {
  return (
    <a href='#' className='flex items-center'>
      <span className='mr-0.5 text-fine underline'>View</span>
      <img src={RightArrow} />
    </a>
  );
}

function Row(props: ResultStatusProps & { icon: string, event: any }) {
  let { icon, event, ...rest } = props;
  return (
    <tr>
      <td>
        <p className='flex gap-x-2'>
          <img src={icon} /> {event.name}
        </p>
      </td>
      <td>{event.location}</td>
      <td>{event.startTime} - {event.endTime}</td>
      <td>{event.date}</td>
      <td>
        <ResultStatus {...rest} />
      </td>
      <td>
        <ViewMore />
      </td>
    </tr>
  );
}

function Table({events} : any) {
  return (
    <section className='pm-table-section mt-5'>
      <table>
        <thead>
          <tr>
            <th>Sport</th>
            <th>Location</th>
            <th>Time</th>
            <th>Date</th>
            <th className='w-1'>Result</th>
            <th className='w-1'>See more</th>
          </tr>
        </thead>
        <tbody>
          {
            events.map((event: any, index: number) => {
              return (
                <Row key={index} icon={RowIcon1} event={event} letter='-' bgColorClass='bg-dim-white' />
              )
            })
          }
        </tbody>
      </table>
    </section>
  );
}

export function MyPlaymate() {
  const [loaded, setLoaded] = useState(false);   
  const [own, setOwn] = useState(""); 
  const [friendStatus, setFriendStatus] = useState(false)

  const [userData, setUserData] = useState("");
  const [events, setEvents] = useState([]);
  const [showedEvents, setShowedEvents] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const id = window.location.href.split("id=")[1]
    let url = "http://127.0.0.1:7001/getUserData"
    if (id) {
      url += `/${id}`

      fetch("http://127.0.0.1:7001/getFriendStatus", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          friendId: id,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === "Accepted") setFriendStatus(true)
      });
    } 

    fetch(url, {
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
      setOwn(data.data.own)

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
    console.log("here", userData)
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
        userId: userData.id,
        status: "Accepted"
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        setEvents(data.data);
        setShowedEvents(data.data);
        setLoaded(true);
    });
  }, [userData]);

  useEffect(() => {
    console.log(selectedTeam, selectedSport, selectedDate, searchKey)
    let newEvents = [...events];
    if (selectedTeam !== null) newEvents = newEvents.filter(event => event.teamName === selectedTeam)
    if (selectedSport !== null) newEvents = newEvents.filter(event => event.sport === selectedSport)
    if (selectedDate !== "") newEvents = newEvents.filter(event => event.date === selectedDate)
    if (searchKey !== "") newEvents = newEvents.filter(event => {
      if (event.name.toString().toLowerCase().indexOf(searchKey.toString().toLowerCase()) > -1 || event.location.toString().toLowerCase().indexOf(searchKey.toString().toLowerCase()) > -1) return true
    })
    setShowedEvents(newEvents)
  }, [selectedTeam, selectedSport, selectedDate, searchKey])

  return (
    <PageView title='My Playmate'>
      <ProfileBox userData={userData} own={own} friendStatus={friendStatus} />
      <Filters 
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam} 
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport} 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} 
        searchKey={searchKey}
        setSearchKey={setSearchKey} />
      <Table events={showedEvents} />
    </PageView>
  );
}
