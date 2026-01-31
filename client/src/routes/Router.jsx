import React from 'react'
import { Route, Routes } from "react-router-dom";
import ROUTES from './routesDict';
import RegisterPage from '../pages/pagesComponents/RegisterPage';
import LoginPage from '../pages/pagesComponents/LoginPage';
import HomePage from '../pages/pagesComponents/HomePage';
import About from '../pages/pagesComponents/About';
import MyProfile from '../pages/pagesComponents/MyProfile';
import FavoriteProfiles from '../pages/pagesComponents/FavoriteProfiles';
import ErrorPage from "../pages/pagesComponents/ErrorPage";
import SandBox from '../pages/pagesComponents/SandBox';
import UserProfile from '../pages/pagesComponents/UserProfile';
import DeveloperRegisterPage from '../pages/pagesComponents/DeveloperRegisterPage';
import RecruiterRegisterPage from '../pages/pagesComponents/RecruiterRegisterPage';
import RecruiterDashboard from '../pages/pagesComponents/RecruiterDashboard';
import JobsPage from '../pages/pagesComponents/JobsPage';
import JobDetailPage from '../pages/pagesComponents/JobDetailPage';
import CreateJobPage from '../pages/pagesComponents/CreateJobPage';
import ContactPage from '../pages/pagesComponents/ContactPage';


function Router() {
    return (
        <Routes>
            <Route path={ROUTES.root} element={<HomePage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.registerDev} element={<DeveloperRegisterPage />} />
            <Route path={ROUTES.registerRecruiter} element={<RecruiterRegisterPage />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.myProfile} element={<MyProfile />} />
            <Route path={ROUTES.favorite} element={<FavoriteProfiles />} />
            <Route path={`${ROUTES.userProfile}/:userId`} element={<UserProfile />} />
            <Route path={ROUTES.jobs} element={<JobsPage />}/>
            <Route path={`${ROUTES.jobsDetailPage}/:id`} element={<JobDetailPage />}/>
            <Route path={ROUTES.createJob} element={<CreateJobPage />}/>
            <Route path={ROUTES.recruiterDashboard} element={<RecruiterDashboard />}/>
            <Route path={ROUTES.contactPage} element={<ContactPage />}/>
            <Route path={ROUTES.sandbox} element={<SandBox />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Router