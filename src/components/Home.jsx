import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="HomePage">
      <div className="">Header welcoming users to the site</div>
      <div className="">Text explaining what the service is</div>
      <button onClick={() => navigate(routes.searchPage)} className="position-absolute start-50 translate-middle-x btn btn-lg btn-danger">Search</button>
    </div>
  )
}

export default Home