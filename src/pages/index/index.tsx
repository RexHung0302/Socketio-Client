import React, { createContext, useState } from "react";

import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { Socket } from "socket.io-client";
import routers from "../../routers/index";
import RouteWithSubRoutes from "../../routers/RouteWithSubRoutes";

// TS
interface StateType {
  name: string | null;
  id?: string;
  ws?: Socket;
  chatRoomInfo: chatRoomInfoType[] | [];
  selectChatRoom?: chatRoomInfoType;
  isLogout: boolean;
}

export type chatRoomInfoType = {
  id: string;
  name: string;
  desc: string;
};

export const StateContext = createContext<{
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
} | null>(null);

const Index: React.FC = () => {
  const [state, setState] = useState<StateType>({
    name: null,
    chatRoomInfo: [],
    isLogout: false,
  });
  return (
    <StateContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <Router basename="/Socketio-Client">
        <Switch>
          {routers.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    </StateContext.Provider>
  );
};

export default Index;
