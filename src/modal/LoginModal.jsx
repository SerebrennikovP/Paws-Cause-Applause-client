import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UserContextInstance } from '../context/UserContext'


function LoginModal(props) {
    const { setEmail, setName, setLastname, setPhone, setId } = useContext(UserContextInstance)
    const [inputTextEmail, setInputTextEmail] = useState('')
    const [inputTextPassword, setInputTextPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: inputTextEmail,
                password: inputTextPassword,
            });
            setEmail(inputTextEmail);
            setName(response.data.name)
            setLastname(response.data.lastname)
            setPhone(response.data.phone)
            setId(response.data.id)

            localStorage.setItem('id', response.data.id);

            props.onHide();
        } catch (error) {
            if (error.response?.status === 401)
                alert('The email address or password is incorrect')
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
                        Login
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
                    <Button type="submit">Let's go!</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}


export default LoginModal