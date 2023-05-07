import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UserContextInstance } from '../context/UserContext'
import axios from 'axios';
import * as yup from 'yup'

function ChangePasswordModal(props) {
    const { token, userObj } = useContext(UserContextInstance)

    const signUpSchema = yup.object().shape({
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        repassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm password'),
    });

    const [inputs, setInputs] = useState({
        password: '',
        repassword: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    async function handleChangePassword(e) {
        e.preventDefault();

        try {
            await signUpSchema.validate(inputs);

            const updatedUserObj = {
                ...userObj,
                password: inputs.password
            }

            const response = await axios.put(`http://localhost:8080/user/changeUser/${token}`, updatedUserObj, { headers: { Authorization: `Bearer ${token}` } });
            setInputs({
                password: '',
                repassword: '',
            })

            alert('Password has been changed');
            props.onHide();
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                alert(error.message);
            } else {
                console.log(error);
            }
        }
    }

    return (
        <Modal {...props} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Change password</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleChangePassword}>
                <Modal.Body>
                    <div className="mb-3 userName-Container">

                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" name="password" value={inputs.password} onChange={handleInputChange} className="form-control shadow-none" id="passwordInput" placeholder='Minimal 8 symbols' />

                        <label htmlFor="repasswordInput" className="form-label">Repeat password</label>
                        <input type="password" name="repassword" value={inputs.repassword} onChange={handleInputChange} className="form-control shadow-none" id="repasswordInput" placeholder='Confirm password' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" >Save password</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ChangePasswordModal