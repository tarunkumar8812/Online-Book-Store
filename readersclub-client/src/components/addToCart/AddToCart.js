import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Card4 from '../card/Card4';
import './addToCart.css'




const AddToCart = () => {
  const navigate = useNavigate()


  const { user, authDispatch } = useContext(AuthContext)
  const [cartData, setCartData] = useState([])
  const [totalCartItem, setTotalCartItem] = useState(0)



  useEffect(() => {
    const fetchData = async () => {
      // api calling using axios
      await axios.post('https://onlinebookstoreserver.vercel.app/user/getCart', {
        // await axios.post('http://localhost:5000/user/getCart', {
        token: user
      }).then((result) => {
        // console.log("cart Data", result.data.cartInDB.items);
        setCartData(result.data.cartInDB.items)
        setTotalCartItem(result.data.cartInDB.items.length)
      }).catch((err) => {
        alert(err.response.data.message)
        if (err.response.status === 401) {
          authDispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message })
          navigate('/login')
        }
      })
    }
    fetchData()
  }, [])



  const Subtotal = cartData?.reduce((accumulator, currentValue) =>
    accumulator + (currentValue?.price * currentValue?.quantity), 0)


  const totalDiscount = cartData?.reduce((accumulator, currentValue) =>
    accumulator + (currentValue?.price * currentValue?.quantity * currentValue?.discount / 100), 0)

  const shippingCost = 50



  return (
    <div className='cart-container'>

      <div className='cart'>
        <div style={{ display: "flex", justifyContent: "space-between" }}> <h2>Shopping Cart</h2><h4>Total Cart Items : {totalCartItem || 0}</h4></div>
        <div>
          {cartData?.map((book, ind) => {
            return (
              <Card4 key={ind} book={book}></Card4>
            )
          })}
        </div>
        {totalCartItem && <div className='total'>
          <p>Subtotal: {Subtotal}</p>
          <p>discount: -{Math.floor(totalDiscount)}</p>
          <p>Shipping: +{shippingCost}</p>
          <h3>Total : {(Subtotal - Math.floor(totalDiscount) + shippingCost).toFixed(2)}</h3>
        </div>
        }

        <div className='btns'>
          <Button size='small' variant='contained' startIcon={<ReplyIcon />}>
            <a href='/' > Back to Shopping</a>
          </Button>
          <Button
            onClick={() => { navigate('/payment') }}
            size='small' disabled={!totalCartItem}
            variant='contained' endIcon={<SendIcon />}>Proceed to Payment</Button>
        </div>

      </div>


    </div>
  )
}

export default AddToCart