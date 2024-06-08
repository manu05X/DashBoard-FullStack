import React from "react";
import { Dialog, Transition } from "@headlessui/react";

import { DialogCrossButton } from "components/DialogCrossButton";
import type { EventType, DialogContentProps } from "./common";
import { EventForm } from "./EventForm";

import { EvTeam } from "components/adaptive-icons/events/EvTeam.tsx";
import { EvNetwork } from "components/adaptive-icons/events/EvNetwork.tsx";
import { EvPickup } from "components/adaptive-icons/events/EvPickup.tsx";
import { EvTraining } from "components/adaptive-icons/events/EvTraining.tsx";
import { ThinArrow } from "components/adaptive-icons/ThinArrow";
import { DialogSheet } from "components/DialogSheet";

interface SelectEventTypeProps {
  selectedType: EventType | null;
  setSelectedType: (x: EventType | null) => void;
  onProceed: () => void;
}

function SelectEventType({
  selectedType,
  setSelectedType,
  ...props
}: DialogContentProps & SelectEventTypeProps) {
  const applyActiveState = React.useCallback(
    (target: string) => {
      return selectedType === target;
    },
    [selectedType]
  );

  return (
    <>
      <Dialog.Title as='header' className='relative'>
        <h2 className='mx-16 text-center text-2xl font-bold'>Create Events</h2>
        <DialogCrossButton onClick={props.onClose} />
      </Dialog.Title>

      <p className='mt-12 text-lg font-medium'>
        Select the type of event you want to create
      </p>
      <div className='mt-5 grid grid-cols-2 gap-4 desk-dialog:grid-cols-4'>
        <button
          onClick={() => setSelectedType("team")}
          data-app-active={applyActiveState("team")}
          className='ev-creator-type-select'
        >
          <EvTeam />
          <p>Team Event</p>
        </button>
        <button
          onClick={() => setSelectedType("network")}
          data-app-active={applyActiveState("network")}
          className='ev-creator-type-select'
        >
          <EvNetwork />
          <p>Network Event</p>
        </button>
        <button
          onClick={() => setSelectedType("pickup")}
          data-app-active={applyActiveState("pickup")}
          className='ev-creator-type-select'
        >
          <EvPickup />
          <p>Pickup</p>
        </button>
        <button
          onClick={() => setSelectedType("training")}
          data-app-active={applyActiveState("training")}
          className='ev-creator-type-select'
        >
          <EvTraining />
          <p>Training</p>
        </button>
      </div>

      <footer className='mt-48 flex gap-x-7 sm:justify-center desk-dialog:mt-20'>
        <button
          onClick={props.onClose}
          className='relative flex flex-1 items-center justify-center rounded-half bg-grey-high py-3 text-dim-white hover:bg-blue-high/10 sm:flex-initial sm:px-20'
        >
          <ThinArrow className='absolute left-0 ml-6 rotate-180' />
          Cancel
        </button>
        <button
          disabled={selectedType === null}
          onClick={props.onProceed}
          className='relative flex flex-1 items-center justify-center rounded-half bg-blue-high py-3 text-dim-black hover:bg-blue-high/80 disabled:bg-blue-high/20 sm:flex-initial sm:px-20'
        >
          Next
          <ThinArrow className='absolute right-0 mr-6' />
        </button>
      </footer>
    </>
  );
}

export function EventCreator({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<EventType | null>(
    null
  );
  const [awaitingSelection, setAwaitingSelection] = React.useState(true);

  children = React.Children.only(children);
  const handleElement =
    children &&
    React.cloneElement(children as any, {
      onClick: () => setIsOpen(true)
    });

  let content: React.ReactNode;
  if (awaitingSelection || selectedType === null) {
    content = (
      <SelectEventType
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onClose={() => setIsOpen(false)}
        onProceed={() => {
          if (selectedType !== null)
            //
            setAwaitingSelection(false);
        }}
      />
    );
  } else {
    content = (
      <EventForm
        onClose={() => setIsOpen(false)}
        type={selectedType}
        onAfterConfirm={() => setIsOpen(false)}
      />
    );
  }

  return (
    <>
      {handleElement}
      <Transition
        afterLeave={() => {
          setSelectedType(null);
          setAwaitingSelection(true);
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
            <DialogSheet>{content}</DialogSheet>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
