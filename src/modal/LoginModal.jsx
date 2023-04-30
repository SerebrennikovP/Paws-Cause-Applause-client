import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LoginModal(props) {
    const [inputTextEmail, setInputTextEmail] = useState('')
    const [inputTextPassword, setInputTextPassword] = useState('')

    function handleLogin() {
        props.onHide()
        window.location.reload(false)
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