import App from "../App";
import Lobby from "../pages/Lobby";
import ChatRoom from "../pages/ChatRoom";

//TS
export type routeType = {
  path: string;
  component: any;
  exact?: boolean;
  routes?: routeType[];
};

const routers = [
  {
    path: "/",
    component: App,
    exact: true,
  },
  {
    path: "/lobby",
    component: Lobby,
    exact: true,
  },
  {
    path: "/chat-room/:id",
    component: ChatRoom,
    exact: true,
  },
];

export default routers;
