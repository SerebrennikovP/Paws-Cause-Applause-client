import '../CSS/profile.css';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes, toast_config } from '../constants';
import { UserContextInstance } from '../context/UserContext'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as yup from 'yup'
import axios from 'axios';
import ChangePasswordModal from '../modal/ChangePasswordModal'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate()
  const { email, name, lastname, phone, userObj, setUserObj, bio, token } = useContext(UserContextInstance)

  useEffect(() => { !token && navigate(routes.home) }, [])

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
    bio: bio || '',
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

        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/changeUser/${token}`, updatedUserObj, { headers: { Authorization: `Bearer ${token}` } });

        toast.success('Changes saved', toast_config);

        setIsEditing(!isEditing)

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          toast.warn(error.message, toast_config);
        } else {
          if (error.response?.status === 409) {
            toast.warn('User with this email already exists', toast_config)
          }
          console.log(error);
        }
      }
    } else setIsEditing(!isEditing)
  }

  return (token && name &&
    <>
      <form onSubmit={handleChangeUser}>
        <div className="mb-3 profile-Container">

          <label htmlFor="emailInput" className="form-label">EMAIL</label>
          <input type="email" name="email" value={inputs.email} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="emailInput" readOnly={isEditing} />

          <label htmlFor="nameInput" className="form-label">NAME</label>
          <input type="text" name="name" value={inputs.name} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="nameInput" readOnly={isEditing} />

          <label htmlFor="lastnameInput" className="form-label">LASTNAME</label>
          <input type="text" name="lastname" value={inputs.lastname} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="lastnameInput" readOnly={isEditing} />

          <label htmlFor="phoneInput" className="form-label" >PHONE</label>
          <div className={`phone-input-wrapper ${isEditing ? 'editingProfile' : ''}`}>
            <PhoneInput country="il" id="phoneInput" value={inputs.phone} onChange={handlePhoneChange} inputProps={{ readOnly: isEditing }} disabled={isEditing} />
          </div>

          <label htmlFor="bioInput" className="form-label">BIO</label>
          <textarea type="textarea" name="bio" value={inputs.bio} onChange={handleInputChange} className={`form-control shadow-none ${isEditing ? 'editingProfile' : ''}`} id="bioInput" readOnly={isEditing} />
          <br></br>

          <button className="btn btn-danger" disabled={!isEditing} onClick={() => setIsEditing(!isEditing)} >EDIT PROFILE</button>
          <button className="btn btn-primary" disabled={isEditing} type="submit" >SAVE CHANGES</button>
          <button className="btn password" type="button" onClick={() => setIsChangePassword(true)} >CHANGE PASSWORD</button>
        </div>
      </form>
      <ChangePasswordModal
        show={isChangePassword}
        onHide={() => setIsChangePassword(false)}
      />
    </>
  );
}

export default Profile