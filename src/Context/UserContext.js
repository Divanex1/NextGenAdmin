import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../Components/Services/api";


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        profile_img: "",
        email: "",
        mobile_number: "",
        gender: "",
        city: "",
        state: "",
        pinCode: "",
    });

    const fetchProfile = async () => {
        try {
            const res = await getData("/auth/vendor-profile-view");
            if (res.state) setProfile(res.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => { fetchProfile(); }, []);
    return (
        <ProfileContext.Provider value={{ profile, setProfile, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => useContext(ProfileContext);