import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Box } from '@mui/material'
import TabBar from '../components/tabbar/TabBar'
import axios from 'axios'
import Card3 from '../components/card/Card3'
import Carousel from '../components/carousel/Carousel'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card1 from '../components/card/Card1'


const List = () => {
    const location = useLocation()

    const [data, setData] = useState([])
    const [resultPerPage, setResultPerPage] = useState(6)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            // const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
            // console.log(res.data.bookList);

            setLoading(false)
            setData(res.data.bookList)
        }
        fetchData()
    }, [])


    const handleChange = (e, value) => {
        setPage(value)
    }

    useEffect(() => {
        setPage(1)
    }, [location])

    const { field, value, lable } = location.state
    const filtered = data.filter((item, ind) => item[field] === value)
    const totalPages = Math.ceil(filtered.length / resultPerPage)

    return (
        <>
            <Navbar></Navbar>
            <TabBar></TabBar>
            {/* {!loading && <Carousel index={1}></Carousel>} */}

            {loading &&
                <Box sx={{ height: "90vh", width: "90vw", bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto" }} >
                    <h1 className='logo'>  Readers Club </h1>
                    <p> Loading...</p>
                </Box>
            }
            {!loading && <div
                style={{ margin: "10px auto", maxWidth: "1300px", border: "1px solid gray" }}>

                <p style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h2>{lable} </h2>
                    {!loading && <h4>Result Found: {filtered.length}, Page No: {page}/{totalPages || 1}</h4>}
                </p>

                {/* <div style={{ display: "flex", justifyContent: "space-between" }}>  <h2>List</h2> <h2>Sort</h2></div> */}


                <Box
                    sx={{ padding: "5px", maxWidth: "1080px", margin: "10px auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {!loading && filtered.length > 0 &&
                        filtered
                            .filter((item, ind) => ind >= ((page - 1) * resultPerPage) && ind < (page) * resultPerPage)
                            .map((book, ind) => {
                                return (<>
                                    <Card3 book={book} ind={(resultPerPage * (page - 1)) + ind}></Card3>
                                </>)
                            }).sort()
                    }
                    {!loading && filtered.length === 0 &&
                        <h2>No Result Found</h2>
                    }
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                    <Stack spacing={5}>
                        <Pagination
                            variant="outlined"
                            page={page} onChange={handleChange}
                            shape="rounded" count={totalPages || 1} />
                    </Stack>
                </Box>
            </div>
            }
            <Card1 heading="related to Your Search" data={data}></Card1>
            <Carousel index={3}></Carousel>
            <Footer></Footer>
        </>
    )
}

export default List