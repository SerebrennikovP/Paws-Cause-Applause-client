import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import "../CSS/petPage.css";
import { PetContextInstance } from '../context/PetContext'
import axios from 'axios';


function PetPage() {

    const [isSaved, setIsSaved] = useState(false);
    const [pet, setPet] = useState({})

    const { pet_id } = useParams()

    useEffect(() => {
        async function getPet() {
            const data = await axios.get(`http://localhost:8080/pet/petpage/${pet_id}`)
            data.data.dietary_restrictions = Object.entries(JSON.parse(data.data.dietary_restrictions))
                .filter(([key, value]) => !value)
                .map(([key, value]) => key).join(', ').toUpperCase()
            setPet(data.data)
        }
        getPet()
    }, [])

    // function handleSaveForLater() {
    //     setIsSaved(true);
    //     onSaveForLater(pet);
    // }

    // function handleUnsave() {
    //     setIsSaved(false);
    // }

    // function handleAdopt() {
    //     onAdopt(pet);
    // }

    // function handleFoster() {
    //     onFoster(pet);
    // }

    // function handleReturn() {
    //     onReturn(pet);
    // }

    return (
        <div className='PetPage'>
            <h1>{pet.name}</h1>
            <img src={pet.picture} alt={pet.name} />
            <p>Adoption Status: {pet.adoption_status}</p>
            <p>Breed: {pet.breed}</p>
            <p>Height: {pet.height} sm</p>
            <p>Weight: {pet.weight} kg</p>
            <p>Color: {pet.color}</p>
            {pet.bio && <p>Bio: {pet.bio}</p>}
            <p>Hypoallergenic: {pet.hypoallergenic ? 'Yes' : 'No'}</p>
            <p>Dietary Restrictions: {pet.dietary_restrictions}</p>

            {/* {pet.owner && (
                <button onClick={handleReturn}>Return to Adoption Center</button>
            )}

            {!pet.owner && pet.adoptionStatus === 'Available' && (
                <>
                    <button onClick={handleAdopt}>Adopt</button>
                    <button onClick={handleFoster}>Foster</button>
                </>
            )}

            {!pet.owner && pet.adoptionStatus === 'Fostered' && (
                <button onClick={handleAdopt}>Adopt</button>
            )}

            {!isSaved && (
                <button onClick={handleSaveForLater}>Save for Later</button>
            )}

            {isSaved && (
                <button onClick={handleUnsave}>Unsave</button>
            )} */}
        </div>
    );
}

export default PetPage;