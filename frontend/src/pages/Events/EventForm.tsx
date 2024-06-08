import type { EventType, DialogContentProps } from "./common";
import React, { useState } from "react";
import { DialogCrossButton } from "components/DialogCrossButton";
import { FormTeam, ConfirmationView as TeamConfirmationView } from "./FormTeam";
import { FormNetwork } from "./FormNetwork";
import { FormPickup } from "./FormPickup";
import { FormTraining, ConfirmationView as TrainingConfirmationView } from "./FormTraining";

import { Dialog } from "@headlessui/react";

import { ThinArrow } from "components/adaptive-icons/ThinArrow";

function renderTitle(type: EventType) {
  switch (type) {
    case "network":
      return "Network";
    case "team":
      return "Team";
    case "pickup":
      return "Pickup";
    case "training":
      return "Training";
  }
}

interface EventFormProps {
  type: EventType;
  onAfterConfirm: () => void;
}
export function EventForm({
  type,
  onAfterConfirm,
  ...props
}: DialogContentProps & EventFormProps) {
  const [confirmation, setConfirmation] = useState(false);
  const [eventInfo, setEventInfo] = useState({});
  const [gameTypeError, setGameTypeError] = useState(false)
  const [teamError, setTeamError] = useState(false)
  const [eventNameError, setEventNameError] = useState(false)
  const [dateError, setDateError] = useState(false)
  const [startTimeError, setStartTimeError] = useState(false)
  const [endTimeError, setEndTimeError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [costError, setCostError] = useState(false)
  const [numPlayersError, setNumPlayersError] = useState(false)

  let Comp = FormTeam;
  let Confirm = TeamConfirmationView;

  if (type === "network") {
    Comp = FormNetwork;
    Confirm = TeamConfirmationView;
  } else if (type === "pickup") {
    Comp = FormPickup;
    Confirm = TeamConfirmationView;
  } else if (type === "training") {
    Comp = FormTraining;
    Confirm = TrainingConfirmationView;
  }

  const onCreateEvent = () => {
    if (!eventInfo.sportId) setGameTypeError(true)
    if (!eventInfo.teamId) setTeamError(true)
    if (!eventInfo.name) setEventNameError(true)
    if (!eventInfo.date) setDateError(true)
    if (!eventInfo.startTime) setStartTimeError(true)
    if (!eventInfo.endTime) setEndTimeError(true)
    if (!eventInfo.location) setLocationError(true)
    if (!eventInfo.cost) setCostError(true)
    if (!eventInfo.numPlayers) setNumPlayersError(true)

    if (!eventInfo.sportId || !eventInfo.teamId || !eventInfo.name || !eventInfo.date || !eventInfo.startTime || !eventInfo.endTime || !eventInfo.location || !eventInfo.cost || !eventInfo.numPlayers) return
    fetch("http://127.0.0.1:7001/createEvent", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ...eventInfo,
        token: window.localStorage.getItem("token"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setConfirmation(true)
      if (data.data == "token expired") {
        window.localStorage.clear();
        window.location.href = "./login";
      }
    });

  }

  if (confirmation)
    return <Confirm eventInfo={eventInfo} onClose={onAfterConfirm} />;
  else
    return (
      <>
        <Dialog.Title as='header' className='relative mb-12'>
          <h2 className='text-center text-2xl font-bold desk-dialog:mx-16'>
            Create {renderTitle(type)} Event
          </h2>
          <DialogCrossButton onClick={props.onClose} />
        </Dialog.Title>
        <section className='desk-dialog:w-[43.5rem]'>
          <Comp 
            setEventInfo={setEventInfo}
            gameTypeError={gameTypeError}
            teamError={teamError}
            eventNameError={eventNameError}
            dateError={dateError}
            startTimeError={startTimeError}
            endTimeError={endTimeError}
            locationError={locationError}
            costError={costError}
            numPlayersError={numPlayersError}
            setGameTypeError={setGameTypeError}
            setTeamError={setTeamError}
            setEventNameError={setEventNameError}
            setDateError={setDateError}
            setStartTimeError={setStartTimeError}
            setEndTimeError={setEndTimeError}
            setLocationError={setLocationError}
            setCostError={setCostError}
            setNumPlayersError={setNumPlayersError}
          />
        </section>

        <footer className='mt-20 flex gap-x-7 sm:justify-center'>
          <button
            onClick={props.onClose}
            className='relative flex flex-1 items-center justify-center rounded-half bg-grey-high py-3 text-dim-white hover:bg-blue-high/10 sm:flex-initial sm:px-20'
          >
            <ThinArrow className='absolute left-0 ml-6 rotate-180' />
            Cancel
          </button>
          <button
            onClick={onCreateEvent}
            className='relative flex flex-1 items-center justify-center rounded-half bg-blue-high py-3 text-dim-black hover:bg-blue-high/80 sm:flex-initial sm:px-14'
          >
            Create Event
          </button>
        </footer>
      </>
    );
}
