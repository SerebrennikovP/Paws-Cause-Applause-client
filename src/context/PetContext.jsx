import React, { useEffect, createContext, useState } from 'react'
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

const PetContextInstance = createContext()

const PetContext = ({ children }) => {
    const handleClipboard = (petID) => {
        navigator.clipboard.writeText(`http://localhost:3000/PetPage/${petID}`)
        toast.info('Link copied', {
            transition: Zoom,
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const [isLoadingCards, setIsLoadingCards] = useState(false)

    return (
        <PetContextInstance.Provider value={{ handleClipboard, isLoadingCards, setIsLoadingCards }}>
            {children}
        </PetContextInstance.Provider>
    )
}

export { PetContextInstance }
export default PetContext