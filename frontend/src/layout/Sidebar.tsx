import React from "react";
import cx from "classnames";
import { Link, Outlet, useMatch } from "react-router-dom";

import { IconComponent } from "./icons";
import * as icons from "./icons";

type SidelinkProps = {
  IconComp: IconComponent;
  text: string;
  linkUrl: string;
};
export const Sidelink = (props: SidelinkProps) => {
  const pageMatched = useMatch(props.linkUrl + "/*") !== null;

  return (
    <Link to={props.linkUrl} className={cx(pageMatched && "active")}>
      <props.IconComp active={pageMatched || false} />
      <span className='min-w-0'>{props.text}</span>
    </Link>
  );
};

export function Sidebar({userData}: any) {
  return (
    <div className='flex min-h-full flex-col'>
      <h1 className='text-2xl font-extrabold text-blue-high'>LOGO</h1>

      <nav className='sidelinks mt-11'>
        <Sidelink linkUrl='/' IconComp={icons.Dashboard} text='Dashboard' />
        <Sidelink
          linkUrl={`/playmate/index?id=${userData._id}`}
          IconComp={icons.Playmate}
          text='My Playmate'
        />
        <Sidelink linkUrl='/team' IconComp={icons.Team} text='My team' />
        <Sidelink linkUrl='/events' IconComp={icons.Events} text='Events' />
        <Sidelink
          linkUrl='/network'
          IconComp={icons.Network}
          text='My Network'
        />
      </nav>

      <nav className='sidelinks mt-auto'>
        <Sidelink linkUrl='#' IconComp={icons.Help} text='Help' />
        <Sidelink
          linkUrl='/settings'
          IconComp={icons.Settings}
          text='Settings'
        />
      </nav>
    </div>
  );
}
