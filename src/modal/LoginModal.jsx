import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserContextInstance } from '../context/UserContext'


function LoginModal(props) {
    const { setEmail,setName,setLastname } = useContext(UserContextInstance)
    const [inputTextEmail, setInputTextEmail] = useState('')
    const [inputTextPassword, setInputTextPassword] = useState('')

    async function handleLogin() {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: inputTextEmail,
                password: inputTextPassword,
            });
            setEmail(inputTextEmail);
            setName(response.data.name)
            setLastname(response.data.lastname)

            localStorage.setItem('email', inputTextEmail);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('lastname', response.data.lastname);

            props.onHide();
            window.location.reload(false);
        } catch (error) {
            if (error.response?.status === 404)
                alert('User with this email is not exists')
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 userName-Container">
                    <label htmlFor="emailInput" className="form-label">E-mail</label>
                    <input type="email" placeholder='I@love.pets' value={inputTextEmail} onChange={(e) => setInputTextEmail(e.target.value)} name="email" className="form-control shadow-none" id="emailInput" />

                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" value={inputTextPassword} onChange={(e) => setInputTextPassword(e.target.value)} name="password" className="form-control shadow-none" id="passwordInput" />

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleLogin} disabled={!inputTextEmail || !inputTextPassword}>Let's go!</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default LoginModal