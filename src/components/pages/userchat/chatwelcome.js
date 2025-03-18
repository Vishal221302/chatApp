import React from 'react'
import ChatIcon from "@mui/icons-material/Chat";

function Chatwelcome() {
  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ChatIcon style={{ fontSize: 70 }} />
        <h3>Chat for window </h3>
      </div>
    </div>
  );
}

export default Chatwelcome;
