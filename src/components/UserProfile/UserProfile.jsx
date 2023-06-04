import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const [name, setName] = useState("");
    const [photourl, setPhotourl] = useState("");
    const [data, setData] = useState(null);

    const idtoken = useSelector((state) => state.auth.idToken);
    const navigate = useNavigate();
    const handleUserProfile = async () => {
        try {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAzY6ra6-FLATrk0g7BI9QGqqxwaucV4e0",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: idtoken,
                        displayName: name,
                        photoUrl: photourl,
                        returnSecureToken: true,
                    }),
                }
            );
            const data = await response.json();
            navigate("/expense");
            console.log(idtoken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzY6ra6-FLATrk0g7BI9QGqqxwaucV4e0",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: idtoken,
                    }),
                }
            );
            const data = await response.json();
            setData(data.users);
        }
        fetchData();
    }, [idtoken]);

    useEffect(() => {
        if (data && data.users && data.users.length > 0) {
            setName(data.users.displayName);
            setPhotourl(data.users.photoUrl);
        }
    }, [data]);

    return (
        <div className="profile-container">
            <div className="profile">
                <h2>Your Profile</h2>

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
                <button onClick={handleUserProfile}>Update</button>
            </div>
        </div>
    );
};

export default UserProfile;
