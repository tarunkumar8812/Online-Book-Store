import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/loginForm/LoginForm'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {

            navigate('/')
        }
    }, [user])


    return (
        <><LoginForm></LoginForm></>
    )
}

export default Login