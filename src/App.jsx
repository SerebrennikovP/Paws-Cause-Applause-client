import './App.css';
import { Routes, Route } from 'react-router-dom';
import { routes } from "./constants"
import UserContext from './context/UserContext';
import HeaderPage from './components/HeaderPage';
import MyPets from './components/MyPets';
import Home from './components/Home';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';

const App = () => {
    return (
        <div className='App'>
            <UserContext>
                <HeaderPage />
                <Routes>
                    <Route path={routes.home} element={<Home />} />
                    <Route path={routes.myPets} element={<MyPets />} />
                    <Route path={routes.profile} element={<Profile />} />
                    <Route path={routes.searchPage} element={<SearchPage />} />
                </Routes>
            </UserContext>
        </div>
    );
};

export default App;
