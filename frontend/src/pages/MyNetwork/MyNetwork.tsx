import cx from "classnames";

import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";

import { PageView } from "layout/PageView";

import PlusIcon from "assets/plus.svg";
import SearchIcon from "assets/search.svg";

import Team3 from "assets/team-3.png";
import Member1 from "assets/member-1.png";
import Member2 from "assets/member-2.png";
import Member3 from "assets/member-3.png";

import Flag from "assets/flag.svg";

import "./styles.css";
import { useState } from "react";

interface NetworkCardProps {
  avatarUrl: string;
}
function NetworkCard(props: NetworkCardProps) {
  return (
    <div className='rounded-card bg-grey-low p-5'>
      <header className='grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-3.5 border-b-2 border-outline-2 pb-3'>
        <div className='row-span-2 h-14.5 w-14.5 place-self-center overflow-hidden rounded-full'>
          <img src={props.avatarUrl} className='object-cover object-bottom' />
        </div>
        <h2 className='col-[2] text-xl font-semibold'>
          Coast of England Network
        </h2>

        <div className='mt-2 flex items-center'>
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
            <span className='text-grey-grain'>58/</span>
            <span>100</span>
          </p>
        </div>
      </header>

      <footer className='tm-card-footer mt-4 flex flex-wrap gap-y-4'>
        <div className='stat'>
          <h3 className='flex items-center gap-x-1'>
            <img src={Flag} />
            England
          </h3>
          <p>Nationality</p>
        </div>
        <s className='min-w-0 flex-1' />
        <Link to='/network/index'>
          <button
            className={cx(
              "self-start rounded-half px-4 py-2 text-sm",
              "bg-grey-high text-white hover:bg-blue-high/10"
            )}
          >
            View
          </button>
        </Link>
      </footer>
    </div>
  );
}

function MyNetworkGrid() {
  return (
    <section className='mb-12 mt-7 grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2 desktop:grid-cols-4'>
      <NetworkCard avatarUrl={Team3} />
      <NetworkCard avatarUrl={Team3} />
    </section>
  );
}

export function MyNetwork() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <PageView
      title='My Network'
      actions={
        <>
          <button
            onClick={() => setSearchOpen(x => !x)}
            className='box-content rounded-md p-2 transition-colors hover:bg-blue-high/10'
          >
            <img src={SearchIcon} />
          </button>
          <button className='ml-4 rounded-half bg-blue-high p-2 transition-colors hover:bg-blue-high/80'>
            <img src={PlusIcon} />
          </button>
        </>
      }
    >
      {searchOpen && (
        <div className='mb-6 flex overflow-hidden rounded-card border border-grey-high mini-desktop:hidden'>
          <img className='mx-4 my-3 w-6' src={SearchIcon} />
          <input
            className='flex-1 bg-transparent text-white'
            placeholder='Search for networks'
            size={1}
          />
        </div>
      )}
      <Tab.Group manual defaultIndex={0}>
        <Tab.List className='flex gap-x-2 mini-desktop:items-center'>
          <Tab className='app-tab px-16'>My Network</Tab>

          <div className='hidden flex-1 items-center justify-end gap-x-5 mini-desktop:flex'>
            <div className='flex max-w-[24rem] flex-1 overflow-hidden rounded-card border border-grey-high'>
              <img className='mx-4 my-3 w-6' src={SearchIcon} />
              <input
                className='flex-1 bg-transparent text-white'
                placeholder='Search for networks'
                size={1}
              />
            </div>

            <button className='flex items-center gap-x-2 rounded-half bg-blue-high px-14 py-3 font-medium text-dim-black hover:bg-blue-high/80'>
              <img className='w-6' src={PlusIcon} />
              Create a Network
            </button>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <MyNetworkGrid />
            <p>&nbsp;</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </PageView>
  );
}
