import React from 'react'
import { createContext, useState } from "react";

const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [lastname, setLastname] = useState(localStorage.getItem('lastname') || '');
    return (
        <UserContextInstance.Provider value={{ setEmail, email, name, setName, lastname, setLastname }}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext