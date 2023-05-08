import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"

const CardPet = ({ pet }) => {
    const navigate = useNavigate()

    async function handleClick() {
        navigate(routes.petPage.replace(':pet_id', pet.pet_id))
    }

    return (
        <div className="card-pet" onClick={handleClick}>
            <h1>{pet.name}</h1>
            <img src={pet.picture} alt={pet.name} />
            <p>{pet.adoption_status}</p>
            <p>Breed: {pet.breed}</p>
        </div>
    )
}

export default CardPet