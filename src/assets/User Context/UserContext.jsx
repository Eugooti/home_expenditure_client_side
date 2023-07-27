import { createContext, useState, useEffect } from 'react';
import {getFromLocalStorage} from "../../Utils/localStorage.jsx";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId=getFromLocalStorage('User')
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api//user/${userId.id}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
