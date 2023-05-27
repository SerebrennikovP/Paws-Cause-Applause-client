import React, { useState, useContext, useEffect } from 'react';
import { UserContextInstance } from '../context/UserContext'
import { PetContextInstance } from '../context/PetContext'
import axios from 'axios';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { dietaryOptions, routes, toast_config } from '../constants';
import { useNavigate, useParams } from 'react-router-dom'
import "../CSS/putPet.css"

const PutPet = () => {
    const navigate = useNavigate()
    const { token, userObj } = useContext(UserContextInstance)
    const { setIsLoadingCards, isLoadingCards } = useContext(PetContextInstance)
    const [pet, setPet] = useState({})
    const { pet_id } = useParams()
    const [adoptionStatus, setAdoptionStatus] = useState({ label: "Available", value: "Available" });
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [inputs, setInputs] = useState({});
    const [petImage, setPetImage] = useState();
    const [clickUpdate, setClickUpdate] = useState(true)

    useEffect(() => {
        async function getPet() {
            setIsLoadingCards(true)
            const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pet/petpage/${pet_id}`)
            setPet(data.data)
            setIsLoadingCards(false)
        }
        getPet()
    }, [clickUpdate])

    useEffect(() => { (!token || !userObj.isAdmin) && navigate(routes.home) }, [])

    useEffect(() => {
        if (pet) {
            setInputs({
                name: pet.name,
                ownerId: pet.owner_id,
                height: pet.height,
                weight: pet.weight,
                color: pet.color,
                breed: pet.breed,
                bio: pet.bio,
                hypoallergenic: pet.hypoallergenic,
            })
            setDietaryRestrictions(pet.dietary_restrictions?.map((option) => ({
                label: option,
                value: option,
            })))
            setAdoptionStatus({ label: pet.adoption_status, value: pet.adoption_status })
            setPetImage(pet.picture)
        }
    }, [pet]);

    const { ownerId, height, color, weight, name, breed, bio, hypoallergenic } = inputs;


    function handleInputChange(event) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const putPetSchema = yup.object().shape({
        type: yup.string().oneOf(['Dog', 'Cat']).required('Pet type is required'),
        adoption_status: yup.string().oneOf(['Available', 'Fostered', 'Adopted']).required('Adoption status is required'),
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

    async function handlePutPet(e) {
        try {
            e.preventDefault()

            const petData = {
                '_id': pet._id,
                'type': pet.type,
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

            await putPetSchema.validate({ ...petData, petImage });
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pet/put`, formData, { headers: { Authorization: `Bearer ${token}` } });

            if (res) {
                toast.success('Changes saved', toast_config);
                setClickUpdate(!clickUpdate)
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

    return (token && userObj.isAdmin && pet &&
        <div className='PutPet' style={{ opacity: isLoadingCards ? '40%' : '100%' }}>
            <form onSubmit={handlePutPet}>
                <div className="mb-3 put-pet-form-container block1">
                    <img className='pet-image-put' src={pet.picture}></img>
                    <br />
                    <label htmlFor="namePetInput" className="form-label">Name*</label>
                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control shadow-none" id="namePetInput" />

                    <label htmlFor="statusPetInput" className="form-label">Adoption status*</label>
                    <Select
                        value={adoptionStatus}
                        onChange={(option) => setAdoptionStatus(option)}
                        name="adoptionStatus"
                        options={[{ label: "Available", value: "Available" }, { label: "Fostered", value: "Fostered" }, { label: "Adopted", value: "Adopted" }]}
                        className="basic-single"
                        classNamePrefix="select"
                        id="statusPetInput"
                    />

                    <label htmlFor="ownerIdInput" className="form-label">Owner Id</label>
                    <input type="text" name="ownerId" value={ownerId} onChange={handleInputChange} className="form-control shadow-none" id="ownerIdInput" />

                    <label htmlFor="breedPetInput" className="form-label">Breed*</label>
                    <input type="text" name="breed" value={breed} onChange={handleInputChange} className="form-control shadow-none" id="breedPetInput" />

                    <label htmlFor="heightInput" className="form-label">Height (sm)*</label>
                    <input type="number" name="height" value={height} onChange={handleInputChange} className="form-control shadow-none" id="heightInput" />

                    <label htmlFor="weightInput" className="form-label">Weight (kg)*</label>
                    <input type="number" name="weight" value={weight} onChange={handleInputChange} className="form-control shadow-none" id="weightInput" />
                </div>

                <div className="mb-3 put-pet-form-container block2">

                    <label htmlFor="colorPetInput" className="form-label">Color*</label>
                    <input type="text" name="color" value={color} onChange={handleInputChange} className="form-control shadow-none" id="colorPetInput" />

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

                    <button type="submit" className="btn buttonPutPet" >SAVE CHANGES</button>
                </div>
            </form>
        </div>
    )
}

export default PutPet