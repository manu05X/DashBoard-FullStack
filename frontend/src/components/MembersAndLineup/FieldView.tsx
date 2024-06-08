import { Tab } from "@headlessui/react";
import FieldBg from "assets/field.png";
import cx from "classnames";
import { ListBox } from "components/ListBox";
import { Helmet } from "react-helmet";
import P03 from "assets/lineup/03.png";
import { useEffect, useState } from "react";

/* Coordinates calculations are for demo purposes only */
const RADIUS = 17.5;

const calc_top = (x: number) => (100.0 * (RADIUS + x - 116)) / 784;
const calc_lft = (x: number) => (100.0 * (RADIUS + x - 292)) / 420;

export function FieldViewPanel() {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <Helmet>
        <link rel='preload' as='image' href={FieldBg} />
      </Helmet>
      <Tab.Panel>
        <EditActions editing={editing} setEditing={setEditing} />
        <FieldView editing={editing} />
      </Tab.Panel>
      {editing && <EditingPane />}
    </>
  );
}

function EditActions(p: {
  editing: boolean;
  setEditing: (_: boolean) => void;
}) {
  let { editing, setEditing } = p;
  return (
    <button
      onClick={() => setEditing(!editing)}
      className={cx(
        "mb-2.5 flex w-full items-center justify-center gap-x-3 rounded-half border border-outline-2 py-3 font-medium hover:bg-black/50",
        !editing && "text-grey-classic"
      )}
    >
      {editing ? "Update" : "Edit Lineup"}
      {!editing && <PenIcon />}
    </button>
  );
}

function EditingPane() {
  return (
    <div className='absolute right-0 top-0 z-[100] h-full w-full min-w-[17.5rem] rounded-half bg-grey-low px-5 py-3.5 desktop:right-full desktop:w-auto desktop:-translate-x-2.5 translate-y-28 desktop:translate-y-0'>
      <h2 className='whitespace-nowrap font-medium'>Registered members</h2>
      <p className='mt-2.5 leading-tight text-grey-classic'>
        (drag and drop players into the squad to edit)
      </p>

      <ListBox
        placeholder='Setup'
        className='minimal tranparent mb-7 mt-6'
        initValue='11 by 11'
        onChangeValue={() => {}}
        data={["11 by 11"]}
      />

      {[...Array(10)].map((_, i) => (
        <div key={i} className='flex items-center py-2.5'>
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <img src={P03} />
          </div>
          <div className='ml-4 min-w-0 flex-1 self-stretch'>
            <h2 className='font-medium leading-tight'>David Goodman</h2>
            <p className='text-sm text-grey-classic'>RB / LB</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FieldView(p: { editing: boolean }) {
  return (
    <section className='max-w-full'>
      <div className='relative'>
        <img className='w-full max-w-full' src={FieldBg} />
        <div className='absolute left-0 top-0 h-full w-full'>
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(134)}
            percentLeft={calc_lft(483)}
            inner='1'
            outer='Peter'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(243)}
            percentLeft={calc_lft(331)}
            inner='2'
            outer='Pat'
          />
          <PlayerDot
            percentTop={calc_top(243)}
            percentLeft={calc_lft(432)}
            inner='3'
            outer='Wade'
          />
          <PlayerDot
            percentTop={calc_top(243)}
            percentLeft={calc_lft(534)}
            inner='4'
            outer='Philip'
          />
          <PlayerDot
            percentTop={calc_top(243)}
            percentLeft={calc_lft(635)}
            inner='5'
            outer='Leslie'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(330)}
            percentLeft={calc_lft(379)}
            inner='8'
            outer='Darrell'
          />
          <PlayerDot
            percentTop={calc_top(330)}
            percentLeft={calc_lft(484)}
            inner='10'
            outer='Guy'
          />
          <PlayerDot
            percentTop={calc_top(330)}
            percentLeft={calc_lft(589)}
            inner='6'
            outer='Jacob'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(440)}
            percentLeft={calc_lft(379)}
            inner='11'
            outer='Calvin'
            skeleton={p.editing}
          />
          <PlayerDot
            percentTop={calc_top(440)}
            percentLeft={calc_lft(484)}
            inner='9'
            outer='Gregory'
            skeleton={p.editing}
          />
          <PlayerDot
            percentTop={calc_top(440)}
            percentLeft={calc_lft(589)}
            inner='7'
            outer='Jorge'
            skeleton={p.editing}
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(525)}
            percentLeft={calc_lft(483)}
            inner='14'
            outer='Francisco'
            skeleton={p.editing}
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(610)}
            percentLeft={calc_lft(331)}
            inner='7'
            outer='Dwight'
          />
          <PlayerDot
            percentTop={calc_top(610)}
            percentLeft={calc_lft(433)}
            inner='10'
            outer='Soham'
          />
          <PlayerDot
            percentTop={calc_top(610)}
            percentLeft={calc_lft(535)}
            inner='12'
            outer='Bruce'
          />
          <PlayerDot
            percentTop={calc_top(610)}
            percentLeft={calc_lft(637)}
            inner='11'
            outer='Randall'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(691)}
            percentLeft={calc_lft(433)}
            inner='8'
            outer='Dustin'
          />
          <PlayerDot
            percentTop={calc_top(691)}
            percentLeft={calc_lft(535)}
            inner='6'
            outer='Cameron'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(774)}
            percentLeft={calc_lft(392)}
            inner='11'
            outer='Mitchell'
          />
          <PlayerDot
            percentTop={calc_top(774)}
            percentLeft={calc_lft(483)}
            inner='9'
            outer='Harold'
          />
          <PlayerDot
            percentTop={calc_top(774)}
            percentLeft={calc_lft(574)}
            inner='7'
            outer='Lee'
          />
          {/* Row */}
          <PlayerDot
            percentTop={calc_top(840)}
            percentLeft={calc_lft(484)}
            inner='1'
            outer='Robert'
          />
        </div>
      </div>
    </section>
  );
}

