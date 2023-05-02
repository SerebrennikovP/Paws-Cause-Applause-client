import React, { useContext, useState } from 'react'
import { UserContextInstance } from '../context/UserContext'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as yup from 'yup'
import axios from 'axios';

const Profile = () => {
  const { setEmail, email, name, setName, lastname, setLastname, phone, setPhone, id, setId } = useContext(UserContextInstance)

  const signUpSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Lastname is required'),
    phone: yup.string().matches(/^\+?[1-9]\d{9,19}$/, 'Invalid phone number').required('Phone number is required'),
  });

  const [inputs, setInputs] = useState({
    emailInput: email,
    phoneInput: phone,
    nameInput: name,
    lastnameInput: lastname,
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

    // try {
    //   await signUpSchema.validate(inputs);

    //   const response = await axios.put(`http://localhost:8080/user/${id}`, postData);

    //   alert('User added');
    //   setEmail(inputs.email);
    //   setName(inputs.name);
    //   setLastname(inputs.lastname);
    //   setPhone(inputs.phone)

    //   localStorage.setItem('id', response.data);

    // } catch (error) {
    //   if (error instanceof yup.ValidationError) {
    //     alert(error.message);
    //   } else if (error.response?.status === 409) {
    //     alert('User with this email already exists');
    //   } else {
    //     console.log(error);
    //   }
    // }
  }


  const { emailInput, phoneInput, nameInput, lastnameInput } = inputs;

  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3 userName-Container">
        <label htmlFor="emailInput" className="form-label">E-mail</label>
        <input type="email" name="email" value={emailInput} onChange={handleInputChange} className="form-control shadow-none" id="emailInput" placeholder='I@love.pets' />

        <label htmlFor="nameInput" className="form-label">Name</label>
        <input type="text" name="name" value={nameInput} onChange={handleInputChange} className="form-control shadow-none" id="nameInput" placeholder='Ace' />

        <label htmlFor="lastnameInput" className="form-label">Lastname</label>
        <input type="text" name="lastname" value={lastnameInput} onChange={handleInputChange} className="form-control shadow-none" id="lastnameInput" placeholder='Ventura' />

        <label htmlFor="phoneInput" className="form-label" >Phone</label>
        <PhoneInput country="il" id="phoneInput" value={phoneInput} onChange={handlePhoneChange} />
      </div>
      <button type="submit" >Let's go!</button>
    </form>
  );
}

export default Profile