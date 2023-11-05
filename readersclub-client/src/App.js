import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Book from './pages/Book';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/book/:id' element={<Book />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/pageNotFound' element={<PageNotFound />}></Route>
        <Route path='/*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
