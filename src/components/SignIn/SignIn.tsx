import styles from './SignIn.module.css'
import APIService from '../../services/APIService'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await APIService.login(username, password)
            navigate('/')
        } catch (err) {
            setError('Failed to login')
        }
    }

    return (
        <div className={styles.crutch} style={{
            border: '0.125rem solid #000',
            borderRadius: '0.5rem',
            borderBottom: '0.5rem solid #000',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '50%',
margin: 'auto',
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                 width: '100%',
            }}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {error && <p>{error}</p>}
                <button type="submit">Sign In</button>
            </form>
            <p>New here? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default SignIn