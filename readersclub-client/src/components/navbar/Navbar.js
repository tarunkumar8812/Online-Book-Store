import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
// import { Person, PersonAddAlt1, ShoppingCart } from '@mui/icons-material';
const Navbar = () => {

  const { user } = useContext(AuthContext)

  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { authDispatch } = useContext(AuthContext)


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
            {/* <Box> */}
            <Box sx={{ display: "flex", alignItem: "center", border: "2px solid orange", borderRadius: "10px", overflow: "hidden" }}>
              <InputBase
                sx={{ bgcolor: 'white', borderRadius: "5px 0  0 5px", paddingLeft: '5px', width: "400px" }}
                placeholder='Search here...'></InputBase>
              <IconButton variant='contained' size='small'
                sx={{ bgcolor: "orange", borderRadius: '0 5px 5px 0 ' }}>
                <SearchIcon></SearchIcon>
              </IconButton>
            </Box>
            {/* </Box> */}


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

              {user &&
                <Button color='inherit' onClick={handleDialogOpen}>
                  <Typography sx={{ color: "white" }}>Logout</Typography>
                </Button>
              }

              <NavLink to='/about'>
                <Button color='inherit'>
                  <Typography sx={{ color: "white" }}>About</Typography>
                </Button>
              </NavLink>

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
                {!user && <NavLink to='/login' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleClose}>LOGIN</MenuItem></NavLink>}

                {!user && <NavLink to='/signup' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleClose}>SIGNUP</MenuItem></NavLink>}

                {user && <NavLink to='/profile' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleClose}>PROFILE</MenuItem></NavLink>}

                {user && <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleDialogOpen}>LOGOUT</MenuItem>}

                <NavLink to='/about' style={{ textDecoration: 'none' }}>  <MenuItem sx={{ color: 'black', fontSize: "12px" }} onClick={handleClose}>ABOUT</MenuItem></NavLink>
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