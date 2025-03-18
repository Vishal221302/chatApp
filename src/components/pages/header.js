import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "./Header.css"; // Add custom styles here if needed
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useSIPProvider, RegisterStatus, useSessionCall } from "react-sipjs";
import MenuIcon from "@mui/icons-material/Menu";
import { SessionState } from "sip.js";


import Dialercall from "../call/Dialercall";

const Header = () => {

  const { connectAndRegister, registerStatus, sip, sessions } = useSIPProvider();
   const sessionIds = Object.keys(sessions);
   const sessionId =
     sessionIds.length > 0
       ? sessionIds[sessionIds.length - 1]
       : "No active sessions";

   const { session,hangup, decline } = useSessionCall(sessionId);
   
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const user = useSelector((state) => state.user.user);
   
     const [showPopover, setShowPopover] = useState(false);


  

  useEffect(() => {
    const pbx_session = JSON.parse(localStorage.getItem("pbx_session"));
    if (pbx_session) {
      connectAndRegister(pbx_session);
      return;
    }

    if (user) {
      connectAndRegister({
        username: user.extension,
        password: user.exte_pass,
      });
    }

  }, [user]);




    useEffect(() => {
      if (session && session.state === SessionState.Initial) {
        const activeSession = sessionIds.some((id) => {
          const sess = sessions[id];
          return sess.state === SessionState.Established;
        });

        if (activeSession) {
          decline();
        }
      }

      window.addEventListener("beforeprint", decline);

      return () => {
        window.removeEventListener("beforeprint", decline);
      };
    }, [session, sessionIds, sessions, decline]);

    const handleEndCall = () => {
      if (session && session.state === SessionState.Established) {
        session.terminate(); // Terminate the active session
      }
    };
  const handleLogout = () => {

    if (session && session.state === SessionState.Initial) {
      decline();
    } else if (session && session.state === SessionState.Established) {
      hangup();
    } 
    // Unregister the SIP session before logging out
    if (sip && sip.userAgent) {
      sip.userAgent.stop(); // Stops and unregisters the SIP user agent
    }
   
    dispatch(logout());
    localStorage.clear();
    window.location.replace("/login"); // Redirect to login page after logout
  };

  // Toggle function to handle popover visibility
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className="logout_button" onClick={handleLogout}>
          Logout
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" className="shadow-sm header_nave">
      <Container fluid>
        <Navbar.Brand className="fw-bold">
          <MenuIcon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <span className="navbar-text fw-bold">
              Welcome,{" "}
              {user && <span className="text-primary">{user.name}</span>}
            </span>
            <span
              style={{
                color:
                  registerStatus === RegisterStatus.REGISTERED
                    ? "green"
                    : "red",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              {registerStatus === RegisterStatus.REGISTERED
                ? "● Online"
                : "● Offline"}
            </span>
          </Nav>

          {/* Centering Dialercall using flex */}
          <Nav className="sjywsyu">
            <Dialercall />
          </Nav>

          <Nav>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              show={showPopover}
              rootClose
              onToggle={togglePopover}
            >
              <Nav.Link as="div">
                {user && (
                  <Avatar
                    className="user_images"
                    size={40}
                    round={true}
                    name={user.name}
                    onClick={togglePopover}
                  />
                )}
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
