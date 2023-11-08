import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hide from '../../assets/hide.png'
import show from '../../assets/show.png'
import './signupform.css'
import axios from 'axios'


const SignUpForm = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState({ fullname: "", phone: "", email: "", password: "", confirmPassword: "" })

    const [showPass, setShowPass] = useState(false)
    const [focused, setFocused] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)


    const fields = {
        fullname: {
            type: 'text', id: 'fullname', name: 'fullname', value: values.fullname, placeholder: 'John Doe', pattern: "^[A-Za-z .]{3,100}$",
            required: true
        },
        // date: {
        //     type: 'date', id: "date", name: 'date', value: "date", min: "1920-01-01", max: "2018-12-31", required: true
        // },
        email: {
            type: 'email', id: 'email', name: 'email', value: values.email, placeholder: 'johndoe@example.com',
            required: true
        },
        phone: {
            type: "tel", id: 'phone', name: 'phone', value: values.phone, placeholder: '98XX2121XX', pattern: "^[7-9]{1}[0-9]{9}$", required: true
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
        },
        address: {
            type: 'text', id: "address", name: 'address', value: "address", placeholder: 'Your address', pattern: "^[A-Za-z0-9 ]{3,50}$", required: true
        },
        state: {
            id: "state", name: 'state', value: "state", required: true
        },
        // city: {
        //     id: "city", name: 'city', value: "city", required: true, disabled: "state" === ""
        // },
        pincode: {
            type: 'text', id: "pincode", name: 'pincode', value: "pincode", placeholder: 'XX45XX', pattern: "^[0-9]{6}$", required: true, disabled: "state" === ""
        }
    }

    const handleFocus = (e) => {
        setFocused(true)
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    // ----------------- handle user Signup -----------------

    const handleSubmit = async (e) => {
        e.preventDefault()
        // await axios.post('http://localhost:5000/user/createUser', {
        await axios.post('https://bookmanagementserver.onrender.com/user/createUser', {
            ...values
        }).then((result) => {
            // window.location.reload()
            alert(result.data.message)
            navigate('/')
            // console.log(result.data.message);
        }).catch((err) => {
            window.location.reload()
            alert(err.response.data.message)
            // console.log(err, err.response.data.message);
        })
    }


    return (
        <div className='container'>
            <h2 className='form_heading'>SignUp Form</h2>
            <form className='formControl' onSubmit={(e) => { handleSubmit(e) }} method='post'>

                {/* input box for name */}
                <div className='inputBox'>
                    <input
                        {...fields.fullname}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        autoComplete="true"
                    ></input>
                    <lable className='input_lable' htmlFor='fullname'>Fullname<p className='hashtric'> *</p></lable>

                    <p className='errorMessage'>must contains only alphabets . with minimum 3 charcters</p>
                </div>


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


                {/* input box for phone */}
                <div className='inputBox'>
                    <input
                        {...fields.phone}
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                        autoComplete="true"
                    ></input>
                    <label className='input_lable' htmlFor='phone'>Phone<p className='hashtric'> *</p></label>
                    <p className='errorMessage'>phone number must be indian of 10 digits</p>
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

                > Signup </button>

                <p className='other'>already have an account? <a href='/login'>Login now</a></p>

                <p className='or'> or </p>

                <a href="https://www.google.com/account">
                    <button className='googleButton' type='button' ><img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png' alt='google_img'></img>  Login with Google </button>
                </a>
            </form>
        </div>
    )
}

export default SignUpForm