import cx from "classnames";

import { PageView } from "layout/PageView";
import { Tab } from "@headlessui/react";
import { TeamCreator } from "./TeamCreator";
import { Link } from "react-router-dom";
import PlusIcon from "assets/plus.svg";
import SearchIcon from "assets/search.svg";

import "./styles.css";
import React, { Component, useEffect, useState } from "react";

interface TeamCardProps {
  key: number,
  id: string;
  name: string;
  membersCount: number;
  avatars: string[];
  joined: boolean;
  avatarUrl: string;
}
function TeamCard(props: TeamCardProps) {
  return (
    <div className='rounded-card bg-grey-low p-5 flex flex-col'>
      <header className='flex-1 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-3.5 border-b-2 border-outline-2 pb-3'>
        <div className='row-span-2 h-14.5 w-14.5 place-self-center overflow-hidden rounded-full'>
          <img src={props.avatarUrl} className='object-cover object-bottom' />
        </div>
        <h2 className='col-[2] text-xl font-semibold'>
          {props.name}
        </h2>

        <div className='mt-2 flex items-center'>
          {
            !!props.avatars && props.avatars.map((profilePic, index) =>
              index < 4 &&
                <img
                  key={index}
                  className={`${props.key !== 0 ? '-ml-2.5' : ''} box-content h-5.5 w-5.5 rounded-full border-4 border-grey-low`}
                  src={profilePic}
                />
            )
          }
          <p className='ml-3 text-fine'>
            <span className='text-grey-grain'>{props.membersCount}/</span>
            <span>32</span>
          </p>
        </div>
      </header>

      <footer className='tm-card-footer mt-4 flex flex-wrap gap-y-4'>
        <div className='stat'>
          <h3>281</h3>
          <p>Games played</p>
        </div>
        <div className='stat ml-6'>
          <h3>77.5%</h3>
          <p>Win rate</p>
        </div>
        <s className='min-w-0 flex-1' />
        <Link to={'/team/index?id='+props.id}>
          <button
            className={cx(
              "self-start rounded-half px-4 py-2 text-sm",
              props.joined
                ? "bg-grey-high text-white hover:bg-blue-high/10"
                : "bg-blue-high text-sheet hover:bg-blue-high/80"
            )}
          >
            {props.joined ? "View" : "Join"}
          </button>
        </Link>
      </footer>
    </div>
  );
}

function MyTeamGrid({teams} : any) {
  return (
    <section className='mb-12 mt-7 grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2 desktop:grid-cols-4'>
      {teams.map((team: any, index: number) => (
        <TeamCard key={index} avatars={team.avatars} membersCount={team.membersCount} id={team.id} name={team.name} avatarUrl={team.profilePic} joined={true} />
      ))}
    </section>
  );
}

function ExploreTeamGrid({teams}: any) {
  return (
    <section className='mb-12 mt-7 grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2 desktop:grid-cols-4'>
      {teams.map((team: any, index: number) => (
        <TeamCard key={index} avatars={team.avatars} membersCount={team.membersCount} id={team.id} name={team.name} avatarUrl={team.profilePic} joined={true} />
      ))}
    </section>
  );
}

export function MyTeam() {
  const [searchOpen, setSearchOpen] = useState(false);

  
  const [loaded, setLoaded] = useState(false);    

  const [userData, setUserData] = useState("");
  const [teams, setTeams] = useState([]);
  const [showTeams, setShowTeams] = useState([])
  const [allTeams, setAllTeams] = useState([]);
  const [showAllTeams, setShowAllTeams] = useState([])
  const [index, setIndex ] = useState(0)
  const [searchKey, setSearchKey] = useState("")

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
        setShowTeams(data.data);
        setLoaded(true);
    }
    );

    fetch("http://127.0.0.1:7001/getAllTeams", {
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
        setAllTeams(data.data);
        setShowAllTeams(data.data)
        setLoaded(true);
    }
    );

  }, [userData]);

  useEffect(() => {
    setSearchKey('')
  }, [index])

  const onSearch = (key: string) => {
    setSearchKey(key)
    if (!index) {
      const newTeams = teams.filter(team => team.name.toString().toLowerCase().indexOf(key.toString().toLowerCase()) > -1)
      setShowTeams(newTeams)
    } else {
      const newAllTeams = allTeams.filter(team => team.name.toString().toLowerCase().indexOf(key.toString().toLowerCase()) > -1)
      setShowAllTeams(newAllTeams)
    }
  }

  return (
    <PageView
      title='My Team'
      actions={
        <>
          <button
            onClick={() => setSearchOpen(x => !x)}
            className='box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
          >
            <img src={SearchIcon} />
          </button>
          <TeamCreator>
            <button className='ml-4 rounded-half bg-blue-high p-2 transition-colors hover:bg-blue-high/80'>
              <img src={PlusIcon} />
            </button>
          </TeamCreator>
        </>
      }
    >
      {searchOpen && (
        <div className='mb-6 flex overflow-hidden rounded-card border border-grey-high mini-desktop:hidden'>
          <img className='mx-4 my-3 w-6' src={SearchIcon} />
          <input
            onChange={(event) => onSearch(event.target.value)}
            value={searchKey}
            className='flex-1 bg-transparent text-white'
            placeholder='Search for teams'
            size={1}
          />
        </div>
      )}
      <Tab.Group manual defaultIndex={0} onChange={(index) => setIndex(index)}>
        <Tab.List className='flex gap-x-2 mini-desktop:items-center'>
          <Tab className='app-tab flex-1 mini-desktop:flex-initial'>
            My Team
          </Tab>
          <Tab className='app-tab flex-1 mini-desktop:flex-initial'>
            Explore Teams
          </Tab>

          <div className='hidden flex-1 items-center justify-end gap-x-5 mini-desktop:flex'>
            <div className='flex max-w-[24rem] flex-1 overflow-hidden rounded-card border border-grey-high'>
              <img className='mx-4 my-3 w-6' src={SearchIcon} />
              <input
                onChange={(event) => onSearch(event.target.value)}
                value={searchKey}
                className='flex-1 bg-transparent text-white'
                placeholder='Search for teams'
                size={1}
              />
            </div>

            <TeamCreator>
              <button className='flex items-center gap-x-2 rounded-half bg-blue-high px-14 py-3 font-medium text-dim-black hover:bg-blue-high/80'>
                <img className='w-6' src={PlusIcon} />
                Create a Team
              </button>
            </TeamCreator>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <MyTeamGrid teams={showTeams}/>
            <p>&nbsp;</p>
          </Tab.Panel>
          <Tab.Panel>
            <ExploreTeamGrid teams={showAllTeams} />
            <p>&nbsp;</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageView>
  );
}
