import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UserContextInstance } from '../context/UserContext'


function SignUpModal(props) {
    const { setEmail } = useContext(UserContextInstance)

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repassword: '',
        phone: '',
        name: '',
        lastname: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handlePhoneChange(value) {
        setInputs(inputs => ({ ...inputs, phone: value }));
    }

    function handleSignUp() {
        setEmail(inputs.email)
        localStorage.setItem('email', inputs.email)
        props.onHide();
        window.location.reload(false);
    }

    const { email, password, repassword, phone, name, lastname } = inputs;
    const isFormValid = email && password && repassword && phone.length > 9 && name && lastname;

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 userName-Container">
                    <label htmlFor="emailInput" className="form-label">E-mail</label>
                    <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control shadow-none" id="emailInput" placeholder='I@love.pets' />

                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" name="password" value={password} onChange={handleInputChange} className="form-control shadow-none" id="passwordInput" />

                    <label htmlFor="repasswordInput" className="form-label">Repeat password</label>
                    <input type="password" name="repassword" value={repassword} onChange={handleInputChange} className="form-control shadow-none" id="repasswordInput" />

                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="nameInput" />

                    <label htmlFor="lastNameInput" className="form-label">Lastname</label>
                    <input type="text" name="lastname" value={lastname} onChange={handleInputChange} className="form-control shadow-none" id="lastNameInput" />

                    <PhoneInput country="il" value={phone} onChange={handlePhoneChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSignUp} disabled={!isFormValid}>Let's go!</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignUpModal;
