import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { isVerified } from "../../store/AuthReducer";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [photourl, setPhotourl] = useState("");

  const [displayName, setDisplayName] = useState("")
  const [url, setUrl] = useState("")
  const [displayEmail, setDisplayEmail] = useState("")

  const [verified, setVerified] = useState(false)
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const idToken = localStorage.getItem("idToken")

  const dispatch = useDispatch()
  dispatch(isVerified(verified))

  const handleUserProfile = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBCoKzZHD2w9DdTvYtOvlQQNF1M8-LCKjA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            displayName: name,
            photoUrl: photourl,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      navigate("/expense");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBCoKzZHD2w9DdTvYtOvlQQNF1M8-LCKjA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDisplayName(data.users[0].displayName)
        setUrl(data.users[0].photoUrl)
        setVerified(data.users[0].emailVerified)
        setDisplayEmail(data.users[0].email)
      }
    }
    fetchData();
  }, [idToken]);


  useEffect(() => {
    // Set the initial values of name and photourl when the display name and URL are fetched
    setName(displayName || "");
    setPhotourl(url || "");
  }, [displayName, url]);

  const sendEmailLink = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBCoKzZHD2w9DdTvYtOvlQQNF1M8-LCKjA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEmailSent(true);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="profile-container">
      <div className="profile">
        {displayName && <h3 style={{ color: "white" }}>Hi, {displayName}</h3>}
        <h2>Your Profile</h2>
        <label>Email Id : {displayEmail}</label>
        <label>User Name:</label>
        <input
          type="text"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Profile Photo URL:</label>
        <input
          type="text"
          name="profile-photo-url"
          value={photourl}
          onChange={(e) => setPhotourl(e.target.value)}
          required
        />
        <br />
        <button onClick={handleUserProfile} className="update">Update</button>
        {verified === false &&
          <button onClick={sendEmailLink} disabled={emailSent} className={emailSent ? "disabled" : "enabled"}>{emailSent ? "Check your Email" : "Verify Email"}</button>}
        {verified === true && <p className="emailSuccess">Your email verified successfully.</p>}
      </div>
    </div>
  );

};

export default UserProfile;
