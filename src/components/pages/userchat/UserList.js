import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserList.css"; // Add custom styling in a separate CSS file
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "../../../redux/authAction";
import { fetchallUser } from "../../../redux/chat/userListAction";
import { unseenmessage } from "../../../redux/chat/seenunseenmessageAction";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Modal from "react-bootstrap/Modal";
import EditUser from "../userData.js/EditUser";



const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState('');
  const user = useSelector((state) => state.user.user);
  const unseenMessage = useSelector((state) => state.messgaeSeen.message);
  const isLoading = useSelector((state) => state.datalist.isLoading);
  const error = useSelector((state) => state.datalist.error);
  const userslist = useSelector((state) => state.datalist.data);

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

     useEffect(() => {
       dispatch(fetchallUser());
     }, [dispatch]);
  

  useEffect(() => {
    // Mock user data with image URLs
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        status: "Hey there! I am using WhatsApp.",
        lastMessage: "How are you?",
        lastActive: "Online",
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Available",
        lastMessage: "See you tomorrow!",
        lastActive: "09:30 AM",
        imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        id: 3,
        name: "Mike Johnson",
        status: "Busy",
        lastMessage: "Can we reschedule?",
        lastActive: "Yesterday",
        imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: 4,
        name: "Emily Davis",
        status: "At the gym.",
        lastMessage: "Let’s catch up soon!",
        lastActive: "08:15 AM",
        imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        id: 5,
        name: "Robert Brown",
        status: "Working from home.",
        lastMessage: "Call me when free.",
        lastActive: "09:00 AM",
        imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        id: 6,
        name: "Sophia Wilson",
        status: "Enjoying a vacation!",
        lastMessage: "I’ll be back next week.",
        lastActive: "Monday",
        imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      {
        id: 7,
        name: "David Lee",
        status: "In a meeting, talk later.",
        lastMessage: "Let’s discuss the project.",
        lastActive: "Yesterday",
        imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      },
    ];
    setUsers(mockUsers);
  }, []);

    
    const handleuserClick = (data) => {
        setUserDetails(data);
    }

  
      const handlelogout = () => {
        dispatch(logout());
        localStorage.clear();
        window.location.replace("/login");
      };
  props.userData(userDetails);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Button className="btn btn-primary" onClick={handlelogout}>Logout</Button>
      </Popover.Body>
    </Popover>
  );

  const Notification = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover Title</Popover.Header>
      <Popover.Body>This is the content inside the popover.</Popover.Body>
    </Popover>
  );

    return (
      <div className="tbnsjhy">
        <div className=" user-list-container user_header">
          <div className="ourprofile">
            <img
              src={userslist && user.profile_image}
              alt={user && user.name}
              className="user-avatar"
              onClick={handleShow}
            />
            <h5 className="user-name m-2">{user && user.name}</h5>
          </div>
          <div>
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={Notification}
            >
              <NotificationsActiveIcon
                style={{ marginRight: "2rem", cursor: "pointer" }}
              />
            </OverlayTrigger>

            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <MoreVertIcon style={{ cursor: "pointer" }} />
            </OverlayTrigger>
            {/* <MoreVertIcon onClick={handlelogout} /> */}
          </div>
        </div>
        <div className="user-list-container only-user-list">
          {Array.isArray(userslist && userslist.data) &&
            userslist.data.map((user) => (
              <div
                className="user-list-item"
                onClick={() => handleuserClick(user)}
                key={user.id}
              >
                <img
                  src={`https://chat-backend-s5z0.onrender.com/${user.profile_image}`}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-info">
                  <div className="user-header">
                    <h5 className="user-name">{user.name}</h5>
                    <span className="last-active">{user.lastActive}</span>
                  </div>
                  {/* <p className="user-status">{user.status}</p> */}
                  <p className="last-message">{user.lastMessage}</p>
                </div>
              </div>
            ))}
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          left
        >
          <div className="profile_open">
            <EditUser user={user} />
          </div>
        </Modal>
      </div>
    );
};

export default UserList;
