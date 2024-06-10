import { useCallback, useEffect, useState } from 'react'
import { ProjectInfo } from '../../models/APIModels'
import APIService from '../../services/APIService'
import styles from './ProjectContainer.module.css'
import TaskList from './TaskList/TaskList'
import UserList from './UserList/UserList'
import CreateNewTask from "./CreateNewTask";

const ProjectContainer = ({ projectId }: { projectId: string }) => {
    const [project, setProject] = useState({
        name: '',
        description: '',
        createdAt: Date.now().toString(),
        users: [],
        role: 'viewer',
        tasks: [],
    } as ProjectInfo)
    const [error, setError] = useState('')

    useEffect(() => {
        APIService.getProjectInfo(projectId)
            .then((data) => {
                setProject(data)
            })
            .catch((err) => {
                setError(err)
            })
    }, [projectId])

    const DateCreated = useCallback(() => {
        return <p>Created at: {new Date(project.createdAt).toLocaleDateString()} 🎉</p>
    }, [project.createdAt])


    return (
        <div className={styles.projectContainer}>
            <div>
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        border: '0.125rem solid #000',
                        borderRadius: '0.5rem',
                        borderBottom: '0.5rem solid #000',
                        padding: '0.5rem',
                    }}
                >
                    {project.name}
                </h2>
                <p
                    style={{
                        fontSize: '18px',
                        color: '#757575',
                        fontWeight: 'normal',
                        padding: '0.5rem',
                        border: '0.125rem solid #000',
                        borderRadius: '0.5rem',
                        borderBottom: '0.25rem solid #000',
                    }}
                >
                    {project.description}
                </p>
                <DateCreated />
                {error && <p>{error}</p>}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '0.5rem',
                paddingTop: '0',
                margin: 0
            }}>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    border: '0.125rem solid #000',
                    borderRadius: '0.5rem',
                    borderBottom: '0.4rem solid #000',
                    padding: '0.5rem',
                }}>Users</h3>
                <UserList users={project.users} />
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    border: '0.125rem solid #000',
                    borderRadius: '0.5rem',
                    borderBottom: '0.4rem solid #000',
                    padding: '0.5rem',
                }}>Tasks</h3>
                {<CreateNewTask projectId={projectId} users={project.users} />}
                <TaskList tasks={project.tasks} />
            </div>
        </div>
    )
}

export default ProjectContainer
