import React, { useState, useContext, useEffect } from 'react';
import { UserContextInstance } from '../context/UserContext'
import axios from 'axios';
import * as yup from 'yup'
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

const AddPet = () => {

    const [type, setType] = useState({ label: "Pet type", value: "Cat" });
    const [inputs, setInputs] = useState({
        name: '',
        ownerId: '', // НУЖНО ОЧИСТИТЬ ЕСЛИ ФОТСЕРЕД
        height: 0, //Нужно на сервер отдать с округлением до сотых
    });

    const [adoptionStatus, setAdoptionStatus] = useState({ label: "Adoption status", value: "Available" });

    // useEffect(() => {
    //     console.log(JSON.stringify(adoptionStatus) )
    //     console.log(JSON.stringify(adoptionStatus)  == '{"label":"Fostered","value":"Fostered"}')
    // }, [adoptionStatus])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    async function handleAddPet() {
        try { }
        catch (error) {
            console.log(error)
        }
    }
    const isFostered = JSON.stringify(adoptionStatus) == '{"label":"Fostered","value":"Fostered"}'
    // async function handleSignUp(e) {
    //     e.preventDefault();
    //     const { repassword, ...postData } = inputs;

    //     try {
    //         await signUpSchema.validate(inputs);

    //         const response = await axios.post('http://localhost:8080/user/signUp', postData);

    //         toast.success('Pet added', {
    //             transition: Zoom,
    //             position: "top-center",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });

    //         setToken(response.data.token)

    //         localStorage.setItem('token', response.data.token)
    //         localStorage.setItem('expirationDate', response.data.expirationDate)

    //         props.onHide();
    //     } catch (error) {
    //         if (error instanceof yup.ValidationError) {
    //             toast.warn(error.message, {
    //                 transition: Zoom,
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         } else if (error.response?.status === 409) {
    //             toast.warn('User with this email already exists', {
    //                 transition: Zoom,
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         } else {
    //             console.log(error);
    //         }
    //     }
    // }

    const { ownerId, height, repassword, phone, name, lastname } = inputs;


    // type: { type: String, required: true },
    // name: { type: String, required: true },
    // adoption_status: { type: String, required: true },
    // picture: { type: String, required: false },
    // height: { type: Number, required: true },
    // weight: { type: Number, required: true },
    // color: { type: String, required: true },
    // bio: { type: String, required: false },
    // hypoallergenic: { type: Boolean, required: true },
    // dietary_restrictions: { type: Array, required: false },
    // breed: { type: String, required: true },
    // owner_id: { type: String, required: false },
    // favorite: { type: Array, required: false }


    return (
        <div className='AddPet'>
            <div className="mb-3 add-pet-form-container">
                <Select
                    value={type}
                    onChange={(option) => setType(option)}
                    name="type"
                    options={[{ label: "Cat", value: "Cat" }, { label: "Dog", value: "Dog" }]}
                    className="basic-single"
                    classNamePrefix="select"
                />
                <label htmlFor="namePetInput" className="form-label">Name</label>
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="namePetInput" placeholder='Good boy/girl' />

                <Select
                    value={adoptionStatus}
                    onChange={(option) => setAdoptionStatus(option)}
                    name="adoptionStatus"
                    options={[{ label: "Available", value: "Available" }, { label: "Fostered", value: "Fostered" }]}
                    className="basic-single"
                    classNamePrefix="select"
                />
                {isFostered &&
                    <><label htmlFor="ownerIdInput" className="form-label">Owner Id</label>
                        <input type="text" name="ownerId" value={ownerId} onChange={handleInputChange} className="form-control shadow-none" id="ownerIdInput" placeholder='646xxx4d6f5e1xxx4fbb7xxx8c' /></>}

                <label htmlFor="heightInput" className="form-label">Height (sm)</label>
                <input type="number" name="height" value={height} min="0" max="200" step="0.5" onChange={handleInputChange} className="form-control shadow-none" id="heightInput" placeholder='Good boy/girl' />

                {/* <label htmlFor="emailInput" className="form-label">E-mail</label>
                    <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control shadow-none" id="emailInput" placeholder='I@love.pets' />

                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" name="password" value={password} onChange={handleInputChange} className="form-control shadow-none" id="passwordInput" placeholder='Minimal 8 symbols' />

                    <label htmlFor="repasswordInput" className="form-label">Repeat password</label>
                    <input type="password" name="repassword" value={repassword} onChange={handleInputChange} className="form-control shadow-none" id="repasswordInput" placeholder='Confirm password' />

                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="nameInput" placeholder='Ace' />

                    <label htmlFor="lastnameInput" className="form-label">Lastname</label>
                    <input type="text" name="lastname" value={lastname} onChange={handleInputChange} className="form-control shadow-none" id="lastnameInput" placeholder='Ventura' /> */}

            </div>
            <button type="button" onClick={handleAddPet} >ADD PET!</button>
        </div>
    )
}

export default AddPet