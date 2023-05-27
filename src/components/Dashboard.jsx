import React, { useState, useContext, useEffect } from 'react'
import DashboardUsers from './DashboardUsers'
import DashboardPets from './DashboardPets';
import "../CSS/dashboard.css"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { UserContextInstance } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { routes } from '../constants';


const Dashboard = () => {
  const navigate = useNavigate()
  const [alignment, setAlignment] = useState('users');
  const { name, lastname, isAdmin, token } = useContext(UserContextInstance)

  useEffect(() => { (!token || !isAdmin) && navigate(routes.home) }, [])

  const Toggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (isAdmin &&
    <div className='Dashboard'>
      <div className="button-headers-dashboard">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={Toggle}
          aria-label="Platform"
        >
          <ToggleButton className='button-users-admin' value="users">Users</ToggleButton>
          <ToggleButton className='button-pets-admin' value="pets">Pets</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {alignment == 'users' ? <DashboardUsers /> : alignment == 'pets' ? <DashboardPets /> : <div className='hello-admin'>HELLO, {name.toUpperCase()} {lastname.toUpperCase()}</div>}
    </div>
  )
}

export default Dashboard