import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Card1 from '../card/Card1'
import axios from 'axios'
import './content.css'
import Carousel from '../carousel/Carousel'
const Content = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // api calling using axios
      // const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
      const res = await axios.get(`https://onlinebookstoreserver.vercel.app/user/getAllBooks`)
      // const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
      // console.log(res.data.bookList);

      setLoading(false)
      setData(res.data.bookList)
    }
    fetchData()
  }, [])

  const novel = data.filter((book) => book?.genre === 'novel')
  const biography = data.filter((book) => book?.genre === 'biography')
  const selfHelp = data.filter((book) => book?.genre === 'self-help book')
  const topRatedBooks = data.filter((book) => book?.ratings > 3).sort((a, b) => a.price - b.price)
  const topSellingBooks = data.filter((book) => book?.soldCopies > 3).sort((a, b) => a.soldCopies - b.soldCopies)


  return (
    <div>

      {loading &&
        <Box sx={{ height: "90vh", bgcolor: 'white', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
          <p className='logo'>Readers Club</p>
          <p> Loading...</p>
        </Box>
      }

      {!loading && <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        // m: '10px'

      }}>
        <Carousel index={0}></Carousel>
        <Card1 heading="top rated" field="ratings" data={topRatedBooks}></Card1>
        <Card1 heading="novel" field="novel" data={novel}></Card1>
        <Carousel index={4}></Carousel>

        <Card1 heading="self-Help books" field="genre" data={selfHelp}></Card1>
        <Card1 heading="top selling" field="Selling" data={topSellingBooks}></Card1>
        <Card1 heading="biography" field="Biography" data={biography}></Card1>
        <Card1 heading="miscellaneous" field="novel" data={novel}></Card1>
        <Carousel index={3}></Carousel>

        {/* <Card1 heading="life" field="novel" data={novel}></Card1> */}

      </Box>}
    </div>
  )
}

export default Content