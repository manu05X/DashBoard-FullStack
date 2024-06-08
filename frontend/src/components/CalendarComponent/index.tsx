import cx from "classnames";
import { useEffect, useState, useRef } from "react";

import {
  format,
  isSameDay,
  addMonths,
  subMonths,
  addDays,
  setDate,
  previousMonday,
  isMonday,
  getDay,
  getDaysInMonth,
  isSameMonth
} from "date-fns";

import ArrowLeft from "../../pages/Dashboard/icons/month-arrow-left.svg";
import ArrowRight from "../../pages/Dashboard/icons/month-arrow-right.svg";
import "./styles.css"

function MonthSelector(p: {
  monthMask: Date;
  onBack: () => void;
  onForward: () => void;
}) {
  return (
    <div className='flex items-center justify-between'>
      <button
        onClick={p.onBack}
        className='flex h-7 w-7 items-center justify-center rounded-half bg-grey-high hover:bg-blue-high/10'
      >
        <img src={ArrowLeft} />
      </button>
      <span className='font-semibold'>{format(p.monthMask, "LLLL, yyyy")}</span>
      <button
        onClick={p.onForward}
        className='flex h-7 w-7 items-center justify-center rounded-half bg-grey-high hover:bg-blue-high/10'
      >
        <img src={ArrowRight} />
      </button>
    </div>
  );
}

function adjustWeekday(x: number) {
  return (x - 1 + 7) % 7;
}

function roundUpToMultiple(x: number, mult: number) {
  if (x % mult == 0) return x;

  return Math.ceil(x / mult) * mult;
}

function DayGrid(p: {
  monthMask: Date;
  selected: Date;
  setSelected: (_: Date) => void;
}) {
  let { monthMask } = p;

  let firstDayOfMonth = setDate(monthMask, 1);

  // Move the 1st day of month to the nearest previous Monday.
  let base = isMonday(firstDayOfMonth)
    ? firstDayOfMonth
    : previousMonday(firstDayOfMonth);

  let residueLeft = adjustWeekday(getDay(firstDayOfMonth));
  let monthCellCount = roundUpToMultiple(
    residueLeft + getDaysInMonth(monthMask),
    7
  );

  let cells = [];

  for (let i = 0; i < monthCellCount; ++i) {
    let current = addDays(base, i);

    let outside = !isSameMonth(current, monthMask);
    let selected = isSameDay(current, p.selected);

    cells.push(
      <button
        className={cx(
          "sm-cal-day-cell",
          outside && "disabled",
          selected && "active"
        )}
        disabled={outside}
        onClick={(e) => {e.preventDefault(); p.setSelected(current)}}
        key={i}
      >
        {format(current, "dd")}
      </button>
    );
  }

  return (
    <div className='sm-cal-day-grid mt-8'>
      <p className='sm-cal-day-name'>M</p>
      <p className='sm-cal-day-name'>T</p>
      <p className='sm-cal-day-name'>W</p>
      <p className='sm-cal-day-name'>T</p>
      <p className='sm-cal-day-name'>F</p>
      <p className='sm-cal-day-name'>S</p>
      <p className='sm-cal-day-name'>S</p>
      {cells}
    </div>
  );
}

const CalenderComponent = ({setSelectedDate, outSideClickFunc}: any) => {
  const [monthMask, setMonthMask] = useState(setDate(new Date(), 1));
  const [selected, setSelected] = useState(new Date());

  useEffect(() => {
    const date = new Date(selected)
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
    setSelectedDate(strDate);
  }, [selected])

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            outSideClickFunc(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className='rounded-card bg-grey-low p-6'>
      <MonthSelector
        onBack={() => setMonthMask(subMonths(monthMask, 1))}
        onForward={() => setMonthMask(addMonths(monthMask, 1))}
        monthMask={monthMask}
      />
      <DayGrid
        selected={selected}
        setSelected={setSelected}
        monthMask={monthMask}
      />
    </div>
  );
}

export default CalenderComponent