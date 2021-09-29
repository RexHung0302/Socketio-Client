import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import styled from "styled-components";

import { StateContext } from "../index";

// Components
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CallIcon from "@material-ui/icons/Call";
import AddIcon from "@material-ui/icons/Add";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageIcon from "@material-ui/icons/Image";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";

import bgPng from "../../assets/images/bg.png";
import { MessageType } from "./ChatRoom";
import defaultUser from "../../assets/images/defaultUser.png";

const ContainerDivStyled = styled.div`
  display: grid;
  grid-template-rows: 60px auto 50px;
  height: 100vh;
  .header {
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: rgb(34, 42, 62);
    position: fixed;
    top: 0;
    display: grid;
    grid-template-columns: 80px 1fr 80px;
    z-index: 2;
    .title {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__icon {
      display: flex;
      align-items: center;
      &:last-child {
        justify-content: space-around;
      }
    }
  }
  .body {
    position: relative;
    height: calc(100vh - 110px);
    padding: 60px 0 50px 0;
    background-image: url(${bgPng});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow-y: auto;
    overscroll-behavior: none;
    .msgBox {
      &__ul {
        display: flex;
        padding: 10px;
        list-style: none;
        margin: 0;
      }
      &__profile {
        margin: 2px;
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 50%;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          display: inline-block;
          object-fit: cover;
        }
      }
      &__body {
        position: relative;
        padding-left: 5px;
        flex-shrink: 100;
        .name {
          font-size: 12px;
          color: #fff;
          margin-bottom: 4px;
        }
        .msg {
          background-color: #fff;
          border-radius: 10px;
          padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          position: relative;
          &:after {
            content: "";
            display: inline-block;
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 6.5px 12px 6.5px 0;
            border-color: transparent #fff transparent transparent;
            left: -10px;
            top: 12px;
          }
        }
      }
      &__date {
        font-size: 12px;
        display: flex;
        align-items: flex-end;
        padding-left: 5px;
        color: #fff;
        flex-shrink: 40;
      }
      &-user {
        ul {
          flex-direction: row-reverse;
        }
        .msgBox__body {
          padding-right: 5px;
          .name {
            text-align: right;
          }
          .msg {
            margin-right: 8px;
            background-color: rgb(134, 217, 123);
            &:after {
              border-width: 6.5px 0 6.5px 12px;
              border-color: transparent transparent transparent
                rgb(134, 217, 123);
              left: auto;
              right: -10px;
              top: 12px;
            }
          }
        }
      }
      &-announcement {
        text-align: center;
        padding: 5px;
        color: #fff;
        > div {
          padding: 10px;
          background-color: #00000030;
          display: inline-block;
          border-radius: 50px;
          font-size: 14px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #fff;
    z-index: 2;
    display: grid;
    grid-template-columns: 100px 1fr 40px;
    padding: 5px 0;
    &__icon {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #807777;
    }
    .input {
      border: none;
      background-color: #eeeeee;
      border-radius: 20px;
      padding: 0 10px;
      &:focus {
        outline: none;
      }
    }
  }
`;

