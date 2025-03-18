import React from 'react';
import './userinfo.css'
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";

export default function Userinfo(props) {
    const {userdetails} = props
  return (
    <div>
      <div className="profiel_name">
        <img
          src={`http://localhost:8000/${userdetails.profile_image}`}
          alt={userdetails.name}
          className="useravatar"
        />
        <h5>{userdetails.name}</h5>
      </div>
      <div className="calling_">
        <div className="calling">
          <VideocamIcon style={{ fontSize: 25 }} /> Video
        </div>
        <div className="calling">
          <CallIcon style={{ fontSize: 25 }} />
          Voice
        </div>
      </div>
      <div className="user_desc">
        <p className="about_text">About</p>
        <p>{userdetails.about}</p>
      </div>
      <div>
        <p className="phone_text">Phone Number</p>
        <p>{userdetails.phone}</p>
      </div>
    </div>
  );
}
