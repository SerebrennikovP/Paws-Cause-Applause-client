import React, { useEffect, useContext, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { UserContextInstance } from '../context/UserContext'
import Checkbox from '@mui/material/Checkbox';
import { IDs_creators, toast_config } from "../constants"
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import PetPageModal from '../modal/PetPageModal';

function DashboardUsers() {

    const { token, userId } = useContext(UserContextInstance)
    const [modalPetPageShow, setModalPetPageShow] = useState(false)
    const [users, setUsers] = useState([])
    const [updateGetPets, setUpdateGetPets] = useState(false)
    const [isMyPets, setIsMyPets] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)


    useEffect(() => {
        async function getUsers() {
            try {
                const allUsers = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getAllUsers`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const modifiedUsers = allUsers.data.map((user) => {
                    const { _id, ...rest } = user;
                    return { id: _id, ...rest };
                });
                setUsers(modifiedUsers);
            } catch (err) {
                console.log(err);
            }
        }
        getUsers();

    }, [updateGetPets]);

    const handleIsAdminChange = async (id, value) => {
        try {
            const updatedUsers = await Promise.all(users.map(async (user) => {
                if (user.id === id && !IDs_creators.includes(user.id)) {

                    const updatedUser = { ...user, isAdmin: value }
                    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/changeAdmin`, { "id": user.id, "isAdmin": value }, { headers: { Authorization: `Bearer ${token}` } });
                    response && toast.success('Admin is changed', toast_config);
                    return updatedUser;
                }
                return user;
            }));
            setUsers(updatedUsers)
        }
        catch (err) {
            toast.warn(err.message, toast_config);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'lastname', headerName: 'Lastname', width: 150 },
        { field: 'email', headerName: 'Email', width: 280, },
        { field: 'phone', headerName: 'Phone', width: 140, },
        {
            field: 'isAdmin', headerName: 'is Admin?', type: 'boolean', width: 90,
            renderCell: (params) => (
                <Checkbox
                    type="checkbox"
                    disabled={!IDs_creators.includes(userId)}
                    checked={params.value}
                    onChange={(e) => handleIsAdminChange(params.row.id, e.target.checked)}
                />
            ),
        },
        {
            field: 'myPetsArray', headerName: 'Adopted/Fostered', width: 230, renderCell: (params) => (
                <div className='my-pets-links-wrapper'>
                    {params.formattedValue.map((element, index) => (
                        <div key={index}><a className='my-pets-links' onClick={() => { setIsMyPets(true); setModalPetPageShow(element) }} style={{ display: 'flex' }}>
                            {element}
                        </a>
                            {isMyPets && !isFavorite && <PetPageModal
                                show={isMyPets && modalPetPageShow === element}
                                onHide={() => { setModalPetPageShow(false); setIsMyPets(false) }}
                                pet_id={element}
                                onChangeAny={() => setUpdateGetPets(!updateGetPets)}
                                isClosedByReturn={() => { setIsFavorite(false); setIsMyPets(false) }}
                                isClosedByUnfavorite={() => {}}
                            />}</div>
                    ))
                    }
                </div >
            ),

        },
        { field: 'date', headerName: 'Registration date', type: 'dateTime', width: 170, valueGetter: (params) => new Date(params.value) },
        {
            field: 'bio', headerName: 'Bio', width: 300, renderCell: (params) => (
                <div className='bio-dashboard-wrapper'>{params.value}
                </div >
            ),
        },
        {
            field: 'favorite', headerName: 'Favorite', width: 230, renderCell: (params) => (
                <div className='favorite-links-wrapper'>
                    {params.formattedValue.map((element, index) => (
                        <div key={index}><a className='favoriteLinks' onClick={() => { setModalPetPageShow(element); setIsFavorite(true) }} style={{ display: 'flex' }}>
                            {element}
                        </a>
                            {isFavorite && !isMyPets && <PetPageModal
                                show={isFavorite && modalPetPageShow === element}
                                onHide={() => { setModalPetPageShow(false); setIsFavorite(false); setIsMyPets(false) }}
                                pet_id={element}
                                onChangeAny={() => setUpdateGetPets(!updateGetPets)}
                                isClosedByUnfavorite={() => { setIsFavorite(false); setIsMyPets(false) }}
                                isClosedByReturn={() => {}}
                            />}</div>
                    ))
                    }
                </div >
            ),

        },
    ];

    const rows = users;

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    return (users.length === 0 ?
        <CircularProgress /> :
        <div className='table-users' style={{ height: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                getRowHeight={() => 'auto'}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />
        </div>
    );
}

export default DashboardUsers