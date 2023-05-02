import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react'


const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [userObj, setUserObj] = useState({})
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState(localStorage.getItem('id') || '')

    useEffect(() => {
        async function getUser() {
            const user = await axios.post('http://localhost:8080/getUser', { "id": id })
            setUserObj(user.data)
            setEmail(user.data.email)
            setName(user.data.name)
            setLastname(user.data.lastname)
            setPhone(user.data.phone)
        }
        getUser()
    }, [id])


    return (
        <UserContextInstance.Provider value={{ setEmail, email, name, setName, lastname, setLastname, phone, setPhone, id, setId }}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext