import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="HomePage">
      <div className="">Header welcoming users to the site</div>
      <div className="">Text explaining what the service is</div>
      <button id="searchCatsButton" onClick={() => navigate(routes.searchPageCats)} className="btn btn-lg btn-danger">Cat</button>
      <button id="searchDogsButton" onClick={() => navigate(routes.searchPageDogs)} className="btn btn-lg btn-info">Dog</button>
    </div>
  )
}

export default Home