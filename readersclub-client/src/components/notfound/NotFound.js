import React from 'react'
import './notfound.css'

const NotFound = ({ code, message, briefMessage }) => {
    return (
        <div className='pagenotfound'>


            <h2>{code || 404}</h2>

            <h5>{message || "Page Not Found"}</h5>

            <p> {briefMessage || 'The link you followed may be broken, or the page may have been removed.'} <a href='/'>Go Back</a> to Home Page.</p>

        </div>
    )
}

export default NotFound