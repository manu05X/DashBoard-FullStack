import cx from "classnames";
import { PageView } from "layout/PageView";

import { MembersAndLineup } from "components/MembersAndLineup/MembersAndLineup";

import TeamCover from "assets/team-cover.jpg";
import { ClockIcon } from "components/adaptive-icons/PinMarker";
import { PinMarkerIcon } from "components/adaptive-icons/Clock";
import RightArrow from "assets/right-arrow.svg";
import MoreIcon from "assets/more.svg";
import Team1 from "assets/team-1.png";
import Team2 from "assets/team-2.png";
import Team10 from "assets/team-10.png";
import Team11 from "assets/team-11.png";
import CopyIcon from "assets/copy.svg";
import { useNavigate } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import { useMenu } from "utils";
import { Menu, Transition } from "@headlessui/react";
import { commonTransitionProps } from "components/PanelTransition";

function ImageActions() {
  const m = useMenu();

  return (
    <Menu>
      <Menu.Button
        ref={e => m.setReferenceElem(e as any)}
        className='rounded-half bg-grey-high px-2.5 py-1.5 hover:bg-grey-low/90 absolute right-6 top-4 hidden desktop:inline'
      >
        <img className='w-1.5' src={MoreIcon} />
      </Menu.Button>
      <Transition {...commonTransitionProps}>
        <Menu.Items
          ref={e => m.setFloatingElement(e as any)}
          style={m.styles.popper}
          {...m.attributes.popper}
          as='ul'
          className='min-w-[11.5rem] rounded-half bg-grey-high p-1'
        >
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Action 1
          </Menu.Item>
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Action 2
          </Menu.Item>
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Action 3
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function TopBlock({teamData} : any) {

  function formatDateTime(dateTime : any) {
    // Format to e.g Jan 2023
    var date = new Date(dateTime);
    var month = date.toLocaleString('default', { month: 'short' });
    var year = date.getFullYear();

    return month + " " + year;
  }

  return (
    <>
      <div className='relative mb-16 h-40 w-full'>
        <img
          className='h-full w-full rounded-card object-cover object-center'
          src={teamData.profileBanner}
        />

        <ImageActions />

        <div className='absolute bottom-0 left-4 h-25 w-25 translate-y-1/2 overflow-hidden rounded-full border-4 border-sheet desktop:left-8'>
          <img src={teamData.profilePic} />
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-5'>
        <div className='grow basis-full sm:basis-0'>
          <h1 className='text-idxtitle font-bold leading-tight sm:whitespace-nowrap'>
            {teamData.name}
          </h1>
          <p className='text-fine text-grey-classic'>Opened: {formatDateTime(teamData.createdAt)}</p>
        </div>
        <div className='flex flex-wrap gap-x-6 gap-y-4 sm:order-1 sm:shrink-0 sm:flex-nowrap'>
          <div className='pm-stat'>
            <h3>18</h3>
            <p>Members</p>
          </div>
          <div className='pm-stat'>
            <h3>281</h3>
            <p>Games played</p>
          </div>
          <div className='pm-stat'>
            <h3>77.5%</h3>
            <p>Win rate</p>
          </div>
        </div>
      </div>
    </>
  );
}

interface TeamFixtureBlockProps {
  srcA: string;
  srcB: string;
}
function TeamFixtureBlock(props: TeamFixtureBlockProps) {
  return (
    <div className='min-w-0 flex-1 overflow-hidden rounded-half bg-grey-low p-5'>
      <div className='flex items-center gap-x-2 border-b border-outline-2 pb-5'>
        <div className='flex-shrink-0 overflow-hidden rounded-full'>
          <img className='w-7' src={props.srcA} />
        </div>
        <span className='min-w-0 overflow-hidden text-ellipsis'>
          Team Soccer A
        </span>
        <p className='mx-2 flex-1 text-center text-grey-subtle'>V</p>
        <span className='min-w-0 overflow-hidden text-ellipsis'>
          Team Soccer B
        </span>
        <div className='flex-shrink-0 overflow-hidden rounded-full'>
          <img className='w-7' src={props.srcB} />
        </div>
      </div>

      <div className='relative mt-5'>
        <p className='mb-1 flex items-center gap-x-2.5'>
          <PinMarkerIcon className='flex-shrink-0 text-blue-high' />

          <span className='min-w-0 overflow-hidden text-ellipsis font-semibold text-dim-white'>
            Emirate stadium, England
          </span>
        </p>
        <p className='flex items-center gap-x-2.5 text-dim-white'>
          <ClockIcon className='flex-shrink-0 text-blue-high' />

          <span className='min-w-0 overflow-hidden text-ellipsis text-fine text-dim-white'>
            15/10/2023 02:00 PM
          </span>
        </p>

        <button className='bottom-0 right-0 mt-6 flex gap-x-2 rounded-half bg-grey-high p-2.5 transition-colors hover:bg-blue-high/10 xs:absolute'>
          <img src={CopyIcon} />
          <span className='text-fine'>Copy Link</span>
        </button>
      </div>
    </div>
  );
}

function Fixtures() {
  return (
    <section>
      <h3 className='mb-3 text-lg font-medium'>Next Fixtures</h3>

      <div className='flex min-w-0 flex-col gap-x-5 gap-y-5 xl:flex-row'>
        <TeamFixtureBlock srcA={Team1} srcB={Team2} />
        <TeamFixtureBlock srcA={Team10} srcB={Team11} />
      </div>
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

function Row(props: ResultStatusProps) {
  let { ...rest } = props;
  return (
    <tr>
      <td>
        <p className='flex gap-x-2'>Team never lucky Vs Tzatziki Turbo</p>
      </td>
      <td>Civic Centre Westchester, London</td>
      <td>06:00PM - 08:00PM</td>
      <td>23, August 2023</td>
      <td>
        <ResultStatus {...rest} />
      </td>
      <td>
        <ViewMore />
      </td>
    </tr>
  );
}

function GameHistory() {
  return (
    <div className='pm-table-section'>
      <h3 className='mb-3 mt-5 text-lg font-medium'>Game history</h3>
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
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
          <Row letter='W' bgColorClass='bg-blue-high' />
        </tbody>
      </table>
    </div>
  );
}

function Information() {
  return (
    <section className=''>
      <Fixtures />
      <GameHistory />
    </section>
  );
}

export function TeamIndex() {
  const navigate = useNavigate();

  const [selectedTeamId, setSelectedTeamId] = useState(window.location.href.split("id=")[1]);

  const [loaded, setLoaded] = useState(false);

  const [loadedTeamData, setLoadedTeamData] = useState(false);

  const [teamsData, setTeamsData] = useState([]); // This is the list of teams that the user is a part of

  const [teamData, setTeamData] = useState("");
  const [isPublicView, setPublicView] = useState(false); // The Public View is the view that is seen by other users, not the logged in user

  const [sportsData, setSportsData] = useState([]); // This is the list of sports that exist in the database
  const [selectedSportId, setSelectedSportId] = useState(""); // This is the sport that is selected by the user

  const [membersData, setMembersData] = useState([]); // This is the list of members of the team

  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  const [teamAdmin, setTeamAdmin] = useState(false); // This is true if the logged in user is an admin of the team

  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const [teamInviteLink, setTeamInviteLink] = useState("");

  const closePopup = function() {
      // This function is called when the user clicks on the close button of the popup

      // Hide the popup
      setPopupVisible(false);
  }

  const setSelectedTeam = function() {
      // This function is called when the user selects a sport from the dropdown teamDropdown

      // Get the teamId of the selected team
      var teamId = document.getElementById("teamDropdown").value;

      if(teamId == "new") {
          // If the user selects "Create a new team" then redirect them to the Create Team page
          window.location.href = "../../../CreateTeam";
      } else {
          // Set the selectedTeamId to the teamId of the selected team
          setSelectedTeamId(teamId);
      }

  }

  function setOption(selectElement, value) {
      return [...selectElement.options].some((option, index) => {
          if (option.value == value) {
              selectElement.selectedIndex = index;
              return true;
          }
      });
  }

  const setSelectedTeamById = function(teamId) {
      // Set the selectedTeamId to the teamId passed in
      setSelectedTeamId(teamId);

      // Wait for the teamsData to be loaded
      if(loaded) {   
          setOption(document.getElementById("teamDropdown"), teamId);
      }
  }

  const setSelectedSport = function() {
      // This function is called when the user selects a sport from the dropdown sportsTypesDropdown

      setLoadedTeamData(false);

      // Get the sportId of the selected sport
      var sportId = document.getElementById("sportsTypesDropdown").value;

      // Set the selectedSportId to the sportId of the selected sport
      setSelectedSportId(sportId);

      // Select the first Team in the list of teams from the selected sport
      try {

          let teamId = teamsData.filter((team) => (team.sportsType == sportId || team.id == "new"))[0].id;

          if(teamId == "new") {
              // If the user selects "Create a new team" then redirect them to the Create Team page
              window.location.href = "../../../CreateTeam";
          } else {
              // Set the selectedTeamId to the teamId of the selected team
              setSelectedTeamById(teamId);
              updateTeamData();
          }
          
      } catch (error) {
          
      }
  }

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
              window.localStorage.clear();
              window.location.href = "../../../login";
          }

      });

      // Get the list of sports that exist in the database
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
          setSportsData(data.data);

          setSelectedSportId(data.data[0].id);
      });

      // Get the popup message from the local storage
      setPopupMessage(window.localStorage.getItem("message"));
      setPopupVisible(false);
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

  useEffect(() => {
      if(selectedTeamId == "" && id != undefined) {
          setSelectedTeamById(id);
      } else if (selectedTeamId == "" && id == undefined) {
          if(teamsData.length > 0) {
              setSelectedTeamById(teamsData[0].id);

              setLoaded(true);
          }
      }
  }, [teamsData, loaded]);

  useEffect(() => {
      updateTeamData();
  }, [selectedTeamId]);

  function updateTeamData() {
      if(selectedTeamId != "") {
          fetch("http://127.0.0.1:7001/getTeamData/"+selectedTeamId, {
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
              setTeamData(data.data);

              // Create the team invite link
              // Get the current base url
              var baseUrl = window.location.href;

              // Only get the base url without any page names
              baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/"));
              baseUrl = baseUrl.replace("/Teams", "");

              setTeamInviteLink(baseUrl + "/JoinTeam/" + data.data.id + "/" + data.data.inviteCode);
              
              setLoaded(true);

              // Wait at least 500ms before setting the loadedTeamData to true
              setTimeout(() => {
                  setLoadedTeamData(true);
              }, 500);
          });
      }
  }

  useEffect(() => {
      // Get the list of members of the team
      if(selectedTeamId != "") {
          fetch("http://127.0.0.1:7001/getTeamMembers/", {
              method: "POST",
              crossDomain: true,
              headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                  teamId: selectedTeamId,
                  token: window.localStorage.getItem("token"),
              }),
          })
          .then((res) => res.json())
          .then((data) => {
              setMembersData(data.data);

              // Check if the user is a admin of the team
              let isAdmin = false;
              for(var i = 0; i < data.data.length; i++) {
                  if(data.data[i].id == userData._id && data.data[i].role == "Admin") {
                      isAdmin = true;
                  }
              }
              setTeamAdmin(isAdmin);
          }
          );
      }
  }, [selectedTeamId]);

  return (
    <PageView
      title={
        <div className='flex items-center'>
          <button
            className='mr-2 box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
            onClick={() => {
              navigate(-1);
            }}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.3199 5.93001C10.3199 6.12 10.2499 6.31 10.0999 6.46L4.55994 12L10.0999 17.54C10.3899 17.83 10.3899 18.31 10.0999 18.6C9.80994 18.89 9.32994 18.89 9.03994 18.6L2.96994 12.53C2.67994 12.24 2.67994 11.76 2.96994 11.47L9.03994 5.4C9.32994 5.11 9.80994 5.11 10.0999 5.4C10.2499 5.54 10.3199 5.74001 10.3199 5.93001Z'
                fill='#D9D9D9'
              />
              <path
                d='M21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75L3.66992 12.75C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25L20.4999 11.25C20.9099 11.25 21.2499 11.59 21.2499 12Z'
                fill='#D9D9D9'
              />
            </svg>
          </button>
          <span className='font-light text-grey-type'>My Team</span>&nbsp;
          <span>/ Team Page</span>
        </div>
      }
    >
      <div className='grid max-w-full grid-cols-1 gap-x-5 gap-y-10 desktop:grid-cols-[minmax(0,1fr)_auto]'>
        <div>
          <TopBlock teamData={teamData} />
        </div>
        <div className='col-0 desktop:col-1 desktop:row-span-2'>
          <MembersAndLineup members={membersData} />
        </div>
        <div>
          <Information />
        </div>
      </div>
    </PageView>
  );
}
