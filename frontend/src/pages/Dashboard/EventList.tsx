import cx from "classnames";

import { Link } from "react-router-dom";

import EventOneIcon from "./icons/event-one.svg";
import EventTwoIcon from "./icons/event-two.svg";
import EventThreeIcon from "./icons/event-three.svg";
import { useEffect, useState } from "react";

interface EventProps {
  iconUrl: string;
  time: { clock: number; period: "am" | "pm" };
  accentColorClass: string;
}
function Event(props: EventProps) {
  let clock = props.time.clock;
  return (
    <div className='mb-3 flex items-center rounded-card bg-grey-low px-5 py-3.5 desktop:min-w-[24rem]'>
      <img className='mr-4 h-8 w-8' src={props.iconUrl} />

      <div className='mr-1 flex-grow'>
        <h3 className='font-semibold'>{props.name}</h3>
        <p className='max-w-[235px] overflow-hidden text-ellipsis text-fine text-[#D9D9D9]'>
          {props.location}
        </p>
      </div>

      <p
        className={cx(
          "row-span-2 rounded-card p-2 text-center text-xl font-semibold leading-tight text-black",
          props.accentColorClass
        )}
      >
        {clock <= 99 ? `0${clock}`.slice(-2) : clock}
        <br />
        <span className='uppercase'>{props.time.period}</span>
      </p>
    </div>
  );
}

export function EventList({events, date} : any) {
  const [selectedEvents, setSelectedEvents] = useState([]);
  function convert24to12(time: number) {
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

  useEffect(() => {
    let strDate = "";
    if (date.getDate() < 10) {
      strDate += `0${date.getDate()}/`
    } else {
      strDate += `${date.getDate()}/`
    }
    if (date.getMonth() < 9) {
      strDate += `0${date.getMonth() + 1}/`
    } else {
      strDate += `${date.getMonth() + 1}/`
    }
    strDate += `${date.getFullYear()}`
    const newSelectedEvents = events.filter(event => event.date === strDate)
    setSelectedEvents(newSelectedEvents)
  }, [date, events])

  return (
    <section className='mt-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-medium'>Events of the day</h3>
        <Link to='/events' className='text-blue-high'>
          View all events
        </Link>
      </div>


      {
        selectedEvents.map((event: any, index: number) => {
          return (
            <Event
              key={index}
              accentColorClass='bg-yellow'
              iconUrl={EventOneIcon}
              time={{ clock: convert24to12(event.startTime)[0] + ":" + convert24to12(event.startTime)[1], period: convert24to12(event.startTime)[2] }}
              name={event.name}
              location={event.location}
            />
          );
        }
        )
      }
      {/*<Event
        accentColorClass='bg-yellow'
        iconUrl={EventOneIcon}
        time={{ clock: 9, period: "am" }}
      />
      <Event
        accentColorClass='bg-pink'
        iconUrl={EventTwoIcon}
        time={{ clock: 9, period: "am" }}
      />
      <Event
        accentColorClass='bg-blue-high'
        iconUrl={EventThreeIcon}
        time={{ clock: 9, period: "am" }}
      />
      */}
    </section>
  );
}
