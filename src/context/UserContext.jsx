import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react'


const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [userObj, setUserObj] = useState({})
    const [id, setId] = useState(localStorage.getItem('id') || '')

    useEffect(() => {
        async function getUser() {
            const user = await axios.post('http://localhost:8080/user/getUser', { "id": id })
            setUserObj(user.data)
        }
        getUser()
    }, [id])


    return (
        <UserContextInstance.Provider value={{ email: userObj.email, name: userObj.name, lastname: userObj.lastname, phone: userObj.phone, id, setId, userObj, setUserObj, bio: userObj.bio }}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext