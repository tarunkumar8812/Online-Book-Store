import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Rating } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import './card2.css'
import axios from 'axios'

const Card2 = ({ book }) => {

    const location = useLocation()
    const navigate = useNavigate()
    const { user, authDispatch } = useContext(AuthContext)


    const [image, setImage] = useState(0)

    useEffect(() => {
        setImage(0)
    }, [location])


    const handleAddToCart = async (book) => {

        if (!user) {
            navigate("/login")
        }
        // api calling using axios
        await axios.post(`https://bookmanagementserver.onrender.com/user/addToCart`, {
            // await axios.post(`http://localhost:5000/user/addToCart`, {
            token: user,
            bookId: book._id,
            price: book.price,
            weight: book.weight,
            discount: book.discountPercent
        }).then((result) => {
            // console.log(result.data.message);
            alert(result.data.message);

        }).catch((err) => {
            console.log(err.response.status, err.message);
            console.log(err.response.data.message);
            if (err.response.status === 401) {
                alert(err.response.data.message)
                authDispatch({ type: "LOGOUT" })
                navigate('/login')
            } else if (err.response.status === 409) {
                alert(err.response.data.message)
            } else {
                navigate('/')
            }
        })
    }


    const handleBuyNow = (book) => {
        if (user) {
            navigate("/payment")
        } else {
            navigate("/login", { state: { book, redirect: "/payment" } })
        }
    }



    return (
        <div style={{ margin: "15px" }}>
            <Box component='div' sx={{ border: "1px solid grey", margin: "auto", padding: "15px", height: "auto", maxWidth: '1600px' }}>

                <div className='wrapper'>

                    <div className='img_container' >
                        <div className='allImages'>
                            {book?.images.map((img, ind) => {
                                return (<>
                                    <div
                                        key={ind}
                                        className={ind === image ? "select" : 'img_box'}
                                        onClick={() => { setImage(ind || 0) }}>
                                        <img src={img || ""} alt='smallImg'></img>
                                    </div>
                                </>)
                            })}
                        </div>
                        <img src={book?.images[image] || ""} alt='bigImg'></img>
                    </div>


                    <div className='full_details'>
                        <div className='item'>
                            <p className='title'> {book?.title}</p>
                            <p className='format'>{`(${book?.format})`}</p>
                        </div>

                        <div className='item'>
                            <p className='authorSuf suf'>By: </p>
                            <NavLink style={{ textDecoration: 'none' }} to='/author'><p className='author'> {book?.author} </p></NavLink>
                            <p>{`(Author)`}</p>
                        </div>

                        <div className='item'>
                            <p className='suf'>Publisher: </p>
                            <NavLink style={{ textDecoration: 'none' }} to='/publisher'> <p className='publisher'>{book?.publisher || 'Publishser Name'}</p></NavLink>
                        </div>

                        <div className='item' >

                            <Rating
                                sx={{
                                    borderRight: "1px solid grey",
                                    padding: '5px', display: 'flex',
                                    flexDirection: "row"
                                }}
                                name="read-only" value={book?.ratings || 1} size='medium' readOnly />

                            <p style={{ borderRight: "1px solid grey", padding: '5px' }}>{book?.ratings || 1}</p>

                            <p>{book?.reviews} Reviews</p>

                        </div>


                        <div className='item' style={{ marginTop: "50px", padding: '10px 0' }}>
                            <p className='suf'>Price: </p>
                            <p className='price'>₹ {Math.round(book?.price * (100 - book?.discountPercent) / 100)}</p>
                            <p className='originalPrice'> {book?.price || 'N/A'}</p>
                        </div>



                        <div>Discount :  {book?.discountPercent} %</div>



                        {/* <div className='item'><p className='categorySuf'></p> <p> Category : {book?.category}</p></div> */}
                        {/* <h2> availableQuantity : {book?.availableQuantity}</h2> */}
                        {/* <div>Format :  {book?.format}</div> */}
                        {/* <div>Language :  {book?.language}</div>
                        <div>Pages :  {book?.numberOfPages || "N/A"}</div> */}
                        {/* <div>Sold Copies :  {book?.soldCopies || "N/A"}</div> */}


                        <div className='buttons'>
                            <Button disabled={!book} variant='contained' className='btn buy_btn'
                                onClick={() => { handleBuyNow(book) }}
                            > Buy Now</Button>
                            <Button disabled={!book} variant='contained' className='btn addcart_btn'
                                onClick={() => { handleAddToCart(book) }}
                            > Add to Cart</Button>
                        </div>

                    </div>


                    <div className='other_details' >
                        <p>Country Of Origin :  {book?.countryOfOrigin}</p>
                        <p>ISBN :  {book?.ISBN}</p>
                        <p>Published Year : {book?.publishedYear}</p>
                        <p>Weight : {book?.weight} gram</p>
                        <p>Dimentions : {book?.size}</p>
                        <p>Pages :  {book?.numberOfPages || "N/A"}</p>
                        <p>Sold Copies :  {book?.soldCopies || "N/A"}</p>
                        <p>Excerpt : {book?.excerpt}</p>
                    </div>

                </div>
            </Box>

        </div>
    )
}

export default Card2