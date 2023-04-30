import React from 'react'
import HeaderProfile from './HeaderProfile'

const HeaderPage = () => {


  return (
    <div className='HeaderPage'>
      <div className="HeaderPageLogo">
        Logo
      </div>
      <div className="HeaderPageName">
        Name Company
      </div>
      <HeaderProfile />
    </div >
  )
}

export default HeaderPage