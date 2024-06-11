import React from 'react'
import AvailableProjects from '../components/AvailableProjects'
import JoinProject from '../components/JoinProject'
import AuthManager from '../services/AuthManager'

const HomePage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '50%',
            margin: 'auto',
        }}>
            <h1>Home Page</h1>
            <AvailableProjects />
            <JoinProject />
            <button onClick={() => {
                AuthManager.logout()
            }}>Logout</button>
        </div>
    )
}

export default HomePage