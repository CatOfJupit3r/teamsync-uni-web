import styles from './SignUp.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {FormEvent, useCallback, useState} from 'react'
import APIService from '../../services/APIService'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            await APIService.createAccount(username, name, password)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError('Failed to create account')
        }
    }

    const signUpButtonIsActivated = useCallback(() => {
        return username.length > 0 && password.length > 0 && name.length > 0
    }, [username, password, name])

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
            <h2>Sign Up</h2>
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
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {error && <p>{error}</p>}
                <button type="submit" disabled={!signUpButtonIsActivated()}>Sign Up</button>
            </form>
            <p>Already registered? <Link to="/login">Sign In</Link></p>
        </div>
    )
}


export default SignUp