
import React, { useEffect, useState } from 'react'
import './card1.css'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
const Card1 = ({ heading, data }) => {
  const navigate = useNavigate()

  // see all button logic
  const handleFilter = () => {
    let temp = {}
    // temp[field] = val
    navigate("/searchresults", { state: temp })
  }

  const handleClick = (title, id) => {
    navigate(`/book/${title} ${id}`)
  }


  return (
    <>

      <div className='slider'>
        <div className='slider_header'>
          <h2 className='heading'>{heading}</h2>
          <div>
            <Button>See All</Button>
            <IconButton color='info'><ArrowBack></ArrowBack></IconButton>
            <IconButton color='info'><ArrowForward></ArrowForward></IconButton>
          </div>

        </div>
        <div className='cards'>


          {/* // a single Card start */}
          {data.map((book) => {
            return (
              <div className='book_box' onClick={() => handleClick(book.title, book._id)}>
                <div className='book_img'>
                  <img src={book?.images} alt='Thumbnail'></img>
                </div>


                <div className='book_details'>
                  <p className="book_title"> {book?.title || "loading"}</p>
                  <p className="book_author">by {book?.author || 'loading'} </p>

                  <div className="book_prices">
                    <p className="discounted_price">₹{Math.round(book?.price * (100 - book?.discountPercent) / 100)}</p>

                    {book?.discountPercent > 0 && <p className="original_price">₹{book?.price}</p>}
                  </div>

                  {/* <p className="">{book?.soldCopies || 'N/A'} </p> */}

                </div>


                {book?.discountPercent > 0 && <p className="book_discount">{book?.discountPercent}%</p>}

              </div>
            )
          })}
          {/* // a single Card end */}


        </div>
      </div>

    </>

  )
}

export default Card1