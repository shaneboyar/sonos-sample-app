import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from 'recoil';
import "bootstrap/dist/css/bootstrap.css";

import "./css/login.css";
import "./css/dashboard.css";
import "./css/navbar.css"
import "./css/controlPage.css";
import "./css/players.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RouteComponents from "./App/Controllers/routingController";
import RouteGroup from "./App/Routing/routeGroup";
import RouteHousehold from "./App/Routing/routeHousehold";
import { socket, SocketContext } from "./App/WebSocket/socket";
import MuseEventHandler from "./App/WebSocket/MuseEventHandler";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path={"/*"} element={<RouteComponents />} />
          <Route path="/households/:id" element={<RouteHousehold />} />
          <Route path="/groups/:id" element={<RouteGroup />} />
        </Routes>
      </Router>
      <SocketContext.Provider value={socket}>
        <MuseEventHandler />
      </SocketContext.Provider>
    </RecoilRoot>
  </div>
);
