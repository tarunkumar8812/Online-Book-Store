import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Box } from '@mui/material'
import './loginform.css'


const LoginForm = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const { authDispatch } = useContext(AuthContext)

    const [showPass, setShowPass] = useState(false)
    const [otp, setOtp] = useState(false)

    const fields = {
        email: {
            type: 'email', id: 'email', name: 'email', value: credentials.email, placeholder: 'johndoe@example.com',
            required: true
        },
        password: {
            type: showPass ? 'text' : 'password', id: 'password', name: 'password', value: credentials.password, placeholder: 'xxxxxxxx',
            required: true
        }
    }


    const [focused, setFocused] = useState(false)
    const [notRobot, setNotRobot] = useState(false)

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleFocus = () => {
        setFocused(true)
    }
    // ----------------- handle user login -----------------




    const handleSubmit = async (e) => {
        e.preventDefault()
        authDispatch({ type: "LOGIN_START" })

        await axios.post('https://onlinebookstoreserver.vercel.app/user/login', {
            ...credentials
        }).then((result) => {
            // window.location.reload()
            authDispatch({ type: "LOGIN_SUCCESS", payload: result?.data?.token })
            navigate(location?.state?.redirect || "/")
            alert(result?.data?.message)
            // console.log(result.data.data);
        }).catch((err) => {
            authDispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message })
            alert(err.response.data.message)
            window.location.reload()
            // console.log(err, err.response.data.message);
        })
    }


    return (
        <div className='container'>
            <Box sx={{  bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto" }} >
                <p className='logo' onClick={()=>{navigate('/')}}>  Readers Club </p>
            </Box>
            <h3 className='form_heading'>Login Form</h3>
            <form className='formControl' method='post' onSubmit={(e) => { handleSubmit(e) }}>


                <p className='errorMessage'> error message error message</p>

                {/* input box for email */}
                <div className='inputBox'>
                    <input
                        {...fields.email}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                    ></input>
                    <label className='input_lable' htmlFor='email'>Email
                        <p className='hashtric'> *</p>
                    </label>
                    <p className='errorMessage'>email is required!</p>
                </div>



                {/* input box for password */}
                <div className='inputBox'>
                    <input
                        {...fields.password}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                    >
                    </input>
                    <img onClick={() => setShowPass(!showPass)} src={showPass ? show : hide} alt='eye_img' ></img>
                    <label className='input_lable' htmlFor='password'>Password<p className='hashtric'> *</p></label>
                    <p className='errorMessage'> password is required!</p>
                </div>




                <div className='checkbox'>
                    <input type="checkbox" id="terms" name="terms"
                        onClick={() => { setNotRobot(!notRobot) }}
                        checked={notRobot} />
                    <p className='other' for="terms">I'm not a Robot</p>
                </div>

                <button disabled={!notRobot} className='submitButton' type='submit'> Login </button>

                <p className='other'>I'm a new User? <a href='/signup'>Register Now</a></p>
                {/* <br /> */}
                <p className='other'>Forgot Password? <a href='/forgotPassword'>Create New Password</a></p>

                <p className='or'> or </p>



                <a href="https://www.google.com/account">
                    <button className='googleButton' type='button' ><img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png' alt='google_img'></img>  Login with Google </button>
                </a>

            </form>

            {otp && <div className='dialogBox'>
                <div className='inputBox'>
                    <input
                        name='otp'
                        placeholder='enter OTP'
                        type='text'
                        pattern="^[0-9]{6}$"
                        onChange={onChange}
                        onAbort={() => setOtp(false)}

                    ></input>
                    <label className='input_lable' htmlFor='otp'>OTP
                    </label>
                    {/* <p className='errorMessage'>invalid email (ex- john@example.com)</p> */}
                </div>
                <div className='actionButton'>
                    <button className='otpBtn' type='submit' onClick={() => setOtp(false)}>Submit</button>
                    <button className='otpBtn' type='button'>Resend</button>
                </div>
            </div>}
        </div>
    )
}

export default LoginForm