import { Button, Rating } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './card3.css'



const Card3 = ({ book, ind }) => {

    const navigate = useNavigate()

    const handleClick = (title, id) => {
        navigate(`/book/${title} ${id}`, { state: { id, no: 0 } })
    }
    const handleAddToCart = (book) => {
        navigate("/cart", { state: book })
    }

    return (

        <div className='card3_book_box'>
            <div className='card3_book_img'>
                <img src={book?.images} alt='Thumbnail'></img>
            </div>


            <div className='card3_book_details'>
                <p className="card3_book_title"> {book?.title || "loading"}</p>
                <p className="card3_book_author">by: {book?.author || 'loading'} </p>

                <div className="card3_book_prices">
                    <p className="card3_discounted_price">₹{Math.round(book?.price * (100 - book?.discountPercent) / 100)}</p>

                    {book?.discountPercent > 0 && <p className="card3_original_price">₹{book?.price}</p>}
                </div>

                {/* <p className="">{book?.soldCopies || 'N/A'} </p> */}
                {/* <p className="">Ratings - {book?.ratings || 'N/A'} </p> */}
                <div className='card3_book_rating'>
                    <Rating name="read-only" value={book?.ratings || 1} size='medium' readOnly />
                    <p> {book?.ratings || 1}</p>
                </div>

                <p>{book?.reviews || 1} Reviews</p>

            </div>
            <div className='action_buttons'>

                <Button size='small' variant='outlined' onClick={() => handleClick(book.title, book._id)}>Quick View</Button>
                <Button size='small' variant='outlined' onClick={() => { handleAddToCart(book) }}>add to cart</Button>
            </div>

            {book?.discountPercent > 0 && <p className="card3_book_discount">{book?.discountPercent}%</p>}

        </div>
    )
}

export default Card3