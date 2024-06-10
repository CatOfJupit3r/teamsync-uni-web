import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";

const ProjectPage = () => {
    const { projectId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(projectId)
        if (!projectId || projectId === 'undefined') {
            navigate('/', { relative: 'path' })
        }
    }, [projectId, navigate])

    return <div>
        { projectId && <ProjectContainer projectId={projectId} /> }
    </div>
}

export default ProjectPage
