import React from 'react'
import { Route, Routes } from "react-router-dom";
import ROUTES from './routesDict';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import MyProfile from '../pages/MyProfile';
import FavoriteProfiles from '../pages/FavoriteProfiles';
import ErrorPage from "../pages/ErrorPage";



function Router() {
    return (
        <Routes>
            <Route path={ROUTES.root} element={<HomePage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.myProfile} element={<MyProfile />} />
            <Route path={ROUTES.favorite} element={<FavoriteProfiles />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Router