import React from 'react'
import Navbar from '../components/navbar/Navbar.js'
import Footer from '../components/footer/Footer.js'
import Content from '../components/contents/Content.js'
import TabBar from '../components/tabbar/TabBar.js'

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <TabBar></TabBar>
            <Content></Content>
            <Footer></Footer>
        </div>
    )
}

export default Home