import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Rating } from '@mui/material'
import './card2.css'

const Card2 = ({ book }) => {

    const location = useLocation()
    const navigate = useNavigate()


    const [image, setImage] = useState(0)
    console.log(book);

    const handleAddToCart = (book) => {
        navigate("/cart", { state: book })
    }

    const handleBuyNow = (book) => {
        if (5 == '5') {
            navigate("/payment")
        } else {
            navigate("/login", { state: "/payment" })
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
                                    <div className='img_box'
                                        onClick={() => { setImage(ind || 0) }}>
                                        <img src={img || ""} alt=''></img>
                                    </div>
                                </>)
                            })}
                        </div>
                        <img src={book?.images[image] || ""} alt=''></img>
                    </div>


                    <div className='full_details'>
                        <div className='item'>
                            <p className='title'> {book?.title}</p>
                            <p className='format'>{`(${book?.format})`}</p>
                        </div>

                        <div className='item'>
                            <p className='authorSuf suf'>By: </p>
                            <NavLink style={{ textDecoration: 'none' }} to='/auhor'><p className='author'> {book?.author} </p></NavLink>
                            <p>{`(Author)`}</p>
                        </div>

                        <div className='item'>
                            <p className='suf'>Publisher: </p>
                            <NavLink style={{ textDecoration: 'none' }} to='/publisher'> <p className='publisher'>{book?.publisher || 'Publishser Name'}</p></NavLink>
                        </div>

                        <div className='item' style={{ paddingBottom: "30px", borderBottom: "1px solid gray" }}>
                            <Rating sx={{ borderRight: "1px solid grey", padding: '5px' }} name="read-only" value={book?.ratings || 1} size='medium' readOnly />
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
                            <Button variant='contained' className='btn buy_btn'
                                onClick={() => { handleBuyNow(book) }}
                            > Buy Now</Button>
                            <Button variant='contained' className='btn addcart_btn'
                                onClick={() => { handleAddToCart(book) }}
                            > Add to Cart</Button>
                        </div>

                    </div>


                    <div className='other_details' >
                        <p>Country Of Origin :  {book?.countryOfOrigin}</p>
                        <p>ISBN :  {book?.ISBN}</p>
                        <p>Published Year : {book?.publishedYear} gram</p>
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