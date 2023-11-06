import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card1 from '../card/Card1'

const Content = () => {

  // const category = ['history', 'novel', 'biography']
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      // api calling using axios
      console.log('res.data.bookList');
      // const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
      const res = await axios.get(`https://readers-club-server.vercel.app/user/getAllBooks`)
      // const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
      // const res = await res.json
      console.log(res.data.bookList);

      setLoading(false)
      setData(res.data.bookList)
    }
    fetchData()
  }, [])

  const novel = data.filter((book) => book?.genre === 'novel')
  const biography = data.filter((book) => book?.genre === 'biography')
  const topRatedBooks = data.filter((book) => book?.ratings > 3).sort((a, b) => a.price - b.price)
  const topSellingBooks = data.filter((book) => book?.soldCopies > 3).sort((a, b) => a.soldCopies - b.soldCopies)


  return (
    <div>

      {loading &&
        <Box sx={{ width: "100vw", height: "90vh", bgcolor: 'white', display: "flex", justifyContent: "center", alignItems: "center" }} >
          <p> Loading...</p>
        </Box>
      }

      {!loading && <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        // m: '10px'

      }}>
        <Card1 heading="top rated" field="ratings" data={topRatedBooks}></Card1>
        <Card1 heading="novel" field="novel" data={novel}></Card1>
        <Card1 heading="top selling" field="Selling" data={topSellingBooks}></Card1>
        <Card1 heading="biography" field="Biography" data={biography}></Card1>
        <Card1 heading="business" field="novel" data={novel}></Card1>
        <Card1 heading="life" field="novel" data={novel}></Card1>

      </Box>}
    </div>
  )
}

export default Content