import './App.css';
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
            {loading ? <LoadingPage /> :
                <div className='App'>
                    <HeaderPage />
                    <Routes>
                        <Route path={routes.home} element={<Home />} />
                        <Route path={routes.myPets} element={<MyPets />} />
                        <Route path={routes.profile} element={<Profile />} />
                        <Route path={routes.searchPage} element={<SearchPage />} />
                    </Routes>
                </div>}
        </UserContext>
    );
};

export default App;
