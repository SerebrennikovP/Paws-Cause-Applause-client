import React, { useState, useEffect, useContext } from 'react'
import "../CSS/myPets.css"
import CardPet from "./CardPet";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { UserContextInstance } from '../context/UserContext'
import { routes } from "../constants"
import { PetContextInstance } from '../context/PetContext'

const MyPets = () => {
  const [inFavorite, setInFavorite] = useState(false)
  const [myPets, setMyPets] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const [isFirstMount, setIsFirstMount] = useState(true)

  const { token, userObj } = useContext(UserContextInstance)
  const { isMyPetsPage, setIsLoadingCards } = useContext(PetContextInstance)
  const navigate = useNavigate()

  useEffect(() => { !token && navigate(routes.home) }, [])

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        setIsLoadingCards(true)
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pet/user/${token}`, { headers: { Authorization: `Bearer ${token}` } });
        setMyPets(response.data)
        setIsFirstMount(false)
        setIsLoadingCards(false)
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyPets()
  }, []);

  useEffect(() => {
    const fetchFavoritePets = async () => {
      try {
        setIsLoadingCards(true)
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pet/user/favorite/${token}`, { "favorite": userObj?.favorite }, { headers: { Authorization: `Bearer ${token}` } });
        setFavoritePets(response.data)
        setIsLoadingCards(false)
      } catch (error) {
        console.error(error);
      }
    }
    fetchFavoritePets()
  }, [isMyPetsPage]);

  return (
    <div className='MyPetsPage'>

      <div className="header-my-pets-page">
        <button className="btn btn-favorite" disabled={inFavorite} onClick={() => setInFavorite(!inFavorite)} >FAVORITE PETS</button>
        <button className="btn btn-my-pets" disabled={!inFavorite} onClick={() => setInFavorite(!inFavorite)}>MY PETS</button>
      </div>

      <div className="zero-my-pets" style={{ display: myPets.length === 0 && !inFavorite && !isFirstMount ? 'flex' : 'none' }}>YOU DON’T HAVE ANY ADDED PETS YET =(<div onClick={() => navigate(routes.home)}>LET’S FIND YOU A FRIEND</div></div>

      <div className="zero-my-pets" style={{ display: favoritePets.length === 0 && inFavorite && !isFirstMount ? 'flex' : 'none' }}>YOU DON’T HAVE ANY FAVORITE PETS YET =(<div onClick={() => navigate(routes.home)}>LET’S FIND YOU A FRIEND</div></div>

      {!inFavorite ?
        <div className="my-pets">
          {myPets.map((pet) => (
            <CardPet key={pet._id} pet={pet} />
          ))}
        </div>
        :
        <div className="favorite-pets">
          {favoritePets.map((pet) => (
            <CardPet key={pet._id} pet={pet} />
          ))}
        </div>}
    </div>
  )
}

export default MyPets