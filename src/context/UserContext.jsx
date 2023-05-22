import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react'


const UserContextInstance = createContext()

const UserContext = ({ children }) => {
    const [userObj, setUserObj] = useState({})
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [modalSignUpShow, setModalSignUpShow] = useState(false)

    function SignOut() {
        localStorage.clear()
        setToken('')
    }

    useEffect(() => {
        async function getUser() {
            try {
                const user = await axios.post('http://localhost:8080/user/getUser', { "token": token })
                setUserObj(user.data)
            }
            catch (err) {
                err.response.data == "invalid token" && SignOut()
                console.log(err)
            }
        }
        const expirationDate = Number(localStorage.getItem("expirationDate"))
        expirationDate && new Date(expirationDate) <= Date.now() ? SignOut() : getUser()
        getUser()
    }, [token])


    return (
        <UserContextInstance.Provider value={{ email: userObj.email, name: userObj.name, lastname: userObj.lastname, phone: userObj.phone, token, setToken, userObj, setUserObj, bio: userObj.bio, userId: userObj._id, SignOut,modalSignUpShow, setModalSignUpShow }}>
            {children}
        </UserContextInstance.Provider>
    )
}

export { UserContextInstance }
export default UserContext