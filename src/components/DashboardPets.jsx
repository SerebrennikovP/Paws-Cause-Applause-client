import React, { useEffect, useContext, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { UserContextInstance } from '../context/UserContext'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CircularProgress from '@mui/material/CircularProgress';
import { routes } from "../constants"
import { useNavigate } from 'react-router-dom'

function DashboardPets() {
    const navigate = useNavigate()
    const { token } = useContext(UserContextInstance)
    const [pets, setPets] = useState([])

    useEffect(() => {
        async function getPets() {
            try {
                const allPets = await axios.get('http://localhost:8080/pet/getAllPets', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const modifiedPets = allPets.data.map((user) => {
                    const { _id, ...rest } = user;
                    return { id: _id, ...rest };
                });
                setPets(modifiedPets);
            } catch (err) {
                console.log(err);
            }
        }
        getPets();
    }, []);

    const handleOpenInFull = (id) => {
        const url = routes.petPage.replace(':pet_id', id);
        window.open(url, '_blank');
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'type', headerName: 'Type', width: 50 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'adoption_status', headerName: 'Adoption status', width: 120, },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            renderCell: (params) => (
                <>
                    <ModeEditIcon onClick={()=>navigate(routes.putPet.replace(':pet_id', params.id))}/>
                    <OpenInFullIcon onClick={() => handleOpenInFull(params.id)} />
                </>

            ),
        },
        { field: 'breed', headerName: 'Breed', width: 300, },
        { field: 'owner_id', headerName: 'Owner id', width: 220, },
        { field: 'date', headerName: 'Added date', type: 'dateTime', width: 170, valueGetter: (params) => new Date(params.value) },
    ];

    const rows = pets;

    return (pets.length === 0 ?
        <CircularProgress /> :
        <div className='table-pets' style={{ height: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                getRowHeight={() => 'auto'}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}

export default DashboardPets