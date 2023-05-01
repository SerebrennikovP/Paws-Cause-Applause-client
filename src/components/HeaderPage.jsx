import React from 'react'
import HeaderProfile from './HeaderProfile'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import { routes } from "../constants"

const HeaderPage = () => {


  return (
    <div className='HeaderPage'>
      <div className="HeaderPageLogoName">
        <NavLink to={routes.home}>
          <img src={logo} alt="logo" />
          Name Company
        </NavLink></div>
      <HeaderProfile />
    </div >
  )
}

export default HeaderPage