import { Zoom } from 'react-toastify';

export const routes = {
  home: '/',
  myPets: '/myPets',
  profile: '/profile/',
  searchPageCats: '/searchCats',
  searchPageDogs: '/searchDogs',
  petPage: '/PetPage/:pet_id',
  addPet: '/addPet',
  putPet: '/putPet/:pet_id',
  dashboard: '/dashboard'
};

export const statusOptions = [{ label: "Available", value: "Available" }, { label: "Fostered", value: "Fostered" }, { label: "All", value: "All" }];

export const dietaryOptions = [{ label: "FISH", value: "FISH" }, { label: "DAIRY", value: "DAIRY" }, { label: "BEEF", value: "BEEF" }, { label: "SOY", value: "SOY" }, { label: "PORK", value: "PORK" }, { label: "WHEAT", value: "WHEAT" }, { label: "CORN", value: "CORN" }, { label: "CHICKEN", value: "CHICKEN" }, { label: "LAMB", value: "LAMB" }, { label: "VENISON", value: "VENISON" }];

export const toast_config = {
  transition: Zoom,
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

export const IDs_creators = ["646e147c7c8a09352a0c6170"]