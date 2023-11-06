import React from 'react'
import './notfound.css'

const NotFound = () => {
    return (
        <div className='pagenotfound'>


            <h2>404</h2>

            <h5> Page Not Found</h5>

            <p> The link you followed may be broken, or the page may have been removed. <a href='/'>Go Back</a> to Home Page.</p>

        </div>
    )
}

export default NotFound