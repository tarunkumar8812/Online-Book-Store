import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './card4.css'

const Card4 = ({ book }) => {


    const navigate = useNavigate()

    const { user, authDispatch } = useContext(AuthContext)
    const [openDialog, setOpenDialog] = useState(false)
    const [toDelete, setToDelete] = useState('')
    const [quantity, setQuantity] = useState(book?.quantity)

    // to open dialog box
    const handleDialogOpen = (bookId) => {
        console.log(bookId)
        setToDelete(bookId)
        setOpenDialog(true);
    };

    // to close dialog box
    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    // to delelte book from cart
    const handleDelete = () => {
        setOpenDialog(false);

        const fetchData = async () => {
            // api calling using axios
            await axios.post('https://onlinebookstoreserver.vercel.app/user/deleteCartItem', {
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


    // to save changes in quntity of book
    const handleSaveQuantity = async () => {
        // api calling using axios
        await axios.post('https://onlinebookstoreserver.vercel.app/user/updateCartItem', {
        // await axios.post('http://localhost:5000/user/updateCartItem', {
            token: user,
            bookIdToUpdate: book?.bookId?._id,
            newQuantity: quantity
        }).then((result) => {
            window.location.reload()
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }



    const goToBook = (title, id) => {
        // console.log('book -- - - -', book);

        // console.log("title, id -- ", title, id);

        navigate(`/book/${title} ${id}`, { state: { id, no: 0 } })
    }


    return (
        <>
            <div className='cart-item'>
                {quantity !== book?.quantity && <Button
                    onClick={handleSaveQuantity}
                    variant='contained' size='small' sx={{
                        position: " absolute",
                        top: '4px',
                        right: "110px",
                        padding: '0 5px',
                        fontSize: "12px"
                    }}>
                    save qty
                </Button>}
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
                        <p onClick={() => { goToBook(book?.bookId?.title, book?.bookId?._id) }} className='item-name'> <a>{book?.bookId?.title}</a></p>
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
                                <IconButton disabled={quantity <= 1}
                                    onClick={() => { setQuantity(quantity - 1) }}
                                    sx={{ margin: "0", padding: "0" }} >
                                    <RemoveIcon sx={{ fontSize: "12px" }} />
                                </IconButton>
                                <p className='item-quantity'>{quantity}</p>
                                <IconButton disabled={quantity > 30}
                                    onClick={() => { setQuantity(quantity + 1) }}
                                    sx={{ margin: "0", padding: "0" }} >
                                    <AddIcon sx={{ fontSize: "12px" }} />
                                </IconButton>
                            </Box>
                        </span>
                        <span>
                            <lable className='totalprice-lable lable'>Total Price</lable>
                            <p className='item-totalprice'>{book?.price * quantity}</p>
                        </span>
                        {/* handleSaveQuantity(book?.bookId, book?.quantity + 10) */}
                    </div>
                </div>
            </div>


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
        </>
    )
}

export default Card4