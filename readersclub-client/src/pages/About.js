import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import NotFound from '../components/notfound/NotFound'

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div style={{textAlign:"center"}}><NotFound code={503} message={"Under Maintenance"} briefMessage={'The link you followed may be broken, or the page is under Maintenance.'}></NotFound></div>
            <Footer></Footer>
        </div>
    )
}

export default About