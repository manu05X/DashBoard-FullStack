import React from "react";
import cx from "classnames";
import { Menu } from "@headlessui/react";
import { usePopper } from "react-popper";

import { Transition } from "@headlessui/react";
import { commonTransitionProps } from "components/PanelTransition";

import EventMoreIcon from "assets/more.svg";
import { ClockIcon } from "components/adaptive-icons/PinMarker";
import { PinMarkerIcon } from "components/adaptive-icons/Clock";
import { useMenu } from "utils";

function ActionsMenu() {
  const m = useMenu();
  return (
    <Menu>
      <Menu.Button
        ref={e => m.setReferenceElem(e as any)}
        className='rounded-half bg-grey-high px-2.5 py-1.5 hover:bg-blue-high/10'
      >
        <img className='w-1.5' src={EventMoreIcon} />
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
            Block
          </Menu.Item>
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Report
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface EventCardProps {
  iconUrl: string;
  accentColorClass?: string;
}
export function EventCard(props: EventCardProps) {

  function convert24to12(time: string) {
    // time in Format: HH:MM

    let hour = parseInt(time.split(":")[0]);
    let minute = parseInt(time.split(":")[1]);

    let period = "am";

    if (hour > 12) {
      hour = (hour - 12).toString();
      period = "pm";
    }

    return [hour, minute, period];
  }

  function formatDateTime(dateTime : any) {
    const dateArr = dateTime.split("/")
    // Format to e.g Jan 05
    var date = new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`);
    var month = date.toLocaleString('default', { month: 'short' });
    var day = date.getDate();

    return month + " " + day;
  }

  return (
    <div className={cx("rounded-card bg-grey-low p-5", props.accentColorClass)}>
      <header className='flex items-center'>
        <img className='h-6 w-6' src={props.iconUrl} />
        <h2 className='ml-2 mr-1 min-w-0 flex-1 text-lg font-semibold'>
          {props.event.name}
        </h2>
        <ActionsMenu />
      </header>

      <div className='mt-8 border-b-2 border-outline-2 pb-3'>
        <p className='mb-1 flex items-center gap-x-2.5 text-fine text-grey-grain'>
          <ClockIcon className='flex-shrink-0 text-[--ev-card-accent-color]' />
          <span className='min-w-0 overflow-hidden text-ellipsis'>
          {formatDateTime(props.event.date)} | {convert24to12(props.event.startTime)[0] + ":" + convert24to12(props.event.startTime)[1] + " " + convert24to12(props.event.startTime)[2]}
          </span>
        </p>
        <p className='mb-1 flex items-center gap-x-2.5 text-fine text-dim-white'>
          <PinMarkerIcon className='flex-shrink-0 text-[--ev-card-accent-color]' />
          <span className='min-w-0 overflow-hidden text-ellipsis'>
            {props.event.location}
          </span>
        </p>
      </div>

      <footer className='ev-card-footer mt-4 flex flex-wrap gap-y-4'>
        {/* <div className='stat mr-6'>
          <h3>$ 500</h3>
          <p>Price pool</p>
        </div> */}
        <div className='stat'>
          <h3>15/20</h3>
          <p>Participant</p>
        </div>
        <s className='min-w-0 flex-1' />
        <button className='self-start rounded-half bg-grey-high px-4 py-2 text-sm hover:bg-blue-high/10'>
          View
        </button>
      </footer>
    </div>
  );
}
