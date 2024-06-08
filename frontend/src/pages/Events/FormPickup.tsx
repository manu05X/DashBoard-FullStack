import { useState, useEffect } from "react";

import { ListBox } from "components/ListBox";
import { InvitationRow } from "components/InvitationRow";

import IconDate from "assets/input-date.svg";
import IconTime from "assets/input-time.svg";
import IconLocation from "assets/event-location.svg";

import InputComponent from "components/InputComponent";
import CalenderComponent from "components/CalendarComponent";
import { TimePicker } from "components/TimePicker";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { LocationList } from "components/LocationList";

export function FormPickup(props: any) {
  const { setEventInfo, gameTypeError, teamError, eventNameError, dateError, startTimeError, endTimeError, locationError, costError, numPlayersError,
    setGameTypeError, setEventNameError, setDateError, setStartTimeError, setEndTimeError, setLocationError, setCostError, setNumPlayersError } = props;
  const [allFriends, setAllFriends] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [description, setDescription] = useState("");
  const [registerPlaymate, setRegisterPlaymate] = useState(false);
  const [numPlayers, setNumPlayers] = useState("");
  const [cost, setCost] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState("")
  const [selectedTeamId, setSelectedTeamId] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  const [locationList, setLocationList] = useState([]);
  const [showLocationList, setShowLocationList] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [selectedGame, setSelectedGame] = useState(null)

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: "",
  });

  const onChangeLocation = (key: string) => {
    setSearchKey(key)
    setEventLocation(key)
    getPlacePredictions({input: key})
  }

  useEffect(() => {
    setShowLocationList(true)
    setLocationList(placePredictions)
  }, [searchKey])

  useEffect(() => {
    fetch("http://127.0.0.1:7001/getFriends", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "  *",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setAllFriends(data.data);
      
      if (data.data == "token expired") {
        window.localStorage.clear();
        window.location.href = "./login";
      }
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
        setSportsData(data.data);
      }
    );
  }, []);

  const onSelectMember = (selected: boolean, userId: string) => {
    let newMembers
    if (selected) {
      newMembers = [...members, userId];
    } else {
      newMembers = members.filter(member => member !== userId);
    }

    setMembers(newMembers);
  }

  const onSelectAllMembers = (selected: boolean) => {
    if (selected) {
      const newMembers = allFriends.map(friend => friend._id)
      setMembers(newMembers)
    } else {
      setMembers([])
    }
  }

  const onSelectSportType = (value: string) => {
    setSelectedGame(value)
    sportsData.forEach(data => {
      if (data.name === value) setSelectedSportId(data.id)
    })
  }

  const onCheckEmpty = (value: string) => {
    if (!value) setLocationError(true)
    else setLocationError(false)
  }

  useEffect(() => {
    if (selectedSportId) setGameTypeError(false)
    if (date) setDateError(false)
    if (startTime) setStartTimeError(false)
    if (endTime) setEndTimeError(false)
    if (location) setLocationError(false)
    if (cost) setCostError(false)
    if (eventName) setEventNameError(false)
    if (numPlayers) setNumPlayersError(false)

    setEventInfo({
      name: eventName,
      description,
      location: eventLocation,
      date,
      startTime,
      endTime,
      sportId: selectedSportId,
      repeat: recurringEvent,
      members,
      numPlayers,
      cost: cost,
    })
  }, [selectedSportId, eventName, date, startTime, endTime, eventLocation, recurringEvent, numPlayers, cost, description, registerPlaymate, members]);


  return (
    <>

      {/* Row */}
      <ListBox
        className='w-full'
        label='Game Type'
        placeholder='Sports'
        selected={selectedGame}
        onChangeValue={onSelectSportType}
        data={sportsData.map((sport) => {
          return sport.name;
        })}
      />
      {
        gameTypeError && <div className="mt-2" style={{color: "red"}}>Please select type</div>
      }

      {/* Row */}
      <div className='mt-5 flex flex-wrap gap-5'>
        <InputComponent label='Event name' onChange={setEventName} placeholder='Name of event' type='text' style='min-w-full' showError={eventNameError} />
      </div>

      {/* Row */}
      <div className='mt-5 flex flex-wrap gap-5'>
        <div className='min-w-full sm:min-w-[12rem] flex-1 flex flex-col relative'>
          <div className="app-textbox">
            <label>Date</label>
            <div className='app-textbox-area'>
              <input 
                onFocus={() => setShowCalendar(true)}
                value={date}
                size={1} 
                placeholder='dd/mm/yyyy' />
              <img className='mr-2 w-6' src={IconDate} />
            </div>
          </div>
          {
            showCalendar && 
              <div className="absolute calendar z-10 calendar-outline">
                <CalenderComponent setSelectedDate={setDate} outSideClickFunc={() => setShowCalendar(false)} />
              </div>
          }
          {
            dateError && <div className="mt-2" style={{color: "red"}}>Please fill out field</div>
          }
        </div>
        <div className=' min-w-full sm:min-w-[12rem] flex-1 flex flex-col relative'>
          <div className="app-textbox">
            <label>Start time</label>
            <div className='app-textbox-area'>
              <input
                onFocus={() => setShowStartTimePicker(true)}
                value={startTime} 
                size={1} 
                placeholder='00:00' />
              <img className='mr-2 w-6' src={IconTime} />
            </div>
          </div>
          {
            showStartTimePicker && 
              <div className="absolute time-picker z-10 calendar-outline">
                <TimePicker setSelectedTime={setStartTime} outSideClickFunc={() => setShowStartTimePicker(false)} />
              </div>
          }
          {
            startTimeError && <div className="mt-2" style={{color: "red"}}>Please fill out field</div>
          }
        </div>
        <div className=' min-w-full sm:min-w-[12rem] flex-1 flex flex-col relative'>
          <div className="app-textbox">
            <label>End time</label>
            <div className='app-textbox-area'>
              <input 
                onFocus={() => setShowEndTimePicker(true)}
                value={endTime} 
                size={1} 
                placeholder='00:00' />
              <img className='mr-2 w-6' src={IconTime} />
            </div>
          </div>
          {
            showEndTimePicker && 
              <div className="absolute time-picker z-10 calendar-outline">
                <TimePicker setSelectedTime={setEndTime} outSideClickFunc={() => setShowEndTimePicker(false)} startTime={startTime} />
              </div>
          }
          {
            endTimeError && <div className="mt-2" style={{color: "red"}}>Please fill out field</div>
          }
        </div>
      </div>

      <div className='mt-5 flex flex-col relative'>
        <div className={`app-textbox settings min-w-full sm:min-w-[24rem]`}>
          <label>Event location</label>
          <div className='app-textbox-area'>
            <img className='ml-2 w-6' src={IconLocation} />
            <input value={eventLocation} onChange={(e) => onChangeLocation(e.target.value)} onBlur={(e) => onCheckEmpty(e.target.value)} placeholder='Enter event location' />
          </div>
          {
            locationError
              ? <div className="empty-field-error">Please fill out field</div>
              : <div style={{height: "24px"}}></div>
          }
        </div>
        {
          locationList.length > 0 && showLocationList && <LocationList setEventLocation={setEventLocation} outSideClickFunc={() => setShowLocationList(false)} list={locationList} />
        }
      </div>

      <div className='mt-5 flex flex-wrap gap-5'>
        <div className='app-textbox min-w-full sm:min-w-[24rem]'>
          <label>Description</label>
          <div className='app-textbox-area'>
            <textarea onChange={(event) => setDescription(event.target.value)} placeholder='Enter any addition description here' />
          </div>
        </div>
      </div>

      <label className='app-checkbox mt-5'>
        <input onChange={(event) => setRegisterPlaymate(event.target.checked)} type='checkbox' />
        Allow friends to invite other friends?
      </label>

      <hr className='my-6 border-outline-2' />

      <div className='mt-5 flex flex-col'>
        <InputComponent 
          label='Number of players' 
          onChange={setNumPlayers} 
          type='text' 
          style='min-w-full sm:min-w-[24rem]' 
          showError={numPlayersError} />
      </div>

      <div className='mt-5 flex flex-col'>
        <InputComponent 
          label='Estimated cost of event' 
          onChange={setCost} 
          prefix={<span className='ml-2 text-grey-classic'>$</span>} 
          type='text' 
          style='min-w-full sm:min-w-[24rem]' 
          showError={costError}
          description="This will be evenly splitted among the players" />
      </div>

      <div className='mt-5 flex flex-wrap gap-5'>
        <div className='app-textbox min-w-full sm:min-w-[24rem]'>
          <label>Invite members</label>
          <div className='app-textbox-area'>
            <input size={1} placeholder='Search by name' />
          </div>
        </div>
      </div>

      <label className='app-checkbox mt-5'>
        <input checked={allFriends.length === members.length} onChange={event => onSelectAllMembers(event.target.checked)} type='checkbox' />
        Add all friends
      </label>

      <div className='mt-6 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2'>
        {
          allFriends.map((friend, index) => 
          <InvitationRow key={index} info={friend} onSelectMember={onSelectMember} checked={members.indexOf(friend._id) > -1} /> 
          )
        }
      </div>
    </>
  );
}
