import styles from './SignUp.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import APIService from '../../services/APIService'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await APIService.createAccount(username, password)
        } catch (err) {
            setError('Failed to create account')
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
                <button type="submit">Sign Up</button>
            </form>
            <p>Already registered? <Link to="/login">Sign In</Link></p>
        </div>
    )
}


export default SignUp