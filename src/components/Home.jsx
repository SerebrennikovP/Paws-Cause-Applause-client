import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"
import axios from 'axios'
import CardPet from './CardPet'

const Home = () => {
  const navigate = useNavigate()
  const [randomPets, setRandomPets] = useState([])

  useEffect(() => {
    const getRandomPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pet/getRandom');
        console.log(response.data)
        setRandomPets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRandomPets();
  }, []);

  return (
    <div className="HomePage">
      <div className="">Header welcoming users to the site</div>
      <div className="">Text explaining what the service is</div>
      <button id="searchCatsButton" onClick={() => navigate(routes.searchPageCats)} className="btn btn-lg btn-danger">Cat</button>
      <button id="searchDogsButton" onClick={() => navigate(routes.searchPageDogs)} className="btn btn-lg btn-info">Dog</button>
      <div className="random-pets">
        {randomPets.map((pet) => (<CardPet key={pet.pet_id} pet={pet} />
        ))}
      </div>
    </div>
  )
}

export default Home