function PlayerDot(p: {
  inner: string;
  percentLeft: number;
  percentTop: number;
  outer: string;
  skeleton?: boolean;
}) {
  let { skeleton } = p;
  return (
    <div
      style={{
        left: (p.percentLeft || 0).toString() + "%",
        top: (p.percentTop || 0).toString() + "%",
        width: `${(RADIUS * 200) / 420}%`,
        height: `${(RADIUS * 200) / 784}%`,

        minHeight: `${RADIUS * 2}px`,
        minWidth: `${RADIUS * 2}px`,
        transform: "translate(-50%, -50%)"
      }}
      className={cx(
        "absolute flex items-center justify-center rounded-full",
        skeleton ? "bg-grey-high" : "bg-grey-low"
      )}
    >
      {!skeleton && (
        <>
          <span className='select-none'>{p.inner}</span>
          <div className='absolute left-1/2 top-full -translate-x-1/2 text-sm font-medium'>
            {p.outer}
          </div>
        </>
      )}
    </div>
  );
}

function PenIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.7724 4.23901L11.8824 3.12901C12.0216 2.98966 12.187 2.87911 12.3691 2.80369C12.5511 2.72827 12.7462 2.68945 12.9432 2.68945C13.1403 2.68945 13.3354 2.72827 13.5174 2.80369C13.6994 2.87911 13.8648 2.98966 14.0041 3.12901L15.0646 4.18951C15.3458 4.4708 15.5038 4.85226 15.5038 5.25001C15.5038 5.64775 15.3458 6.02922 15.0646 6.31051L13.9546 7.42051M10.7724 4.23901L3.56035 11.4503C3.31134 11.6993 3.15788 12.028 3.12685 12.3788L2.94535 14.4338C2.9356 14.543 2.94993 14.6531 2.98733 14.7562C3.02473 14.8593 3.08429 14.9529 3.16181 15.0305C3.23933 15.1081 3.33292 15.1677 3.43599 15.2052C3.53906 15.2427 3.6491 15.2572 3.75835 15.2475L5.81335 15.066C6.16467 15.0353 6.49395 14.8818 6.74335 14.6325L13.9546 7.42051M10.7724 4.23901L13.9546 7.42051'
        stroke='#888888'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
