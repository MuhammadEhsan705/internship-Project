import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { navigate, axios, Loading, setLoading, setUser } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/login", formData);

      if (data.success) {
       
        setUser(data.user);

        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-400 text-sm mt-2">
          Please Login to continue
        </p>

        <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <MailIcon className="text-white" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-white outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <LockIcon className="text-white" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-orange-500 hover:bg-indigo-500 transition"
        >
          {Loading ? "loading..." : "Login"}
        </button>

        <p className="text-zinc-400 text-sm mt-3 mb-11">
          Don't have an account?
          <Link to="/signup" className="text-indigo-400 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
