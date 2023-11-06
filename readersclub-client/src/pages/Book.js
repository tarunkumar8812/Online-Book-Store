import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Card1 from '../components/card/Card1'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/footer/Footer'
import Card2 from '../components/card/Card2'

const Book = () => {

    const location = useLocation()
    console.log(location);


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            // api calling using axios
            // const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
            const res = await axios.get(`https://readers-club-server.vercel.app/user/getAllBooks`)
            // const res = await axios.get(`http://localhost:5000/user/getAllBooks`)
            // const res = await res.json
            setLoading(false)
            setData(res.data.bookList)
        }
        fetchData()
    }, [])

    const selectedBook = data.filter((book => book._id === location.state))
    const book = selectedBook[0]

    const sameGenre = data.filter((books => books?.genre || '' === book?.genre || ""))
    const sameAuthor = data.filter((books => books?.author === book?.author))
    const topRatedBooks = data.filter((book) => book?.ratings > 3).sort((a, b) => b.ratings - a.ratings)

    return (
        <>
            <Navbar></Navbar>
            
            <Card2 book={book}></Card2>

            <Card1 heading={`${book?.genre?.toUpperCase()}`} field="novel" data={sameGenre}></Card1>
            <Card1 heading={`${book?.author?.toUpperCase()}'s`} field="novel" data={sameAuthor}></Card1>
            <Card1 heading="Top Rated Books" field="ratings" rating={true} data={topRatedBooks}></Card1>

            <Footer></Footer>

        </>
    )
}

export default Book