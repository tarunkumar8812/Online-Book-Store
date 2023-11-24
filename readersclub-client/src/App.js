import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Book from './pages/Book';
import List from './pages/List';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/book/:id' element={<Book />}></Route>
        <Route path='/list' element={<List />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/pageNotFound' element={<PageNotFound />}></Route>
        <Route path='/*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
