import React, { useContext, useState } from 'react'
import SignUpModal from '../modal/SignUpModal'
import LoginModal from '../modal/LoginModal'
import { NavLink } from 'react-router-dom'
import { UserContextInstance } from '../context/UserContext'
import { routes } from "../constants"
import { ReactComponent as UserSVG } from '../images/user-solid.svg'


const HeaderProfile = () => {

    const { token, name, lastname, setToken, SignOut, modalSignUpShow, setModalSignUpShow } = useContext(UserContextInstance)
    const [modalLoginShow, setModalLoginShow] = useState(false)

    return (
        <div className="HeaderProfile">
            {token ?
                <div className="dropdown LoggedIn">
                    <UserSVG className='userSVG' />
                    <span className="dropdown-btn LoggedIn">{name?.toUpperCase()} {lastname?.toUpperCase()}</span>
                    <div className="dropdown-content LoggedIn">
                        <NavLink to={routes.profile}>PROFILE SETTINGS</NavLink>
                        <NavLink to={routes.myPets}>MY PETS</NavLink>
                        <div onClick={SignOut}>SIGN OUT</div>
                    </div>
                </div>
                :
                <div className="dropdown LoggedOut">
                    <div className="dropdown-btn LoggedOut">AUTHORIZE</div>
                    <div className="dropdown-content LoggedOut">
                        <div onClick={() => setModalLoginShow(true)}>
                            LOGIN
                        </div>
                        <LoginModal
                            show={modalLoginShow}
                            onHide={() => setModalLoginShow(false)}
                        />
                        <div onClick={() => setModalSignUpShow(true)}>
                            SIGN UP
                        </div>
                        <SignUpModal
                            show={modalSignUpShow}
                            onHide={() => setModalSignUpShow(false)}
                            onClickLogin={() => setModalLoginShow(true)}
                        />
                    </div>
                </div>}
        </div>
    )
}

export default HeaderProfile