import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./layout/Layout";

import { Dashboard } from "pages/Dashboard/Dashboard";
import { Events } from "pages/Events/Events";
import { MyTeam } from "pages/MyTeam/MyTeam";
import { TeamIndex } from "pages/MyTeam/TeamIndex";
import { MyNetwork } from "pages/MyNetwork/MyNetwork";
import { NetworkIndex } from "pages/MyNetwork/NetworkIndex";
import { MyPlaymate } from "pages/MyPlaymate/MyPlaymate";
import { Settings } from "pages/Settings/Settings";
import { LoginRegister } from "pages/LoginRegister/LoginRegister";

import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/800.css";
import "./global.css";

const router = createBrowserRouter([
  {
    path: "",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Dashboard
      },
      {
        path: "/dashboard",
        Component: Dashboard
      },
      {
        path: "/playmate/index",
        Component: MyPlaymate
      },
      {
        path: "/team",
        Component: MyTeam
      },
      {
        path: "/team/index",
        Component: TeamIndex
      },
      {
        path: "/events",
        Component: Events
      },
      {
        path: "/network",
        Component: MyNetwork
      },
      {
        path: "/network/index",
        Component: NetworkIndex
      },
      {
        path: "/login",
        Component: LoginRegister
      },
      {
        path: "/settings",
        Component: Settings
      }
    ]
  }
]);

export function App() {
  React.useLayoutEffect(() => {
    let root = document.documentElement;
    const vh = Math.max(root.clientHeight || 0, window.innerHeight || 0);
    root.style.setProperty("--app-root-winh", `${vh}px`);
  }, []);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}