const ChatRoom: React.FC = () => {
  const history = useHistory();
  const data = useContext(StateContext);
  const moment = require("moment");
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const loading = useState(false)[0];

  // 初始化
  useEffect(() => {
    if (!data?.state.id || !data?.state.name || !data?.state.selectChatRoom) {
      history.push("/lobby");
    }

    if (data?.state.ws && data?.state.selectChatRoom) {
      data.state.ws.emit("joinChatRoom", {
        id: data.state.id,
        name: data.state.name,
        roomId: data.state.selectChatRoom.id,
      });

      // 初始化事件
      initWebSocket();
    }

    return () => {
      disconnectChatRoomHandler();
    };
  }, []);

  // 初始化
  const initWebSocket = () => {
    if (data?.state.ws && data?.state.selectChatRoom) {
      // 該房間的事件監聽
      data.state.ws.on("roomMsgEmit", (dataInfo: MessageType) => {
        const { id, name, data, create_at } = dataInfo;
        setMessages((preVal) => [
          ...preVal,
          {
            id,
            name,
            data,
            create_at,
          },
        ]);
      });

      // 公告監聽
      data.state.ws.on("announcement", (dataInfo: MessageType) => {
        const { id, name, data, create_at } = dataInfo;
        setMessages((preVal) => [
          ...preVal,
          {
            id,
            name,
            data,
            create_at,
          },
        ]);
      });
    }
  };

  // 離開房間
  const disconnectChatRoomHandler = () => {
    if (data?.state.ws && data.state.selectChatRoom) {
      data.state.ws.emit("disconnectChatRoom", {
        id: data.state.id,
        name: data.state.name,
        roomId: data.state.selectChatRoom.id,
      });
    }
  };

  // 渲染對話
  const renderMessageHandler = (message: MessageType) => {
    switch (message.data.type) {
      case "text":
        return (
          <ul className="msgBox__ul">
            <li className="msgBox__profile">
              <img className="img" src={defaultUser} alt="User Profile" />
            </li>
            <li className="msgBox__body">
              <div className="name">{message.name}</div>
              <div className="msg">{message.data.text}</div>
            </li>
            <li className="msgBox__date">{message.create_at}</li>
          </ul>
        );
      case "image":
        return (
          <ul className="msgBox__ul">
            <li className="msgBox__profile">
              <img className="img" src={defaultUser} alt="User Profile" />
            </li>
            <li className="msgBox__body">
              <div className="name">{message.name}</div>
              <div className="msg">尚未支援圖片</div>
            </li>
            <li className="msgBox__date">{message.create_at}</li>
          </ul>
        );
      case "voice":
        return (
          <ul className="msgBox__ul">
            <li className="msgBox__profile">
              <img className="img" src={defaultUser} alt="User Profile" />
            </li>
            <li className="msgBox__body">
              <div className="name">{message.name}</div>
              <div className="msg">尚未支援圖片</div>
            </li>
            <li className="msgBox__date">{message.create_at}</li>
          </ul>
        );
      default:
        return <></>;
    }
  };

  return (
    <ContainerDivStyled>
      <header className="header">
        <span className="header__icon">
          <ArrowLeftIcon
            className="cursor-pointer"
            onClick={() => {
              history.push("/lobby");
            }}
          />
        </span>
        <span className="title">
          {data?.state.selectChatRoom
            ? data?.state.selectChatRoom.name
            : "unKnow Room Name"}
        </span>
        <div className="header__icon">
          <CallIcon className="cursor-pointer" />
          <ArrowDownIcon className="cursor-pointer" />
        </div>
      </header>
      <section className="body">
        {messages.map((message, idx) => {
          if (message.id === "announcement") {
            return (
              <div className="msgBox-announcement" key={message.id + idx}>
                <div>
                  {message.data.type === "text"
                    ? message.data.text
                    : "TODO: 公告現在只支援文字"}
                </div>
              </div>
            );
          } else {
            return (
              <div
                className={`${
                  message.id === data?.state.id
                    ? "msgBox-user"
                    : "msgBox-others"
                } msgBox`}
                key={idx}
              >
                {renderMessageHandler(message)}
              </div>
            );
          }
        })}
      </section>
      <section className="footer">
        <div className="footer__icon">
          <AddIcon className="cursor-pointer" />
          <PhotoCameraIcon className="cursor-pointer" />
          <ImageIcon className="cursor-pointer" />
        </div>
        <input
          type="text"
          className="input"
          placeholder="Aa"
          onChange={(e) => {
            setInputMsg((preVal) => (preVal = e.target.value));
          }}
          value={inputMsg}
        />
        <div className="footer__icon">
          {inputMsg ? (
            <SendIcon
              className="cursor-pointer"
              style={{
                color: "#6682ec",
              }}
              onClick={() => {
                if (!inputMsg || loading) return;

                if (data?.state.ws && data.state.selectChatRoom) {
                  data.state.ws.emit("clientSendMessage", {
                    id: data.state.id,
                    name: data.state.name,
                    data: {
                      type: "text",
                      text: inputMsg,
                    },
                    create_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    modeInfo: {
                      mode: "room",
                      roomId: data.state.selectChatRoom.id,
                    },
                  });
                }
                setInputMsg((preVal) => (preVal = ""));
              }}
            />
          ) : (
            <MicIcon className="cursor-pointer" />
          )}
        </div>
      </section>
    </ContainerDivStyled>
  );
};

export default ChatRoom;
