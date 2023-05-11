import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react'


const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [userObj, setUserObj] = useState({})
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        async function getUser() {
            const user = await axios.post('http://localhost:8080/user/getUser', { "token": token })
            setUserObj(user.data)
        }
        getUser()
    }, [token])


    return (
        <UserContextInstance.Provider value={{ email: userObj.email, name: userObj.name, lastname: userObj.lastname, phone: userObj.phone, token, setToken, userObj, setUserObj, bio: userObj.bio, userId: userObj.id }}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext