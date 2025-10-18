import { BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Home from "./components/Home"
import ProductCart from "./components/ProductCart"
import ItemCart from "./components/ItemCart"
import Checkout from "./components/Checkout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductCart />} />
        <Route path="/cart" element={<ItemCart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App
