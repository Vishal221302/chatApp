import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LoadingSinner from '../Spinner/LoadingSinner';
import { fetchUser } from '../../redux/userAction'; 
import { logout } from '../../redux/authAction';
import UserList from './userchat/UserList';
import ChatMessage from './userchat/chatmessage';
import './home.css'


function Home() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const [userdetails, setUserdetails] = useState("");


  
     useEffect(() => {
       dispatch(fetchUser());
     }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <LoadingSinner />
      </div>
    );
  }


     if (error) {
       return <div>Error: {error}</div>;
  }
  
  const handlelogout = () => {
        dispatch(logout());
    localStorage.clear();
    window.location.replace("/login");
  }

  const getuserData = (data) => {
    setUserdetails(data)
  }


 
  return (
    <div className="chat-sections">
      <div className="user_list">
        <UserList userData={getuserData} />
        <ChatMessage userdetails={userdetails} />
      </div>
      {/* <button onClick={handlelogout}>logout user</button> */}
    </div>
  );
}

export default Home
