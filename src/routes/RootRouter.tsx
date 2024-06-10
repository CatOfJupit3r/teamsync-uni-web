import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import useIsLoggedIn from '../hooks/useIsLoggedIn'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import HomePage from '../pages/HomePage'
import ProjectPage from '../pages/ProjectPage'
import NotFoundPage from "../pages/NotFoundPage";

const RootRouter = () => {
    const { isLoggedIn } = useIsLoggedIn()
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route index element={<HomePage />} />
                        <Route path="/project/:projectId" element={<ProjectPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </>
                    ): (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path='*' element={<Navigate to="/login" />} />
                    </>
                    )
                }
            </Routes>
        </Router>
    )
}

export default RootRouter