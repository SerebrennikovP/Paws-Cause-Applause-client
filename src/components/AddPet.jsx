import React, { useState, useContext, useEffect } from 'react';
import { UserContextInstance } from '../context/UserContext'
import axios from 'axios';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { dietaryOptions, toast_config } from '../constants';
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"
import "../CSS/addPet.css"

const AddPet = () => {
    const navigate = useNavigate()
    const { token, userObj } = useContext(UserContextInstance)

    useEffect(() => { !token && !userObj.isAdmin && navigate(routes.home) }, [])
    const [type, setType] = useState({ label: "Cat*", value: "Cat" });
    const [petImage, setPetImage] = useState();
    const initialInputs = {
        name: '',
        ownerId: '',
        height: '',
        weight: '',
        color: '',
        breed: '',
        bio: '',
        hypoallergenic: false
    };
    const [inputs, setInputs] = useState(initialInputs);
    const { ownerId, height, color, weight, name, breed, bio, hypoallergenic } = inputs;

    const [adoptionStatus, setAdoptionStatus] = useState({ label: "Available", value: "Available" });
    const isFostered = JSON.stringify(adoptionStatus) == '{"label":"Fostered","value":"Fostered"}'
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const addPetSchema = yup.object().shape({
        type: yup.string().oneOf(['Dog', 'Cat']).required('Pet type is required'),
        adoption_status: yup.string().oneOf(['Available', 'Fostered']).required('Adoption status is required'),
        name: yup.string().required('Name is required'),
        ownerId: yup.string(),
        height: yup
            .number().required('Height is required').positive('Height must be a positive number').max(150, 'Height must be no more than 150'),
        weight: yup
            .number().required('Weight is required').positive('Weight must be a positive number').max(60, 'Weight must be no more than 60'),
        color: yup.string().required('Color is required'),
        breed: yup.string().required('Breed is required'),
        bio: yup.string(),
        hypoallergenic: yup.boolean().required('Hypoallergenic status is required'),
        dietary_restrictions: yup.array().of(yup.string())
    });

    function roundIfDecimal(number, index) {
        if (Number.isInteger(number)) {
            return number;
        } else {
            return Math.round(number * index) / index;
        }
    }

    async function handleAddPet(e) {
        try {
            e.preventDefault()

            const petData = {
                'type': type.value,
                'adoption_status': adoptionStatus.value,
                'name': name,
                'owner_id': ownerId,
                'height': roundIfDecimal(height, 10),
                'weight': roundIfDecimal(weight, 100),
                'color': color,
                'breed': breed,
                'hypoallergenic': hypoallergenic,
                'bio': bio,
                'dietary_restrictions': dietaryRestrictions.map((option) => option.value.toUpperCase())
            }

            const formData = new FormData();
            formData.append('picture', petImage);
            for (let key in petData) {
                formData.append(key, petData[key]);
            }
            console.log({ ...petData, petImage })

            await addPetSchema.validate({ ...petData, petImage });
            const res = await axios.post('http://localhost:8080/pet/add', formData, { headers: { Authorization: `Bearer ${token}` } });

            if (res) {
                toast.success('Pet added', toast_config);
                setInputs(initialInputs)
            }
        }
        catch (error) {
            if (error instanceof yup.ValidationError) {
                toast.warn(error.message, toast_config);
            } else {
                console.log(error)
                toast.warn(error, toast_config)
            }
        }
    }

    return (token && userObj.isAdmin &&
        <div className='AddPet'>
            <form onSubmit={handleAddPet}>
                <div className="mb-3 add-pet-form-container block1">
                    <label htmlFor="typePetInput" className="form-label">Pet type*</label>
                    <Select
                        value={type}
                        onChange={(option) => setType(option)}
                        name="type"
                        options={[{ label: "Cat", value: "Cat" }, { label: "Dog", value: "Dog" }]}
                        className="basic-single"
                        classNamePrefix="select"
                        id="typePetInput"
                    />

                    <label htmlFor="namePetInput" className="form-label">Name*</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="namePetInput" placeholder='Good boy/girl' />

                    <label htmlFor="statusPetInput" className="form-label">Adoption status*</label>
                    <Select
                        value={adoptionStatus}
                        onChange={(option) => setAdoptionStatus(option)}
                        name="adoptionStatus"
                        options={[{ label: "Available", value: "Available" }, { label: "Fostered", value: "Fostered" }]}
                        className="basic-single"
                        classNamePrefix="select"
                        id="statusPetInput"
                    />
                    {isFostered &&
                        <><label htmlFor="ownerIdInput" className="form-label">Owner Id</label>
                            <input type="text" name="ownerId" value={ownerId} onChange={handleInputChange} className="form-control shadow-none" id="ownerIdInput" placeholder='646xxx4d6f5e1xxx4fbb7xxx8c' /></>}

                            <label htmlFor="breedPetInput" className="form-label">Breed*</label>
                    <input type="text" name="breed" value={breed} onChange={handleInputChange} className="form-control shadow-none" id="breedPetInput" placeholder='Correct format: Pit Bull' />

                    <label htmlFor="heightInput" className="form-label">Height (sm)*</label>
                    <input type="number" name="height" value={height} onChange={handleInputChange} className="form-control shadow-none" id="heightInput" placeholder='Correct format: 128' />

                    <label htmlFor="weightInput" className="form-label">Weight (kg)*</label>
                    <input type="number" name="weight" value={weight} onChange={handleInputChange} className="form-control shadow-none" id="weightInput" placeholder='Correct format: 7.1' />
                </div>

                <div className="mb-3 add-pet-form-container block2">

                    <label htmlFor="colorPetInput" className="form-label">Color*</label>
                    <input type="text" name="color" value={color} onChange={handleInputChange} className="form-control shadow-none" id="colorPetInput" placeholder='Correct format: Tan/White' />

                    <label htmlFor="dietaryRestrictions" className="form-label">Dietary Restrictions</label>
                    <CreatableSelect isMulti
                        options={dietaryOptions}
                        value={dietaryRestrictions}
                        onChange={(option) => setDietaryRestrictions(option)}
                        name="dietaryRestrictions"
                        id="dietaryRestrictions" />

                    <div className="form-check form-check-secondary">
                        <label className="form-check-label " htmlFor="flexCheckDefault">
                            Hypoallergenic?*
                        </label>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={hypoallergenic}
                            onChange={(e) => setInputs((prevInputs) => ({ ...prevInputs, hypoallergenic: e.target.checked }))} />
                    </div>

                    <label htmlFor="bioPetInput" className="form-label">Bio</label>
                    <textarea type="textarea" name="bio" value={bio} onChange={handleInputChange} className='form-control shadow-none' id="bioPetInput" />


                    <label htmlFor="formFile" className="form-label">Upload picture</label>
                    <input className="form-control" accept="image/*" type="file" id="formFile" onChange={(e) => setPetImage(e.target.files[0])} />

                    <button type="submit" className="btn buttonAddPet" >ADD PET!</button>
                </div>
            </form>
        </div>
    )
}

export default AddPet