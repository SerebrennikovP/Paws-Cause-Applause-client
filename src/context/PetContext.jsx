import React, { createContext, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserContextInstance } from './UserContext'
import { toast_config } from '../constants';

const PetContextInstance = createContext()

const PetContext = ({ children }) => {

    const { token, setModalSignUpShow, userObj } = useContext(UserContextInstance)

    const [isMyPetsPage, setIsMyPetsPage] = useState(0)

    const handleClipboard = (petID) => {
        navigator.clipboard.writeText(`http://localhost:3000/PetPage/${petID}`)
        toast.info('Link copied', toast_config);
    };

    const [isLoadingCards, setIsLoadingCards] = useState(false)



    async function handleFavorite(petId, favorited, setFavorited) {
        if (!token) setModalSignUpShow(true)
        else {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pet/favorite`, { "user_id": userObj._id, "pet_id": petId, "isAdd": !favorited }, { headers: { Authorization: `Bearer ${token}` } });
            favorited ? userObj.favorite = userObj.favorite.filter(el => el !== petId) : userObj.favorite.push(petId)
            setFavorited(!favorited)
            setIsMyPetsPage(isMyPetsPage + 1)
        }
    };

    return (
        <PetContextInstance.Provider value={{ handleClipboard, isLoadingCards, setIsLoadingCards, handleFavorite, isMyPetsPage }}>
            {children}
        </PetContextInstance.Provider>
    )
}

export { PetContextInstance }
export default PetContext