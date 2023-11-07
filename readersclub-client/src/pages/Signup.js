import React, { useContext, useEffect } from 'react'
import SignUpForm from '../components/signupForm/SignUpForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <SignUpForm></SignUpForm>
        </>
    )
}

export default Signup