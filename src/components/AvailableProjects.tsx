import React, { useEffect, useState } from 'react'
import APIService from '../services/APIService'

const AvailableProjects = () => {
    const [projects, setProjects] = useState([] as any[])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await APIService.getJoinedProjects()
                setProjects(data)
            } catch (err) {
                console.error('Failed to fetch projects', err)
            }
        }

        fetchProjects().then()
    }, [])

    return (
        <div>
            <h2>Available Projects</h2>
            {projects.length > 0 ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No projects available.</p>
            )}
        </div>
    )
}

export default AvailableProjects