import React, { useContext } from "react";
import { useHistory } from "react-router";

import { StateContext } from "../index";

// Components
import {
  ListItem,
  ListItemIcon,
  List,
  Box,
  ListItemText,
  Divider,
} from "@mui/material";
import MessageIcon from "@material-ui/icons/Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";

// TS
interface Props {
  toggleDrawer: () => void;
  userNumber: number;
  openCreateModalHandler: () => void;
}

// 抽屜內容
const DrawerContent: React.FC<Props> = ({
  toggleDrawer,
  userNumber,
  openCreateModalHandler,
}: Props) => {
  const data = useContext(StateContext);
  const history = useHistory();

  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer()}
      onKeyDown={() => toggleDrawer()}
    >
      <List>
        <ListItem button key={0}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={`目前線上人數：${userNumber}`} />
        </ListItem>
        <ListItem button key={1}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={data?.state.name} />
            <span
              style={{
                fontSize: "12px",
              }}
            >{`id：${data?.state.id}`}</span>
          </div>
        </ListItem>
        <Divider />
        <ListItem button key={2}>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText
            primary="新增聊天室"
            onClick={() => openCreateModalHandler()}
          />
        </ListItem>
        <ListItem
          button
          key={3}
          onClick={() => {
            if (data?.state.ws) {
              data.state.ws.emit("disconnectLobby", {
                id: data.state.id,
              });
            }
            history.push("/");
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="離開聊天室" />
        </ListItem>
      </List>
    </Box>
  );
};

export default DrawerContent;
