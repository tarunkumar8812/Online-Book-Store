import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'


const List = () => {
    const location = useLocation()
    const genre = location.state
    console.log(genre);


    return (
        <>
            <Navbar></Navbar>
            <div>List</div>
            <div>{genre}</div>
            <Footer></Footer>
        </>
    )
}

export default List