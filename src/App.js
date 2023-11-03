import logo from './logo.svg';
import './App.css';

import { Header } from './Components/Header';
import ProductPage from './pages/ProductPage';
import  {CartModal}  from './Components/CartModal';
import CartPages from './pages/CartPages';
import {Routes,Route} from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div>
      <Header/>
       <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
       </Routes>
       <CartPages/>
    </div>
  );
}

export default App;
