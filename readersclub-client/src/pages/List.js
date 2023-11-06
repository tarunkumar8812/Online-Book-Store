import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Box } from '@mui/material'


const List = () => {
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const genre = location.state
    console.log(genre);

    setLoading(true)
    return (
        <>
            <Navbar></Navbar>


            {loading &&
                <Box sx={{ height: "90vh", bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    <h1 className='logo'>  Readers Club</h1>
                    <p> Loading...</p>
                    <div>List</div>
                </Box>
            }
            {/* <div>{genre}</div> */}
            <Footer></Footer>
        </>
    )
}

export default List