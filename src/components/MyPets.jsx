import React,{useState} from 'react'
import "../CSS/myPets.css"

const MyPets = () => {
  const [inFavorite, setInFavorite] = useState(true)
  return (
    <div className='MyPetsPage'>
      <div className="header-my-pets-page">
      <button className="btn btn-favorite" disabled={!inFavorite} onClick={() => setInFavorite(!inFavorite)} >FAVORITE PETS</button>
      <button className="btn btn-my-pets" disabled={inFavorite} onClick={() => setInFavorite(!inFavorite)}>MY PETS</button>
    </div>
    </div>
  )
}

export default MyPets