import React, {Component, useEffect, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import { ListBox } from "components/ListBox";
import { UploadAvatar } from "components/UploadAvatar/UploadAvatar";
import { DialogCrossButton } from "components/DialogCrossButton";
import { InvitationRow } from "components/InvitationRow";
import InputComponent from 'components/InputComponent';

import PlaceholderFile from "assets/placeholder-file.svg";
import ConfirmationTick from "assets/confirm-tick.svg";

import Member1 from "assets/member-1.png";
import Member2 from "assets/member-2.png";
import Member3 from "assets/member-3.png";
import { DialogSheet } from "components/DialogSheet";

import axios from 'axios';

function UploadBanner({bannerPicPath, onClick }: any) {
  return (
    <div className='flex w-full flex-col items-center gap-y-4 rounded-half border border-grey-high bg-dim-black p-5'>
      {bannerPicPath == "" ? (
        <>
          <img src={PlaceholderFile} />
          <p>
            <span onClick={onClick} className='cursor-pointer font-medium text-white underline hover:text-blue-high'>
              Click to upload
            </span>{" "}
            <span className='text-dim-white'>or drag and drop</span>
          </p>
          <p className='text-sm text-dim-white'>JPG or PNG (max 800 x 400 px)</p>
        </>
      ) : (
        <img className='shrink-0' src={bannerPicPath} />
      )}
    </div>
  );
}

interface TeamFormProp {
  onClose: () => void;
  onCreate: () => void;
}
function TeamForm({ onClose, onCreate }: TeamFormProp) {
  const [loaded, setLoaded] = useState(false);

  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  const [sportsData, setSportsData] = useState([]); // This is the list of sports that exist in the database
  const [selectedSportId, setSelectedSportId] = useState(null); // This is the sportId of the sport that the user selected from the dropdown

  const [profilePicPath, setProfilePicPath] = useState("");
  const [bannerPicPath, setBannerPicPath] = useState("");

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [members, setTeamMembers] = useState([]);
  const [teamGender, setTeamGender] = useState(null);
  const [allFriends, setAllFriends] = useState([]);
  const [showFriends, setShowFriends] = useState([]);
  const [teamAvatarError, setTeamAvatarError] = useState(false);
  const [teamBannerError, setTeamBannerError] = useState(false);
  const [teamNameError, setTeamNameError] = useState(false);
  const [gameTypeError, setGameTypeError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [searchKey, setSearchKey] = useState("");

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
          setTeamAvatarError(false)
      } catch (ex) {
        console.log(ex);
      }

  };

  const saveBannerPic = async (e) => {
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

          setBannerPicPath(res.data.data);
          setTeamBannerError(false)
      } catch (ex) {
        console.log(ex);
      }
  };

  const createNewTeam = function() {
    // This function is called when the user clicks on the "Create Team" button
    if (!profilePicPath) setTeamAvatarError(true)
    if (!bannerPicPath) setTeamBannerError(true)
    if (!teamName) setTeamNameError(true)
    if (!selectedSportId) setGameTypeError(true)
    if (!teamGender) setGenderError(true)
    if (!teamName || !teamGender || !selectedSportId || !profilePicPath || !bannerPicPath) return

    fetch("http://127.0.0.1:7001/createTeam", {
        method: "POST",
        crossDomain: true,
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
            name: teamName,
            description: teamDescription,
            members: members,
            gender: teamGender,
            sportsTypeId: selectedSportId,
            profilePic: profilePicPath,
            profileBanner: bannerPicPath,
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
            window.location.href = "../../team/index?id=" + data.data.team;
          }
        }
    });
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
          window.location.href = "./login";
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

          setLoaded(true);
      }
      );

      fetch("http://127.0.0.1:7001/getFriends", {
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
        setAllFriends(data.data);
        setShowFriends(data.data)
        
        if (data.data == "token expired") {
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  useEffect(() => {
    if (teamName) setTeamNameError(false)
    if (selectedSportId) setGameTypeError(false)
    if (teamGender) setGenderError(false)
  }, [teamName, selectedSportId, teamGender])

  const onSelectMember = (selected: boolean, userId: string) => {
    let newMembers
    if (selected) {
      newMembers = [...members, userId];
    } else {
      newMembers = members.filter(member => member !== userId);
    }

    setTeamMembers(newMembers);
  }

  const onSelectAllMembers = (selected: boolean) => {
    if (selected) {
      const newMembers = showFriends.map(friend => friend._id)
      setTeamMembers(newMembers)
    } else {
      setTeamMembers([])
    }
  }

  const onSelectSportType = (value: string) => {
    setSelectedGame(value)
    console.log(value)
    sportsData.forEach(data => {
      if (data.name === value) setSelectedSportId(data.id)
    })
  }

  useEffect(() => {
    if (searchKey) {
      const newFriends = allFriends.filter(friend => friend.fname.toLowerCase().toString().indexOf(searchKey.toLowerCase()) > -1 || friend.lname.toLowerCase().toString().indexOf(searchKey.toLowerCase()) > -1)
      setShowFriends(newFriends)
    } else {
      setShowFriends(allFriends)
    }
  }, [searchKey])

  return (
    <>
      <Dialog.Title as='header' className='relative'>
        <h2 className='mx-16 text-center text-2xl font-bold'>Create Team</h2>
        <DialogCrossButton onClick={onClose} />
      </Dialog.Title>

      <section className='desk-dialog:w-[43.5rem]'>
        <div className='mb-2 flex items-center gap-x-5'>
          <UploadAvatar profilePicPath={profilePicPath} onClick={() => document.getElementById("avatarFileInput")?.click()} />
          <h2 className='text-lg font-medium'>Upload team avatar</h2>
          <input style={{opacity: "0"}} onChange={saveProfilePic} type="file" name="file" accept="image/png, image/gif, image/jpeg" id="avatarFileInput" className="input-file" />
        </div>
        {
          teamAvatarError && <div className='mb-6' style={{color: "red"}}>Please upload avatar</div>
        }

        {/* Row */}
        <div className='mt-5 flex flex-wrap gap-5'>
          <InputComponent label='Team name' onChange={setTeamName} placeholder='a suitable name for your team' type='text' style='min-w-full' showError={teamNameError} />
          {/* <div className='app-textbox min-w-full sm:min-w-[24rem]'>
            <label>Team name</label>
            <div className='app-textbox-area'>
              <input onChange={(e) => setTeamName(e.target.value)} placeholder='a suitable name for your team' />
            </div>
          </div> */}
        </div>

        {/* Row */}
        <div className='mt-5 flex flex-wrap gap-5'>
          <div className='min-w-[12rem] flex flex-1 flex-col'>
            <ListBox
              label='Game Type'
              placeholder='Sports'
              selected={selectedGame}
              onChangeValue={onSelectSportType}
              data={
                sportsData.map((sport) => {
                    return sport.name;
                })
              }
            />
            {
              gameTypeError && <div className='mt-2' style={{color: "red"}}>Please select type</div>
            }
          </div>
          <div className='min-w-[12rem] flex flex-1 flex-col'>
            <ListBox
              label='Gender'
              placeholder='Select'
              selected={teamGender}
              onChangeValue={setTeamGender}
              data={["Male", "Female", "Mixed"]}
            />
            {
              genderError && <div className='mt-2' style={{color: "red"}}>Please select gender</div>
            }
          </div>
        </div>

        <div className='mt-5 mb-2'>
          <label className='mb-3 block text-lg font-medium'>Team banner</label>
          <UploadBanner bannerPicPath={bannerPicPath} onClick={() => document.getElementById("bannerFileInput")?.click()} />
          <input style={{display: "none"}} onChange={saveBannerPic} type="file" name="file" accept="image/png, image/gif, image/jpeg" id="bannerFileInput" className="input-file" />
        </div>
        {
          teamBannerError && <div style={{color: "red"}}>Please upload banner</div>
        }
        {/* Row */}
        <div className='mt-5 flex flex-wrap gap-5'>
          <div className='app-textbox min-w-full sm:min-w-[24rem]'>
            <label>Description</label>
            <div className='app-textbox-area'>
              <textarea onChange={(e) => setTeamDescription(e.target.value)} placeholder='Enter any additional description here' />
            </div>
          </div>
        </div>

        <label className='app-checkbox mt-5'>
          <input type='checkbox' />
          Private team?
          <span className='text-sm text-grey-classic'>
            (If turned on, this team will not be listed in explore teams)
          </span>
        </label>

        <div className='mt-5 flex flex-wrap gap-5'>
          <div className='app-textbox min-w-full sm:min-w-[24rem]'>
            <label>Invite friends</label>
            <div className='app-textbox-area'>
              <input size={1} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Search by name' />
            </div>
          </div>
        </div>

        <label className='app-checkbox mt-5'>
          <input checked={showFriends.length === members.length} onChange={event => onSelectAllMembers(event.target.checked)} type='checkbox' />
          Add all friends
        </label>

        <div className='mt-6 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2'>
          {
            showFriends.map((friend, index) => 
              <InvitationRow key={index} info={friend} onSelectMember={onSelectMember} checked={members.indexOf(friend._id) > -1} /> 
            )
          }
        </div>
      </section>
      
      <footer className='mt-20 flex justify-center gap-x-7'>
        <button
          onClick={onClose}
          className='relative flex items-center rounded-half bg-grey-high px-20 py-3 text-dim-white hover:bg-blue-high/10'
        >
          Cancel
        </button>
        <button
          onClick={createNewTeam}
          className='relative flex items-center rounded-half bg-blue-high px-14 py-3 text-dim-black hover:bg-blue-high/80 disabled:bg-blue-high/20'
        >
          Create Team
        </button>
      </footer>
    </>
  );
}

interface ConfirmationProp {
  onClose: () => void;
}
function Confirmation({ onClose }: ConfirmationProp) {
  return (
    <>
      <Dialog.Title as='header' className='relative'>
        {/* <h2 className='mx-16 text-center text-2xl font-bold'></h2> */}
        <DialogCrossButton onClick={onClose} />
        <div className='flex flex-col items-center'>
          <img src={ConfirmationTick} />
          <p className='mt-2 font-medium text-dim-white'>
            Team has been Created
          </p>
          <h1 className='mx-24 mt-5 text-center text-title font-bold'>
            League of Champions
          </h1>
        </div>

        <div className='mt-7 grid grid-cols-[auto_1fr] grid-rows-[repeat(4,auto)]'>
          <p className='mb-4 text-grey-grain'>Sport</p>
          <p className='font-bold'>Soccer</p>
          <p className='mb-4 text-grey-grain'>Gender</p>
          <p className='font-bold'>Male</p>

          <hr className='col-span-full border border-outline-2' />
          <p className='my-4 mr-12 self-center text-grey-grain'>Members</p>
          <div className='flex items-center self-center'>
            <img
              className='box-content h-5.5 w-5.5 rounded-full border-4 border-grey-low'
              src={Member1}
            />
            <img
              className='-ml-2.5 box-content h-5.5 w-5.5 rounded-full border-4 border-grey-low'
              src={Member2}
            />
            <img
              className='-ml-2.5 box-content h-5.5 w-5.5 rounded-full border-4 border-grey-low'
              src={Member3}
            />
            <img
              className='-ml-2.5 box-content h-5.5 w-5.5 rounded-full border-4 border-grey-low'
              src={Member3}
            />

            <p className='ml-3 text-fine'>
              <span className='text-grey-grain'>+ </span>
              <span>32 others</span>
            </p>
          </div>

          <hr className='col-span-full border border-outline-2' />
        </div>
      </Dialog.Title>

      <footer className='mt-9 flex justify-center gap-x-7'>
        <button
          onClick={onClose}
          className='relative flex items-center rounded-half bg-blue-high px-14 py-3 text-dim-black hover:bg-blue-high/80'
        >
          Continue
        </button>
      </footer>
    </>
  );
}

export function TeamCreator({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState(false);

  children = React.Children.only(children);
  const handleElement =
    children &&
    React.cloneElement(children as any, {
      onClick: () => setIsOpen(true)
    });

  return (
    <>
      {handleElement}
      <Transition
        afterLeave={() => {
          setConfirmation(false);
        }}
        show={isOpen}
        as={React.Fragment}
      >
        <Dialog onClose={() => {}}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogSheet>
              {!confirmation ? (
                <TeamForm
                  onCreate={() => setConfirmation(true)}
                  onClose={() => setIsOpen(false)}
                />
              ) : (
                <Confirmation onClose={() => setIsOpen(false)} />
              )}
            </DialogSheet>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
