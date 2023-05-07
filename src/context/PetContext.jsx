import React, { useEffect, createContext, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

const PetContextInstance = createContext()

const PetContext = ({ children }) => {
    const [pets, setPets] = useState([])

    return (
        <PetContextInstance.Provider value={{ pets }}>
            {children}
        </PetContextInstance.Provider>
    )
}

export { PetContextInstance }
export default PetContext