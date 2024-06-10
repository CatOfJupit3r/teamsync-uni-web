import styles from './SignIn.module.css'
import APIService from '../../services/APIService'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await APIService.login(username, password)
        } catch (err) {
            setError('Failed to login')
        }
    }

    return (
        <div className={styles.crutch}>
            <form onSubmit={handleSubmit}>
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