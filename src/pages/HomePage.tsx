import React from 'react'
import AvailableProjects from '../components/AvailableProjects'
import JoinProject from '../components/JoinProject'

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <AvailableProjects />
            <JoinProject />
        </div>
    )
}

export default HomePage