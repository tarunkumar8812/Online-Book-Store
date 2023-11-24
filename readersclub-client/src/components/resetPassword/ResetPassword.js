import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios'


const ResetPassword = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({ email: "", password: "", confirmPassword: "" })

    const [typedOTP, setTypedOTP] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [focused, setFocused] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [wrongOTP, setWrongOTP] = useState(false)
    const [open, setOpen] = useState(false);



    const fields = {

        email: {
            type: 'email', id: 'email', name: 'email', value: values.email, placeholder: 'johndoe@example.com',
            required: true
        },
        password: {
            type: showPass ? 'text' : 'password', id: 'password', name: 'password', value: values.password, placeholder: 'xxxxxxxx',
            // pattern: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$",
            pattern: "^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=.*[@#$%^&+=])" + "(?=\\S+$).{8,20}$",
            required: true
        },
        confirmPassword: {
            type: "text", id: 'confirmPassword', name: 'confirmPassword', value: values.confirmPassword, placeholder: 'xxxxxxxx', pattern: values.password,
            required: true
        }
    }

    const handleFocus = (e) => {
        setFocused(true)
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    // ----------------- generateOTP to reset password -----------------
    const generateOTP = async (e) => {
        e.preventDefault()
        // await axios.post('http://localhost:5000/user/generateOTP', {
            await axios.post('https://onlinebookstoreserver.vercel.app/user/generateOTP', {
            ...values
        }).then((result) => {
            // window.location.reload()
            setEmail(result.data.email)
            setPass(result.data.pass)
            setOTP(result.data.message)
            console.log(`Dear User, OTP to change ReadersClub Login Password ${result.data.message}. Do not share with anyone -ReadersClub.`)
            setOpen(true)
        }).catch((err) => {
            // window.location.reload()
            alert(err.response.data.message)
            // console.log(err, err.response.data.message);
        })
    }


    // ----------------- reset Password API -----------------
    const resetPassword = async (e) => {
        e.preventDefault()
        // await axios.post('http://localhost:5000/user/resetPassword', {
        await axios.post('https://onlinebookstoreserver.vercel.app/user/resetPassword', {
            email, typedOTP, pass
        }).then((result) => {
            // window.location.reload()
            setOpen(false)
            alert(result.data.message);
            setWrongOTP(false)
            navigate('/login')
        }).catch((err) => {
            setWrongOTP(true)
            alert(err.response.data.message)
            // console.log(err, err.response.data.message);
        })
    }

    return (
        <div className='container'>

            <Dialog open={open}>
                {wrongOTP && <Box component='p' sx={{ color: "red" }}>Invalid OTP!</Box>}
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{ textTransform: "none" }}
                    >
                        To reset Password please enter OTP sent in inspect section of your browser.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id="name"
                        label=" OTP"
                        type="text"
                        fullWidth
                        value={typedOTP}
                        onChange={(e) => { setTypedOTP(e.target.value) }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={generateOTP}>Resend OTP</Button>
                    <Button variant='contained' onClick={resetPassword}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto" }} >
                <p className='logo' onClick={() => { navigate('/') }}>  Readers Club </p>
            </Box>

            <h3 className='form_heading'>Reset Password</h3>
            <form className='formControl' onSubmit={(e) => { generateOTP(e) }} method='post'>

                {/* input box for email */}
                <div className='inputBox'>
                    <input
                        {...fields.email}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        autoComplete="true"
                    ></input>
                    <label className='input_lable' htmlFor='email'>Email<p className='hashtric'> *</p></label>
                    <p className='errorMessage'>invalid email (ex- john@example.com)</p>
                </div>



                {/* input box for password */}
                <div className='inputBox'>
                    {/* <div> */}
                    <input
                        {...fields.password}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        autoComplete="true"
                    >
                    </input>
                    <img alt='eye_img' onClick={() => setShowPass(!showPass)} src={showPass ? show : hide}></img>
                    <label className='input_lable' htmlFor='password'>New Password<p className='hashtric'> *</p></label>
                    <p className='errorMessage'>Must contain at least one number, one uppercase, lowercase letter, a special character wiht min. 8 characters</p>
                    {/* </div> */}
                </div>


                {/* input box for confirm Password */}
                <div className='inputBox'>
                    <input
                        {...fields.confirmPassword}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        autoComplete="true"
                    // autoComplete='false'
                    ></input>
                    <label className='input_lable' htmlFor='confirmPassword'>Confirm Password<p className='hashtric'> *</p></label>

                    {fields?.password.value.length > 0 && <p className='errorMessage'>doesn't match with password</p>}
                </div>

                <div className='checkbox'>
                    <input type="checkbox" id="terms" name="terms"
                        onChange={() => { setAcceptTerms(!acceptTerms) }}
                        checked={acceptTerms} />
                    <p className='other' >I accept all <a href='/terms&conditions'>terms & conditions</a> </p>
                </div>

                <button disabled={!acceptTerms} className='submitButton' type='submit'

                > Reset Password </button>

                <p className='other'>already have an account? <a href='/login'>Login now</a></p>

                {/* <p className='or'> or </p> */}

                <p className='other'>I'm a new User? <a href='/signup'>Register Now</a></p>

                {/* <a href="https://www.google.com/account">
                    <button className='googleButton' type='button' ><img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png' alt='google_img'></img>  Signup with Google </button>
                </a> */}
            </form>


        </div>
    )
}

export default ResetPassword