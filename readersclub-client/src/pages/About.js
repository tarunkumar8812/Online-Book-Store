import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import NotFound from '../components/notfound/NotFound'

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <NotFound code={503} message={"Page is under Maintenance"} briefMessage={'The link you followed may be broken, or the page is under Maintenance.'}></NotFound>
            <Footer></Footer>
        </div>
    )
}

export default About