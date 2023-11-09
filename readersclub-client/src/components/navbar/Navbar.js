import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppBar, Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
import { Person, ShoppingCart, Login, PowerSettingsNew } from '@mui/icons-material';
const Navbar = () => {

  const { user } = useContext(AuthContext)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { authDispatch } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState([])
  const navigate = useNavigate()


  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" })
    setOpenDialog(false);
    window.location.reload()
  };

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
    // const key_words = e.target.value.split(" ").filter(word => word.trim() !== "")//.filter(whiteSpace=> word !== "")
  }

  useEffect(() => {
    const fetchData = async () => {
      // api calling using axios
      const res = await axios.get(`https://bookmanagementserver.onrender.com/user/getAllBooks`)
      setFetchData(res.data.bookList)
    }
    fetchData()
  }, [])


  async function searchBook(title, id) {
    navigate(`/book/${title} ${id}`, { state: { id, no: 0 } })
  }


  return (
    <nav>

      {/* logo  */}
      <Box>
        <AppBar position='static' >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

            <NavLink to='/' style={{ textDecoration: 'none' }}>

              <Typography
                variant='h5'
                sx={{ display: { xs: 'none', md: "block" }, color: 'white' }}>ReadersClub</Typography>
              <Avatar
                sx={{ display: { xs: "block", md: "none" } }}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdLT6HFo0OyTrVKs8PliE8x79VBTS8w84cooLSdtE_w&s'>
              </Avatar>
            </NavLink>


            {/* Search Bar */}
            <div className='search'>
              <Box sx={{ display: "flex", alignItem: "center", width: "100%", border: "3px solid orange", borderRadius: "10px", bgcolor: 'white', overflow: "hidden" }}>
                <input
                  type='text'
                  style={{ border: "none", bgcolor: 'white', borderRadius: "5px 0  0 5px", paddingLeft: '5px', width: "100%", outline: "none" }}
                  placeholder='Search here...'
                  onChange={handleSearch} defaultValue={search}
                />
                <IconButton variant='contained' size='small'
                  sx={{ bgcolor: "orange", borderRadius: '0 5px 5px 0 ' }}>
                  <SearchIcon></SearchIcon>
                </IconButton>
              </Box>

              <div className='s_suggestion'>
                {search.length > 0 &&
                  <ul className='s_suggestion_box'>
                    {
                      fetchData?.filter((val) =>
                        val.author.toLowerCase().includes(search) || val.title.toLowerCase().includes(search) || val.category.toLowerCase().includes(search)

                      )
                        .slice(0, 9)
                        .map((book) => {
                          return <>
                            <li className='box_ul_li' onClick={() => { searchBook(book.title, book._id) }} >
                              <p className='book_title'>
                                {/* <SearchIcon sx={{fontSize:"14px"}}></SearchIcon> */}
                                {`${book.title}`}</p>
                              <p className='Book_author'>{`by ${book.author}`}</p>
                            </li>
                          </>
                        })
                    }
                  </ul>
                }
              </div>

            </div>












            <Box sx={{ display: { xs: 'none', md: "block" } }}>

              {!user && <NavLink to='/login'>
                <Button color='inherit'>
                  <Typography sx={{ color: "white" }}>Login</Typography>
                </Button>
              </NavLink>}

              {!user && <NavLink to='/signup'>
                <Button color='inherit'>
                  <Typography sx={{ color: "white" }}>Sign Up</Typography>
                </Button>
              </NavLink>}

              {user && <NavLink to='/profile'>
                <Button color='inherit'>
                  <Typography sx={{ color: "white" }}>Profile</Typography>
                </Button>
              </NavLink>}

              {user && <NavLink to='/cart'>
                <Button color='inherit'>
                  <Badge badgeContent={1} color="error">
                    <Typography sx={{ color: "white" }}>Cart</Typography>
                  </Badge>
                </Button>
              </NavLink>}

              {user &&
                <Button color='inherit' onClick={handleDialogOpen}>
                  <Typography sx={{ color: "white" }}>Logout</Typography>
                </Button>
              }

            </Box>

            <Box sx={{ display: { xs: 'block', md: "none" } }}>

              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon fontSize='medium' sx={{ color: 'white' }}></MenuIcon>
              </IconButton>
              <Menu
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorPosition={{ top: '200px', right: '400px' }}
                id="basic-menu"
                // anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {!user && <NavLink to='/login' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ fontSize: "12px", gap: "10px" }} onClick={handleClose}> <Login fontSize='small' /> LOGIN</MenuItem></NavLink>}

                {!user && <NavLink to='/signup' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ fontSize: "12px", gap: "10px" }} onClick={handleClose}><Person fontSize='small' />SIGNUP</MenuItem></NavLink>}

                {user && <NavLink to='/profile' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ fontSize: "12px", gap: "10px" }} onClick={handleClose}><Person fontSize='small' />PROFILE</MenuItem></NavLink>}

                {user && <NavLink to='/cart' style={{ textDecoration: 'none' }}>
                  <MenuItem sx={{ fontSize: "14px", gap: "10px" }} onClick={handleDialogOpen}>
                    <Badge badgeContent={1} color="error">
                      <ShoppingCart fontSize='medium' color="action" />
                    </Badge>CART</MenuItem>
                </NavLink>}

                {user && <MenuItem sx={{ fontSize: "12px", gap: "10px" }} onClick={handleDialogOpen}><PowerSettingsNew fontSize='small' color='error' />LOGOUT</MenuItem>}

                {/* <NavLink to='/about' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleClose}>ABOUT</MenuItem></NavLink> */}
              </Menu>

              {/* <IconButton ><Person sx={{ color: "white" }} /></IconButton>
              <IconButton ><PersonAddAlt1 sx={{ color: "white" }} /></IconButton>
              <IconButton>
                <Badge badgeContent={4} color="success">
                  <ShoppingCart sx={{ color: "white" }} />
                </Badge>
              </IconButton> */}
            </Box>

          </Toolbar>
        </AppBar>



        {/* ------------dialog box for logout------------ */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sign Out of App?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ textTransform: "none" }} id="alert-dialog-description" >
              Are you sure you would like to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button variant='outlined' onClick={handleLogout} > Sign Out </Button>
          </DialogActions>
        </Dialog>
      </Box>


    </nav>
  )
}

export default Navbar