import React, { useState } from 'react'
import "../CSS/petPage.css";

function PetPage({  onSaveForLater, onAdopt, onFoster, onReturn }) {
    const [isSaved, setIsSaved] = useState(false);

    const pet = {
        "type": "Cat",
        "name": "Rajah",
        "adoptionStatus": "Available",
        "picture": "https://cdn2.thecatapi.com/images/8NdgktL3E.jpg",
        "height": 4,
        "weight": 65,
        "color": "Brown Tabby",
        "bio": "",
        "hypoallergnic": true,
        "dietery": [],
        "breed": "Domestic Shorthair Mix",
        "id": "i0oq8e3by",
        "owner":""
    }

    function handleSaveForLater() {
        setIsSaved(true);
        onSaveForLater(pet);
    }

    function handleUnsave() {
        setIsSaved(false);
    }

    function handleAdopt() {
        onAdopt(pet);
    }

    function handleFoster() {
        onFoster(pet);
    }

    function handleReturn() {
        onReturn(pet);
    }

    return (
        <div className='PetPage'>
            <h1>{pet.name}</h1>
            <img src={pet.picture} alt={pet.name} />
            <p>Type: {pet.type}</p>
            <p>Adoption Status: {pet.adoptionStatus}</p>
            <p>Breed: {pet.breed}</p>
            <p>Height: {pet.height} sm</p>
            <p>Weight: {pet.weight} kg</p>
            <p>Color: {pet.color}</p>
            <p>Bio: {pet.bio}</p>
            <p>Hypoallergenic: {pet.hypoallergenic ? 'Yes' : 'No'}</p>
            <p>Dietary Restrictions: {pet.dietery.join(', ')}</p>

            {pet.owner && (
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
            )}
        </div>
    );
}

export default PetPage;