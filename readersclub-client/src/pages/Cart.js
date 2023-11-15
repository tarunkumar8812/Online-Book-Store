import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import AddToCart from '../components/addToCart/AddToCart'



const Cart = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])


    return (
        <div>
            <Navbar></Navbar>
            {user && <AddToCart></AddToCart>}
            <Footer></Footer>
        </div>
    )
}

export default Cart