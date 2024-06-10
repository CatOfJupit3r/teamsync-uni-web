import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to={'/'} relative={"path"}>Go to Home Page</Link>
        </div>
    )
}

export default NotFoundPage
