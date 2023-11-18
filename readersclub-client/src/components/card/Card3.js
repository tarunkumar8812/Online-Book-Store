import { Button, Rating } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './card3.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



const Card3 = ({ book, ind }) => {

    const navigate = useNavigate()


    const { user, authDispatch } = useContext(AuthContext)

    const handleClick = (title, id) => {
        navigate(`/book/${title} ${id}`, { state: { id, no: 0 } })
    }
    // const handleAddToCart = (book) => {
    //     navigate("/cart", { state: book })
    // }


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

    return (

        <div className='card3_book_box'>
            <div className='card3_book_img'>
                <img src={book?.thumbnail} alt='Thumbnail'></img>
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
                    <Rating
                        sx={{
                            borderRight: "1px solid grey",
                            padding: '5px', display: 'flex',
                            flexDirection: "row", marginRight: "5px"
                        }}
                        name="read-only" value={book?.ratings || 1} size='medium' readOnly />
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