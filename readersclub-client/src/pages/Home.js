import React from 'react'
import Navbar from '../components/navbar/Navbar.js'
import Footer from '../components/Footer.js'
import Content from '../components/Content.js'

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            Home
            <Content></Content>
            <Footer></Footer>
        </div>
    )
}

export default Home