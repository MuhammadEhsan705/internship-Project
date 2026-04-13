import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Menu, X, Calendar, LogOut, Package, ShoppingCart, UserCircle } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, Cartcount } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              <img src="./logo.png" alt="logo" className="w-32" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 font-medium">Menus</Link>
            <Link to="/book-table" className="text-gray-700 hover:text-blue-600 font-medium">Book Table</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin")}
              className="  hidden md:block cursor-pointer bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              Admin
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {Cartcount}
              </span>
            </button>

            {/* Profile Desktop */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <UserCircle size={30} className="text-gray-700" />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <Link to="/my-booking" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Calendar size={18} className="mr-3" />My Bookings
                      </Link>
                      <Link to="/my-orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <Package size={18} className="mr-3" />My Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="flex w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} className="mr-3" />Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-medium cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>

            {/* Hamburger Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Menus
            </Link>
            <Link 
              to="/book-table" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Book Table
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)} 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
        
            {user ? (
              <div className="flex flex-col space-y-1">
                <Link 
                  to="/my-booking" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Calendar size={18} className="mr-3" />My Bookings
                </Link>
                <Link 
                  to="/my-orders" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Package size={18} className="mr-3" />My Orders
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }} 
                  className="flex w-full px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />Logout
                </button>
                <button
              onClick={() => {navigate("/admin");setIsMenuOpen(false);}}
              className=" flex w-full px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Admin
            </button>
              </div>
            ) : (
              <button
                onClick={() => { navigate("/login"); setIsMenuOpen(false); }} 
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 font-medium cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;