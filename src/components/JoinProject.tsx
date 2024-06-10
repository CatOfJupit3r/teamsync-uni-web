import { useState } from 'react'
import APIService from '../services/APIService'
import { useNavigate } from 'react-router-dom'

const JoinProject = () => {
    const [projectCode, setProjectCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleJoinProject = async () => {
        if (projectCode === '') {
            setError('Please enter a project code')
            return
        }
        setLoading(true)
        try {
            const { projectId } = await APIService.joinProject(projectCode)
            navigate(`/project/${projectId}`, { relative: 'path' })
        } catch (error) {
            setError('Invalid project code')
        }
        setLoading(false)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter project code"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
            />
            <button onClick={handleJoinProject} disabled={loading}>
                {loading ? 'Joining Project...' : 'Join Project'}
            </button>
            {error && <div>{error}</div>}
        </div>
    )
}

export default JoinProject