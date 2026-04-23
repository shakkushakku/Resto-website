import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";


// Customer Pages
import CustomerHome from "./pages/CustomerHome";
import MenuTable from "./pages/MenuTable";
import MenuGallery from "./pages/MenuGallery";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";

// Chef Pages
import ChefHome from "./pages/ChefHome";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import ChefOrders from "./pages/ChefOrders";
import ChefOrdersCompleted from "./pages/ChefOrdersCompleted";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={currentUser ? (currentUser.role === 'chef' ? "/chef_home" : "/customer_home") : "/login"} />} />
        <Route path="/changepassword" element={<ProtectedRoute role="customer"><ChangePassword /></ProtectedRoute>} />

        {/* Customer Routes */}
        <Route path="/customer_home" element={<ProtectedRoute role="customer"><CustomerHome /></ProtectedRoute>} />
        <Route path="/customer_menu_table" element={<ProtectedRoute role="customer"><MenuTable /></ProtectedRoute>} />
        <Route path="/customer_menu_gallery" element={<ProtectedRoute role="customer"><MenuGallery /></ProtectedRoute>} />
        <Route path="/cart/:id" element={<ProtectedRoute role="customer"><Cart /></ProtectedRoute>} />
        <Route path="/order_confirmation" element={<ProtectedRoute role="customer"><OrderConfirmation /></ProtectedRoute>} />
        
       

        {/* Chef Routes */}
        <Route path="/chef_home" element={<ProtectedRoute role="chef"><ChefHome /></ProtectedRoute>} />
        <Route path="/add_item" element={<ProtectedRoute role="chef"><AddItem /></ProtectedRoute>} />
        <Route path="/edit_item/:id" element={<ProtectedRoute role="chef"><EditItem /></ProtectedRoute>} />
        <Route path="/chef_orders" element={<ProtectedRoute role="chef"><ChefOrders /></ProtectedRoute>} />
        <Route path="/chef_orders_completed" element={<ProtectedRoute role="chef"><ChefOrdersCompleted /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
