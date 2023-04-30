import React from 'react'
import { createContext, useState } from "react";

const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    return (
        <UserContextInstance.Provider value={{setEmail, email}}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext