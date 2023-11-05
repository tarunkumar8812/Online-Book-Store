import React from 'react'
import Navbar from '../components/navbar/Navbar.js'
import Footer from '../components/footer/Footer.js'
import Content from '../components/contents/Content.js'

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Content></Content>
            <Footer></Footer>
        </div>
    )
}

export default Home