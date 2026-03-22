import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
// axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuse, setMenuse] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchcarddata = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cart?.items) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);
  const Cartcount = cart?.items?.reduce(
    (acc, item) => acc + item.quantity,
    0 || 0
  );
  // 🔹 Add to Cart function
  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });
      if (data.success) {
        toast.success(data.message);
        fetchcarddata()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("LOGIN OR REGISTER!");
    }
  };
  // remove cart

  const removefromcart= async(menuId)=>{
    try {
       const {data}=await axios.delete(`/api/cart/remove/${menuId}`)
       if(data.success){
        toast.success(data.message);
         fetchcarddata();
       }else{
        toast.error(data.message);
       }
    } catch (error) {
       console.log(error);
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) {
        setCategories(data.categories);
      } else {
        console.log("failed to fetch categories");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchmenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) {
        setMenuse(data.menuItems);
      } else {
        console.log("Error fetch Menuse");
      }
    } catch (error) {
      console.log("Error fetching Menues:", error);
    }
  };

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await isAuth();
      await fetchCategories();
      await fetchmenus();
      
        
      
      
    };

    loadData();
  }, []);
  
  useEffect(()=>{
    if(user){
      fetchcarddata();
    }else{
      setCart({items:[]});
    }
    
  },[user])

  const value = {
    navigate,
    Loading,
    setLoading,
    user,
    setUser,
    axios,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menuse,
    fetchmenus,
    addToCart,
    Cartcount,
    cart,
    totalPrice,
    removefromcart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
