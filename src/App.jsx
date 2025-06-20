import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePromos from './pages/Home';
import CategoryPage from './pages/Category';
import PlaceOrder from './pages/PlaceOrder';
import ViewCart from './pages/View-cart';
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster

function App() {
  return (
    <Router>
      {/* ✅ Toast Container */}
      <Toaster/>

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePromos />} />
        <Route path="/category/:type" element={<CategoryPage />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/view-cart" element={<ViewCart />} />
      </Routes>
    </Router>
  );
}

export default App;
