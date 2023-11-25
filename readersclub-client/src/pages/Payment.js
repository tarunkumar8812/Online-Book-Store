import React from 'react'
// import Navbar from '../components/navbar/Navbar'
// import Footer from '../components/footer/Footer'
import NotFound from '../components/notfound/NotFound'

const Payment = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <NotFound code={503} message={'Out of Service'} briefMessage={'The link you followed may be broken, or the page may have been out of service.'}></NotFound>
            {/* <Footer></Footer> */}
        </div>
    )
}

export default Payment