import { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom'
import { routes } from "../constants"
import "../CSS/cardPet.css"
import { UserContextInstance } from '../context/UserContext'
import { PetContextInstance } from '../context/PetContext'


export default function CardPet({ pet }) {
    const { userObj } = useContext(UserContextInstance)
    const { handleClipboard, isLoadingCards, handleFavorite } = useContext(PetContextInstance)
    const [favorited, setFavorited] = useState(false)
    const navigate = useNavigate()

    async function handleClick() {
        navigate(routes.petPage.replace(':pet_id', pet._id))
    }

    useEffect(() => {
        userObj?.favorite?.find(id => id == pet._id) && setFavorited(true)
    }, [])

    return (
        <Card sx={{
            height: 400, width: 300, mx: 2, my: 2, color: '#f9eee2', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.7)', borderRadius: '12px', background: '#005fff', opacity: isLoadingCards ? '40%' : '100%'
        }}>
            <CardHeader
                title={pet.name?.toUpperCase()}
                subheader={pet.adoption_status}
                sx={{ px: 2, py: 1, height: 70, cursor: 'pointer' }}
                onClick={handleClick} />
            <CardMedia
                component="img"
                height="220"
                image={pet.picture}
                alt={pet.name}
                sx={{ objectFit: 'cover', objectPosition: 'top', cursor: 'pointer' }}
                onClick={handleClick}
            />
            <CardContent sx={{ px: 2, py: 1, pb: 0, height: 60 }}>
                <Typography noWrap sx={{ mx: 0, my: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{pet.breed}</Typography>
                <Typography paragraph sx={{ mx: 0, my: 0 }}>{pet.weight} Kg</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ py: 0, height: 50 }}>
                <IconButton aria-label="add to favorites" onClick={() => handleFavorite(pet._id, favorited, setFavorited)}>
                    {favorited ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
                </IconButton>
                <IconButton aria-label="share" onClick={() => handleClipboard(pet._id)}>
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}
