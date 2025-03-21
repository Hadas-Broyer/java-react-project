import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
function UserProfile() {

  const navigate = useNavigate();
  const [user, setUser] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log("hh", user);
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("parsedUser", parsedUser);
      if (parsedUser && parsedUser) {
        console.log("11");
        setUser(parsedUser);
      }
    }

  }, []);

  return (
    <>
      <Navbar />
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>אם אתה בעל מקצוע ורוצה לעדכן:</div>
      <button onClick={() => navigate(`/LoginProfessional`)} >לעדכון</button>
      {/* <button onClick={() =>navigate(`/ProfessionalArea/${user.id}`)} >לעדכון</button> */}
    </>
  );
}
export default UserProfile;