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
      const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
      // const res = await res.json
      setLoading(false)
      setData(res.data.bookList)
    }
    fetchData()
  }, [])

  const novel = data.filter((book) => book?.genre === 'novel')
  const biography = data.filter((book) => book?.genre === 'biography')
  const life = data.filter((book) => book?.genre === 'life')
  const business = data.filter((book) => book?.genre === 'business')
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
        width: 'auto',
        // p: '20px',
        m: '10px'

      }}>
        <Card1 heading="Top Rated Books" field="ratings" data={topRatedBooks}></Card1>
        <Card1 heading="Novel" field="novel" data={novel}></Card1>
        <Card1 heading="Top Selling Books" field="Selling" data={topSellingBooks}></Card1>
        <Card1 heading="Biography" field="Biography" data={novel}></Card1>
        <Card1 heading="Business" field="novel" data={novel}></Card1>
        <Card1 heading="Life" field="novel" data={novel}></Card1>

      </Box>}
    </div>
  )
}

export default Content