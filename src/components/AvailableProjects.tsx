import React, { useEffect, useState } from 'react'
import APIService from '../services/APIService'
import {Link} from "react-router-dom";

const AvailableProjects = () => {
    const [projects, setProjects] = useState([] as Array<{
        projectId: string
        projectName: string
        role: 'owner' | 'manager' | 'participant' | 'viewer'
    }>)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await APIService.getJoinedProjects()
                console.log('Projects:', data)
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
                    {projects.map((project, index) => (
                        <Link to={`/project/${project.projectId}`} key={index}>
                            <p>{project.projectName} ({project.role})</p>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No projects available.</p>
            )}
        </div>
    )
}

export default AvailableProjects