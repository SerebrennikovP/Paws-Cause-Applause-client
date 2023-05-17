import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { UserContextInstance } from '../context/UserContext'
import axios from 'axios';
import * as yup from 'yup'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpModal({ onClickLogin, ...props }) {
    const { setToken } = useContext(UserContextInstance)

    const signUpSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm password'),
        name: yup.string().min(1, 'Name is required').required('Name is required'),
        lastname: yup.string().min(1, 'Lastname is required').required('Lastname is required'),
        phone: yup.string().matches(/^\+?[1-9]\d{9,19}$/, 'Invalid phone number').required('Phone number is required'),
    });

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
        setInputs(inputs => ({ ...inputs, phone: '+' + value }));
    }

    async function handleSignUp(e) {
        e.preventDefault();
        const { repassword, ...postData } = inputs;

        try {
            await signUpSchema.validate(inputs);

            const response = await axios.post('http://localhost:8080/user/signUp', postData);

            toast.success('User added', {
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

            setToken(response.data.token)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('expirationDate', response.data.expirationDate)

            props.onHide();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                toast.warn(error.message, {
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
            } else if (error.response?.status === 409) {
                toast.warn('User with this email already exists', {
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
            } else {
                console.log(error);
            }
        }
    }

    function handleAlreadyHave() {
        props.onHide();
        onClickLogin()
    }

    const { email, password, repassword, phone, name, lastname } = inputs;

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>SIGN UP</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSignUp}>
                <Modal.Body>
                    <div className="mb-3 userName-Container">
                        <label htmlFor="emailInput" className="form-label">E-mail</label>
                        <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control shadow-none" id="emailInput" placeholder='I@love.pets' />

                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" name="password" value={password} onChange={handleInputChange} className="form-control shadow-none" id="passwordInput" placeholder='Minimal 8 symbols' />

                        <label htmlFor="repasswordInput" className="form-label">Repeat password</label>
                        <input type="password" name="repassword" value={repassword} onChange={handleInputChange} className="form-control shadow-none" id="repasswordInput" placeholder='Confirm password' />

                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="nameInput" placeholder='Ace' />

                        <label htmlFor="lastnameInput" className="form-label">Lastname</label>
                        <input type="text" name="lastname" value={lastname} onChange={handleInputChange} className="form-control shadow-none" id="lastnameInput" placeholder='Ventura' />

                        <label htmlFor="phoneInput" className="form-label" >Phone</label>
                        <PhoneInput country="il" id="phoneInput" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <Button type="submit" >LET'S GO!</Button>
                </Modal.Body>
                <Modal.Footer>
                    <div className="already-have-account">Already have an account?<span onClick={handleAlreadyHave}>LOGIN</span></div>
                </Modal.Footer>
            </form>
            <ToastContainer />
        </Modal>
    );
}

export default SignUpModal