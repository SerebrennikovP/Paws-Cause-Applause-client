import './CSS/App.css';
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { routes } from "./constants"
import UserContext from './context/UserContext';
import HeaderPage from './components/HeaderPage';
import MyPets from './components/MyPets';
import Home from './components/Home';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';
import LoadingPage from './components/Loading';
import PetPage from './components/PetPage';
import PetContext from './context/PetContext';
import { ToastContainer } from 'react-toastify';
import AddPet from './components/AddPet';
import Dashboard from './components/Dashboard';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <UserContext>
            <ToastContainer />
            <PetContext>
                {loading ? <LoadingPage /> :
                    <div className='App'>
                        <HeaderPage />
                        <Routes>
                            <Route path={routes.home} element={<Home />} />
                            <Route path={routes.myPets} element={<MyPets />} />
                            <Route path={routes.profile} element={<Profile />} />
                            <Route path={routes.searchPageCats} element={<SearchPage type="Cat" />} />
                            <Route path={routes.searchPageDogs} element={<SearchPage type="Dog" />} />
                            <Route path={routes.petPage} element={<PetPage />} />
                            <Route path={routes.dashboard} element={<Dashboard />} />
                            <Route path={routes.addPet} element={<AddPet />} />
                        </Routes>
                    </div>}
            </PetContext>
        </UserContext>
    );
};

export default App;
