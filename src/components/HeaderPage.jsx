import '../CSS/header.css'
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
          <span className='paws website-name'>PAWS</span><span className='cause website-name'>CAUSE</span><span className='applause website-name'>APPLAUSE</span>
        </NavLink></div>
      <HeaderProfile />
    </div >
  )
}

export default HeaderPage