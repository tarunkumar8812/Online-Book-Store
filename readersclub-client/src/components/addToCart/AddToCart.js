import React, { useContext, useEffect, useState } from 'react'
import './addToCart.css'
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReplyIcon from '@mui/icons-material/Reply';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';




const AddToCart = () => {
  const navigate = useNavigate()


  const { user, authDispatch } = useContext(AuthContext)

  const [openDialog, setOpenDialog] = useState(false)
  const [cartData, setCartData] = useState([])
  // const [bookData, setBookData] = useState([])
  const [toDelete, setToDelete] = useState('')
  const [totalCartItem, setTotalCartItem] = useState(0)


  // const handleQuantity = async (bookId, quantity) => {
  //   // api calling using axios
  // await axios.post('https://bookmanagementserver.onrender.com/user/updateCartItem', {
  // //   await axios.post('http://localhost:5000/user/updateCartItem', {
  //     token: user,
  //     bookIdToUpdate: bookId,
  //     newQuantity: quantity
  //   }).then((result) => {
  //     window.location.reload()
  //     console.log("cart Data", result.data);
  //   }).catch((err) => {
  //     alert(err.response.data.message)
  //   })
  // }

  useEffect(() => {
    const fetchData = async () => {
      // api calling using axios
      await axios.post('https://bookmanagementserver.onrender.com/user/getCart', {
        // await axios.post('http://localhost:5000/user/getCart', {
        token: user
      }).then((result) => {
        // console.log("cart Data", result.data.cartInDB);
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

  const handleDialogOpen = (bookId) => {
    console.log(bookId)
    setToDelete(bookId)
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleDelete = () => {
    // console.log('toDelete', toDelete);
    setOpenDialog(false);

    const fetchData = async () => {
      // api calling using axios
      await axios.post('https://bookmanagementserver.onrender.com/user/deleteCartItem', {
        // await axios.post('http://localhost:5000/user/deleteCartItem', {
        token: user,
        toDelete
      }).then((result) => {
        // console.log("updateCart,updatedCart", result?.data);
        alert(result?.data?.message)
        window.location.reload()
      }).catch((err) => {
        alert(err?.response?.data?.message)
        if (err?.response?.status === 401) {
          authDispatch({ type: "LOGIN_FAILURE", payload: err?.response?.data?.message })
          navigate('/login')
        }
      })
    }
    fetchData()
  };


  const goToBook = (title, id) => {
    navigate(`/book/${title} ${id}`, { state: { id, no: 0 } })
  }

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

          {
            cartData?.map((book) => {
              return (
                <div className='cart-item'>
                  <div className='img-box'>
                    <img src={book?.bookId?.thumbnail} alt='thumbnail'>
                    </img>
                  </div>

                  <div className='item-detail'>
                    <IconButton
                      onClick={() => { handleDialogOpen(book?.bookId?._id) }}
                      size='small' sx={{
                        position: " absolute",
                        top: 0,
                        right: 0
                      }} className='close'> <DeleteIcon fontSize="small" />
                    </IconButton>

                    <div className=''>
                      <p onClick={() => { goToBook(book?.title, book?._id) }} className='item-name'> <a>{book?.bookId?.title}</a></p>
                      <p className='item-author'>by: {book?.bookId?.author}</p>
                    </div>

                    <div className='item-pricing'>
                      <span>
                        <lable className='price-lable lable'>Price</lable>

                        <p className='item-price'> {book?.price}</p>

                      </span>
                      <span>
                        <lable className='quantity-lable lable'>quantity</lable>
                        <Box sx={{ gap: "1px", border: '1px solid gray', display: "flex", justifyContent: "center", backgroundColor: "whitesmoke" }}>
                          <IconButton sx={{ margin: "0", padding: "0" }} ><RemoveIcon sx={{ fontSize: "12px" }} /></IconButton>
                          <p className='item-quantity'>{book?.quantity}</p>
                          <IconButton sx={{ margin: "0", padding: "0" }} ><AddIcon sx={{ fontSize: "12px" }} /></IconButton>
                        </Box>
                      </span>
                      <span>
                        <lable className='totalprice-lable lable'>Total Price</lable>
                        <p className='item-totalprice'>{book?.price * book?.quantity}</p>
                      </span>
                      {/* handleQuantity(book?.bookId, book?.quantity + 10) */}
                    </div>
                  </div>
                </div>)
            })
          }

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



      {/* <div className='payment'>
        <h2>Payment Info.</h2>

        <div className='cart-item'>
          <div className='img-box'>
            <img src='https://m.media-amazon.com/images/I/51Xjv4IzydL._SX322_BO1,204,203,200_.jpg' alt='thumbnail'>
            </img>
          </div>
          <div className='item-detail'>
            <p className='item-quantity'>5</p>
            <p className='item-price'>$ 350</p>
          </div>
        </div>
      </div> */}



      {/* ------------dialog box for logout------------ */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          fontSize='16px'
          id="alert-dialog-title">
          {"Remove from Cart?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            fontSize='14px'
            sx={{ textTransform: "none" }} id="alert-dialog-description" >
            Are you sure you want to Remove this book from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size='small' onClick={handleDialogClose}>Cancel</Button>
          <Button size='small' variant='outlined' onClick={handleDelete} > confirm </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddToCart