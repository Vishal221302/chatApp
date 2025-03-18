import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "./ChatMessage.css";
import Send from "../../../Assets/images/send.png";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import { sendmessage } from "../../../redux/chat/sendMessageAction";
import { seenmessage } from "../../../redux/chat/seenunseenmessageAction";
import { getmessage } from "../../../redux/chat/getMessageAction";
import Chatwelcome from "./chatwelcome";
import Modal from "react-bootstrap/Modal";
import UserDetails from "./userDetails";



const ChatMessage = (props) => {
  const { userdetails } = props;
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.sendMessage);
  const messageData = useSelector((state) => state.getMessages);
  const [selectedFile, setSelectedFile] = useState(null);
  const userid = JSON.parse(localStorage.getItem("user"));
  const userId = userdetails && userdetails.id;

  const [socket, setSocket] = useState(null);
  const [userStatus, setUserStatus] = useState({}); // State to track user status

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem("user"));

    if (!userid || !userid.id) {
      console.error("User ID is not available.");
      return;
    }

    const socketInstance = io("http://localhost:8000", {
      query: { userId: userid.id },
      withCredentials: true,
    });

    setSocket(socketInstance);

    // Listen for user status updates
    socketInstance.on("userStatus", (data) => {
      setUserStatus((prevStatus) => ({
        ...prevStatus,
        [data.userId]: data.status,
      }));
    });

    // Listen for receiving new messages

    socketInstance.on("receiveMessage", (message) => {
      console.log("Received message data:", message);
      dispatch(getmessage(userId));
    });
    // console.log(socketInstance.on);

    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getmessage(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userid || !userid.id) {
      console.error("User ID is not available.");
      return;
    }

    if (Array.isArray(messageData.message)) {
      messageData.message.forEach((message) => {
        if (message.status === false && message.receiver_id === userid.id) {
          dispatch(seenmessage(message.id)); // Dispatch the action to mark the message as seen
        }
      });
    }
  }, [messageData, dispatch, userid]); // Remove .id in dependency


   const handleFileChange = (e) => {
     setSelectedFile(e.target.files[0]);
   };
  const handleSendMessage = () => {
    // const messagedata = {
    //   sender_id: userid && userid.id,
    //   receiver_id: userdetails && userdetails.id,
    //   message: newMessage,
    //   media_files: selectedFile,
    // };

    var formData = new FormData();
    formData.append("sender_id", userid && userid.id);
    formData.append("receiver_id", userdetails && userdetails.id);
    formData.append("message", newMessage);
    formData.append("media_files", selectedFile);
    dispatch(sendmessage(formData));
    socket.emit("sendMessage", formData);
    console.log("formData", formData);
    setNewMessage("");
  };

  const formatTimestampToIST = () => {
    const date = new Date();
    const istOffset = 5 * 60 + 30;
    const istDate = new Date(date.getTime() + istOffset * 60 * 1000);
    let hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

 
  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  const renderFileMessage = (file) => {
    if (!file) return null;
    if (file.media_type === "image") {
      return (
        <img
          src={`http://localhost:8000/${file.media_url}`}
          style={{ width: "30%" }}
          alt="Uploaded"
          className="uploaded-image"
        />
      );
    } else if (file.media_type === "video") {
      return (
        <video
          controls
          src={`http://localhost:8000/${file.media_url}`}
          style={{ width: "30%" }}
          className="uploaded-video"
        ></video>
      );
    } else if (file.media_type === "audio") {
      return <audio controls src={`http://localhost:8000/${file.media_url}`} className="uploaded-audio"></audio>;
    } else {
      return (
        <div className="file-message">
          <p className="file-name">{file.media_url.name}</p>
          <a href={`http://localhost:8000/${file.media_url}`} download>
            Download
          </a>
        </div>
      );
    }
  };


  // console.log("messageData", messageData);

  return (
    <>
      {userdetails ? (
        <div className="chat-container">
          <div className="chat-header">
            <button className="back-button" onClick={handleShow}>
              <img
                src={`http://localhost:8000/${userdetails.profile_image}`}
                alt={userdetails.name}
                className="user-avatar"
              />
            </button>
            <div className="chat-header-info">
              <h4 className="chat-header-name">{userdetails.name}</h4>
              <p className="chat-header-status">
                {userStatus[userId] === "online" ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <ScrollToBottom className="messages-container">
            {Array.isArray(messageData.message) &&
              messageData.message.map((message) => (
                <div
                  key={message.id}
                  className={`chat-bubble ${
                    message.sender_id === Number(userdetails.id)
                      ? "incoming"
                      : message.sender_id === Number(userid.id)
                      ? "outgoing"
                      : ""
                  }`}
                >
                  {message.media_files && message.media_files.length > 0 ? (
                    message.media_files.map((file, index) => (
                      <div key={index}>
                        {renderFileMessage(file)}{" "}
                        {/* Pass each file (object) to the renderFileMessage function */}
                      </div>
                    ))
                  ) : (
                    <p className="message-text">{message.message}</p> // Render message text if no media files
                  )}
                  <span className="message-timestamp">
                    {formatTimestampToIST(message.timestamp)}
                  </span>
                </div>
              ))}
          </ScrollToBottom>

          <div className="message-input-container">
            <button className="upload-button" onClick={triggerFileInput}>
              <AttachFileIcon />
            </button>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*"
            />
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <img
              src={Send}
              className="send-button"
              onClick={handleSendMessage}
              alt="Send"
            />
          </div>
        </div>
      ) : (
        <Chatwelcome />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="profile_open">
          <UserDetails userdetails={userdetails} />
        </div>
      </Modal>
    </>
  );
};

export default ChatMessage;
