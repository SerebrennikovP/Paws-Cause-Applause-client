import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import "../CSS/petPage.css";
// import { PetContextInstance } from '../context/PetContext'
import { UserContextInstance } from '../context/UserContext'
import axios from 'axios';
import "../CSS/petPage.css"


function PetPage() {

    const { userId, token, setModalSignUpShow } = useContext(UserContextInstance)
    const [pet, setPet] = useState({})
    const [buttons, setButtons] = useState({ "return": true, "foster": true, "adopt": true })

    const { pet_id } = useParams()

    useEffect(() => {
        async function getPet() {
            const data = await axios.get(`http://localhost:8080/pet/petpage/${pet_id}`)
            setPet(data.data)
        }
        getPet()
    }, [buttons])

    async function handleAdopt() {
        if (!token) setModalSignUpShow(true)
        else {
            pet.owner_id = userId;
            const response = await axios.put(`http://localhost:8080/pet/changeStatus/${pet_id}`, { "handler": "adopt", "owner_id": userId }, { headers: { Authorization: `Bearer ${token}` } })
            setButtons({ "return": true, "foster": false, "adopt": false })
        }
    }

    async function handleFoster() {
        if (!token) setModalSignUpShow(true)
        else {
            pet.owner_id = userId;
            const response = await axios.put(`http://localhost:8080/pet/changeStatus/${pet_id}`, { "handler": "foster", "owner_id": userId }, { headers: { Authorization: `Bearer ${token}` } });
            setButtons({ "return": true, "foster": false, "adopt": true })
        }
    }

    async function handleReturn() {
        if (!token) setModalSignUpShow(true)
        else {
            pet.owner_id = ''
            const response = await axios.put(`http://localhost:8080/pet/changeStatus/${pet_id}`, { "handler": "return", "owner_id": "" }, { headers: { Authorization: `Bearer ${token}` } });
            setButtons({ "return": false, "foster": true, "adopt": true })
        }
    }

    return (
        <div className='PetPage'>
            <div className="pet-about">
                <div className="pet-about-image-name">
                    <h1>{pet.name?.toUpperCase()}</h1>
                    <img src={pet.picture} alt={pet.name} />
                </div>
                <div className="pet-about-info">
                    <p><span>Adoption Status:</span>{pet.adoption_status}</p>
                    <p><span>Breed:</span>{pet.breed}</p>
                    <p><span>Height:</span>{pet.height} sm</p>
                    <p><span>Weight:</span>{pet.weight} kg</p>
                    <p><span>Color:</span>{pet.color}</p>
                    {pet.bio && <p><span>Bio:</span>{pet.bio}</p>}
                    <p><span>Hypoallergenic:</span>{pet.hypoallergenic ? 'Yes' : 'No'}</p>
                    {pet.dietary_restrictions && <p className=''><span>Dietary Restrictions:</span><br/>{pet.dietary_restrictions}</p>}
                </div>
            </div>
            <div className="pet-buttons">
                {pet.adoption_status === 'Fostered' && buttons.adopt === true && <button onClick={handleAdopt}>ADOPT</button>}

                {(pet.owner_id === userId && (pet.adoption_status === 'Fostered' || pet.adoption_status === 'Adopted')) && buttons.return === true && (
                    <button onClick={handleReturn}>RETURN TO ADOPTION CENTER</button>
                )}


                {!pet.owner_id && pet.adoption_status === 'Available' && buttons.foster === true && buttons.adopt === true && (
                    <>
                        <button onClick={handleAdopt}>ADOPT</button>
                        <button onClick={handleFoster}>FOSTER</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PetPage;