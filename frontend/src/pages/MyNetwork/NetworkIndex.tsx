import cx from "classnames";
import { PageView } from "layout/PageView";

import { MembersAndLineup } from "components/MembersAndLineup/MembersAndLineup";

import ProfileIMG from "assets/network-big-1.png";

import { ClockIcon } from "components/adaptive-icons/PinMarker";
import { PinMarkerIcon } from "components/adaptive-icons/Clock";
import RightArrow from "assets/right-arrow.svg";

import Team1 from "assets/team-1.png";
import Team2 from "assets/team-2.png";
import Team10 from "assets/team-10.png";
import Team11 from "assets/team-11.png";
import CopyIcon from "assets/copy.svg";
import { useNavigate } from "react-router-dom";

function TopBlock() {
  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-5 rounded-card bg-grey-low p-7'>
      <div className='order-0 h-25 w-25 shrink-0 overflow-hidden rounded-full'>
        <img src={ProfileIMG} />
      </div>
      <div className='order-0 grow basis-full sm:basis-0'>
        <h1 className='text-idxtitle font-bold leading-tight sm:whitespace-nowrap'>
          Coast of England Network
        </h1>
        <p className='text-fine text-grey-classic'>Opened: Jan 2023</p>
      </div>
      <div className='order-2 flex flex-wrap gap-x-6 gap-y-4 sm:order-1 sm:shrink-0 sm:flex-nowrap'>
        <div className='pm-stat'>
          <h3>3k</h3>
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
      <p className='order-1 basis-full text-fine text-dim-white sm:order-2'>
        <span className='hidden sm:inline'>
          Lorem ipsum dolor sit amet consectetur. Praesent amet etiam id sed
          nunc pellentesque tempus tristique id. Leo habitant elit nisl quam
          nulla mauris lobortis at pulvinar. Massa arcu volutpat in orci nisi in
          mattis. Volutpat semper quam ornare diam dolor quis. Quam vel congue
          nunc vitae aenean odio orci semper. Ut arcu arcu quis viverra lectus
          suspendisse. Fames proin dignissim diam sit.
        </span>
        <span className='inline sm:hidden'>
          Lorem ipsum dolor sit amet consectetur. Praesent amet etiam id sed
          nunc pellente Massa arcu volutpat in orci nisi in mattis.{" "}
          <button className='select-none font-medium underline transition-colors hover:text-blue-high/80'>
            See more
          </button>
        </span>
      </p>
    </div>
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

export function NetworkIndex() {
  const navigate = useNavigate();
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
          <span className='font-light text-grey-type'>My Network</span>&nbsp;
          <span>/ Network Page</span>
        </div>
      }
    >
      <div className='grid max-w-full grid-cols-1 gap-x-5 gap-y-10 desktop:grid-cols-[minmax(0,1fr)_auto]'>
        <div className=''>
          <TopBlock />
        </div>
        <div className='col-0 desktop:col-1 desktop:row-span-2'>
          <MembersAndLineup />
        </div>
        <div className=''>
          <Information />
        </div>
      </div>
    </PageView>
  );
}
