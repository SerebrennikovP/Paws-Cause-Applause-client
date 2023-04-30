import React, { useContext, useState } from 'react'
import SignUpModal from '../modal/SignUpModal'
import LoginModal from '../modal/LoginModal'
import { NavLink } from 'react-router-dom'
import { UserContextInstance } from '../context/UserContext'
import { routes } from "../constants"
import { ReactComponent as UserSVG } from '../images/user-solid.svg'


const HeaderProfile = () => {

    const { email } = useContext(UserContextInstance)
    const [modalSignUpShow, setModalSignUpShow] = useState(false)
    const [modalLoginShow, setModalLoginShow] = useState(false)

    function SignOut() {
        localStorage.clear()
        window.location.reload(false)
    }

    return (
        <div className="HeaderProfile">
            {email ?
                <div className="dropdown LoggedIn">
                    <UserSVG className='userSVG' />
                    <span className="dropdown-btn LoggedIn">{email}</span>
                    <div className="dropdown-content LoggedIn">
                        <NavLink to={routes.profile}>Profile settings</NavLink>
                        <NavLink to={routes.myPets}>My pets</NavLink>
                        <div onClick={SignOut}>Sign out</div>
                    </div>
                </div>
                :
                <div className="dropdown LoggedOut">
                    <div className="dropdown-btn LoggedOut">Authorize</div>
                    <div className="dropdown-content LoggedOut">
                        <div onClick={() => setModalLoginShow(true)}>
                            Login
                        </div>
                        <LoginModal
                            show={modalLoginShow}
                            onHide={() => setModalLoginShow(false)}
                        />
                        <div onClick={() => setModalSignUpShow(true)}>
                            SignUp
                        </div>
                        <SignUpModal
                            show={modalSignUpShow}
                            onHide={() => setModalSignUpShow(false)}
                        />
                    </div>
                </div>}
        </div>
    )
}

export default HeaderProfile