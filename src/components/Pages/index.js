import React from "react";
import ChatHeader from "./ChatHeader";
import ChatPage from "./ChatPage";
import ChatUsers from "./ChatUsers";
import "./Chat.css";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <div className="bottomWrapper">
          {" "}
          <div className="twoComp">
            {" "}
            <div className="header">
              <ChatHeader />
            </div>{" "}
            <div className="chatUsers">
              <ChatUsers />
            </div>
          </div>
          <div className="chatPage">
            <ChatPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
