import React from "react";
import { Tab, Menu, Transition } from "@headlessui/react";
import { commonTransitionProps } from "components/PanelTransition";
import MoreIcon from "assets/more.svg";
import { useNavigate } from "react-router-dom";
import SearchIcon from "assets/search.svg";
import { ListBox } from "components/ListBox";
import { FieldViewPanel } from "./FieldView";

import P01 from "assets/lineup/01.png";
import P02 from "assets/lineup/02.png";
import P03 from "assets/lineup/03.png";
import P04 from "assets/lineup/04.png";
import P05 from "assets/lineup/05.png";
import P06 from "assets/lineup/06.png";
import P07 from "assets/lineup/07.png";
import P08 from "assets/lineup/08.png";
import P09 from "assets/lineup/09.png";
import P10 from "assets/lineup/10.png";
import P11 from "assets/lineup/11.png";
import P12 from "assets/lineup/12.png";
import { useMenu } from "utils";

export function MembersAndLineup({members} : any) {
  return (
    <section className='desktop:min-w-[25rem] desktop:max-w-[25rem] relative'>
      <Tab.Group manual defaultIndex={0}>
        <Tab.List className='mb-2.5 flex gap-x-2'>
          <Tab className='app-tab slim flex-1 whitespace-nowrap'>Members</Tab>
          <Tab className='app-tab slim flex-1 whitespace-nowrap'>Lineup</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Members members={members} />
          </Tab.Panel>
          {/* Wrapper Panel abstracted into it's own component for some preloading logic */}
          <FieldViewPanel />
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}

function Members({members} : any) {
  return (
    <div className='rounded-half bg-grey-low px-5 py-5'>
      <header className='mb-7 flex flex-wrap items-center gap-x-4'>
        <ListBox
          initValue='All'
          placeholder=' '
          onChangeValue={() => {}}
          className='tranparent min-w-[3rem]'
          data={["All", "1", "2", "3"]}
        />
        <div className='flex min-w-0 flex-[2.5] overflow-hidden rounded-half border border-grey-high'>
          <img className='mx-4 my-3 w-6' src={SearchIcon} />
          <input
            className='flex-1 bg-transparent text-white'
            placeholder='Search for members'
            size={1}
          />
        </div>
      </header>

      {
        members.map((member: any) => {
          if(member.role == "Captain") {
            return(
              <Row
              memberPictureUrl={P02}
              number={4}
              name={member.fname + " " + member.lname}
              tag={
                <>
                  <span className='ml-2.5 rounded-half bg-blue-high px-1.5 py-0.5 text-[0.8725rem] text-grey-high'>
                    Captain
                  </span>
                </>
              }
            />
            )
          }
          else if(member.role == "Admin") {
            return(
              <Row
              memberPictureUrl={member.profilePic}
              number={1}
              name={member.fname + " " + member.lname}
              tag={
                <>
                  <span className='ml-2.5 rounded-half bg-yellow px-1.5 py-0.5 text-[0.8725rem] text-grey-high'>
                    Admin
                  </span>
                </>
              }
            />
            )
          }
          else {
            return(
              <Row memberPictureUrl={P03} number={8} name={member.fname + " " + member.lname} />
            )
          }
        })

      }

      {/*<Row
        memberPictureUrl={P01}
        number={1}
        name='Andrew Chapman'
        tag={
          <>
            <span className='ml-2.5 rounded-half bg-yellow px-1.5 py-0.5 text-[0.8725rem] text-grey-high'>
              Admin
            </span>
          </>
        }
      />
      <Row
        memberPictureUrl={P02}
        number={4}
        name='Kaden Fane'
        tag={
          <>
            <span className='ml-2.5 rounded-half bg-blue-high px-1.5 py-0.5 text-[0.8725rem] text-grey-high'>
              C
            </span>
          </>
        }
      />
      <Row memberPictureUrl={P03} number={8} name='David Goodman' />
      <Row memberPictureUrl={P04} number={9} name='Edward Evans' />
      <Row memberPictureUrl={P05} number={2} name='Jacques Babcock' />
      <Row memberPictureUrl={P06} number={5} name='Juan Attwood' />
      <Row memberPictureUrl={P07} number={12} name='Brendan Carroll' />
      <Row memberPictureUrl={P08} number={10} name='Carlos Martin' />
      <Row memberPictureUrl={P09} number={3} name='Anthony Cook' />
      <Row memberPictureUrl={P10} number={7} name='Arnold Aldridge' />
      <Row memberPictureUrl={P11} number={6} name='Samuel Moore' />
      <Row memberPictureUrl={P12} number={11} name='Colin Miller' />

      */}
    </div>
  );
}

interface RowProps {
  memberPictureUrl: string;
  number: number;
  name: string;
  tag?: React.ReactNode;
}
function Row(props: RowProps) {
  return (
    <div className='flex items-center py-2.5'>
      <div className='h-10 w-10 overflow-hidden rounded-full'>
        <img src={props.memberPictureUrl} />
      </div>
      <div className='ml-[0.63rem] flex h-[2.1875rem] w-[2.1875rem] items-center justify-center overflow-hidden rounded-full bg-grey-high'>
        {props.number}
      </div>
      <div className='ml-4 min-w-0 flex-1 self-stretch'>
        <h2 className='font-medium leading-tight'>
          {props.name}
          {props.tag}
        </h2>
        <p className='text-sm text-grey-classic'>RB / LB</p>
      </div>
      <ActionsMenu />
    </div>
  );
}

function ActionsMenu() {
  const navigate = useNavigate();

  const m = useMenu();

  return (
    <Menu>
      <Menu.Button
        ref={e => m.setReferenceElem(e as any)}
        className='rounded-half bg-grey-high px-2.5 py-1.5 hover:bg-blue-high/10'
      >
        <img className='w-1.5' src={MoreIcon} />
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
            onClick={() => navigate("/playmate")}
          >
            View profile
          </Menu.Item>
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Add friend
          </Menu.Item>
          <Menu.Item
            as='li'
            className='cursor-pointer rounded-half px-3 py-2 hover:bg-blue-high/10'
          >
            Remove
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
