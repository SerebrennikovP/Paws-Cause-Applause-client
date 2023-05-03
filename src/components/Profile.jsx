import '../CSS/profile.css';
import React, { useContext, useState } from 'react'
import { UserContextInstance } from '../context/UserContext'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as yup from 'yup'
import axios from 'axios';
import ChangePasswordModal from '../modal/ChangePasswordModal'

const Profile = () => {
  const { email, name, lastname, phone, userObj, setUserObj, bio, id } = useContext(UserContextInstance)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [isEditing, setIsEditing] = useState(true)

  const signUpSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    lastname: yup.string().required('Lastname is required'),
    phone: yup.string().matches(/^\+?[1-9]\d{9,19}$/, 'Invalid phone number').required('Phone number is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
  });
  const [inputs, setInputs] = useState({
    name,
    lastname,
    phone,
    bio,
    email,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handlePhoneChange(value) {
    setInputs(inputs => ({ ...inputs, phone: '+' + value }));
  }


  async function handleChangeUser(e) {
    e.preventDefault();
    if (inputs.name !== name || inputs.lastname !== lastname || inputs.phone !== phone || inputs.bio !== bio || inputs.email !== email) {
      try {
        await signUpSchema.validate(inputs);

        const updatedUserObj = {
          ...userObj,
          name: inputs.name,
          lastname: inputs.lastname,
          phone: inputs.phone,
          bio: inputs.bio,
          email: inputs.email
        }
        setUserObj(updatedUserObj)

        const response = await axios.put(`http://localhost:8080/user/changeUser/${id}`, updatedUserObj);

        alert('Changes saved');

        setIsEditing(!isEditing)

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          alert(error.message);
        } else {
          console.log(error);
        }
      }
    } else setIsEditing(!isEditing)
  }

  return (
    <>
      <form onSubmit={handleChangeUser}>
        <div className="mb-3 container userName-Container">

          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="email" name="email" value={inputs.email} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="emailInput" readOnly={isEditing} />

          <label htmlFor="nameInput" className="form-label">Name</label>
          <input type="text" name="name" value={inputs.name} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="nameInput" readOnly={isEditing} />

          <label htmlFor="lastnameInput" className="form-label">Lastname</label>
          <input type="text" name="lastname" value={inputs.lastname} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="lastnameInput" readOnly={isEditing} />

          <label htmlFor="phoneInput" className="form-label" >Phone</label>
          <div className={`phone-input-wrapper ${isEditing ? 'editingProfile' : ''}`}>
            <PhoneInput country="il" id="phoneInput" value={inputs.phone} onChange={handlePhoneChange} inputProps={{ readOnly: isEditing }} disabled={isEditing} />
          </div>

          <label htmlFor="bioInput" className="form-label">Bio</label>
          <textarea type="textarea" name="bio" value={inputs.bio} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="bioInput" readOnly={isEditing} />
          <br></br>

          <button className="btn btn-danger" disabled={!isEditing} onClick={() => setIsEditing(!isEditing)} >Edit profile</button>
          <button className="btn btn-primary" disabled={isEditing} type="submit" >Save changes</button>
        </div>
      </form>
      <button className="btn btn-info" onClick={() => setIsChangePassword(true)} >Change password</button>
      <ChangePasswordModal
        show={isChangePassword}
        onHide={() => setIsChangePassword(false)}
      />
    </>
  );
}

export default Profile