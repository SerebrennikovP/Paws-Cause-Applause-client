import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserContextInstance } from '../context/UserContext'
import "../CSS/modals.css"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginModal(props) {
    const { setToken } = useContext(UserContextInstance)
    const [inputTextEmail, setInputTextEmail] = useState('')
    const [inputTextPassword, setInputTextPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/login', {
                email: inputTextEmail,
                password: inputTextPassword,
            });

            setToken(response.data.token)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('expirationDate', response.data.expirationDate)

            props.onHide();
        } catch (error) {
            if (error.response?.status === 401)
                toast.warn('The email address or password is incorrect', {
                    transition: Zoom,
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            else
                console.log(error);
        }
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form onSubmit={handleLogin}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        LOGIN
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 userName-Container">
                        <label htmlFor="emailInput" className="form-label">E-mail</label>
                        <input type="email" placeholder='I@love.pets' value={inputTextEmail} onChange={(e) => setInputTextEmail(e.target.value)} name="email" className="form-control shadow-none" id="emailInput" required />

                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" value={inputTextPassword} onChange={(e) => setInputTextPassword(e.target.value)} name="password" className="form-control shadow-none" id="passwordInput" required />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">LET'S GO!</Button>
                </Modal.Footer>
            </form>
            <ToastContainer />
        </Modal>
    );
}


export default LoginModal