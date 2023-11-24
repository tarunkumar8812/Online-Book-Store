import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ResetPassword from '../components/resetPassword/ResetPassword'
const ForgotPassword = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <ResetPassword></ResetPassword>
        </>
    )
}

export default ForgotPassword