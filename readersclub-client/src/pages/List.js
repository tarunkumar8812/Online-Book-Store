import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Box } from '@mui/material'
import TabBar from '../components/tabbar/TabBar'
import axios from 'axios'
import Card3 from '../components/card/Card3'
// import Card1 from '../components/card/Card1'


const List = () => {
    const location = useLocation()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            // const res = await axios.get(`https://readers-club-server.vercel.app/user/getAllBooks`)
            // const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
            // console.log(res.data.bookList);

            setLoading(false)
            setData(res.data.bookList)
        }
        fetchData()
    }, [])


    const { field, value, lable } = location.state
    const filtered = data.filter((item) => item[field] === value)
    // setLoading(false)
    return (
        <>
            <Navbar></Navbar>
            <TabBar></TabBar>
            {loading &&
                <Box sx={{ height: "90vh", bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    <h1 className='logo'>  Readers Club </h1>
                    <p> Loading...</p>
                </Box>
            }
            <div
                style={{ margin: "10px auto", maxWidth: "1600px", padding: "5px", border: "1px solid gray" }}>

                <p> <h2>{lable} </h2>Result Found: {filtered.length}</p>

                {/* <div style={{ display: "flex", justifyContent: "space-between" }}>  <h2>List</h2> <h2>Sort</h2></div> */}


                <div
                    style={{ padding: "5px", width: "auto", maxWidth: "1080px", margin: "10px auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>


                    {!loading && filtered.length > 0 &&
                        filtered.map((book, ind) => {
                            return (<>
                                <Card3 book={book} ind={ind}></Card3>
                            </>)
                        })
                    }

                    {!loading && filtered.length === 0 &&
                        <h2>No Result Found</h2>
                    }
                </div>
            </div>
            {/* <Card1 heading="related to Your Search" data={data}></Card1> */}
            <Footer></Footer>
        </>
    )
}

export default List