import React, { useState, useEffect, useContext } from 'react'
import "../CSS/myPets.css"
import CardPet from "./CardPet";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { UserContextInstance } from '../context/UserContext'
import { routes } from "../constants"

const MyPets = () => {
  const [inFavorite, setInFavorite] = useState(true)
  const [myPets, setMyPets] = useState([]);
  const { token } = useContext(UserContextInstance)
  const navigate = useNavigate()

  useEffect(() => { !token && navigate(routes.home) }, [])

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/pet/user/${token}`, { headers: { Authorization: `Bearer ${token}` } });
        setMyPets(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyPets()
  }, []);

  return (
    <div className='MyPetsPage'>
      <div className="header-my-pets-page">
        <button className="btn btn-favorite" disabled={!inFavorite} onClick={() => setInFavorite(!inFavorite)} >FAVORITE PETS</button>
        <button className="btn btn-my-pets" disabled={inFavorite} onClick={() => setInFavorite(!inFavorite)}>MY PETS</button>
      </div>
      <div className="my-pets">
      {/* <div className="zero-my-pets" style={{ display: filtredPets.length > 0 || isFirstMount ? 'none' : 'flex' }}>PLEASE MAKE FILTERS EASIER</div> */}
        {myPets.map((pet) => (
          <CardPet key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  )
}

export default MyPets