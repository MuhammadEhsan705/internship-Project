import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Upload } from 'lucide-react';

const AddMenu = () => {
  const{axios,navigate, loading, setLoading,categories}=useContext(AppContext);
 ;
    const[file ,setFile]=useState(null);
    const[ preview,setpreview]=useState(null);
  const[formData, setFormData]=useState({name:"",price: "",description:"",
    category:"",
    image:null});


    const handlechange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handlefilechange=(e)=>{
      const selectedfile=e.target.files[0];
      if(selectedfile){
        setFile(selectedfile);
      }
      setFormData({...formData, image: selectedfile});
      if(selectedfile){
        setpreview(URL.createObjectURL(selectedfile));
      }
    };
  
    const handlesubmit=async (e)=>{
      e.preventDefault();
      try {
        setLoading(true);
        const {data}=await axios.post ("/api/menu/add",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
          
        })
        if(data.success){
          toast.success(data.message);
          navigate("/admin/Menus");
        }else{toast.error(data.message)}
      } catch (error) {
        toast.error( error.response.data.message ||"Something went wrong");
        
      }
      finally{
        setLoading(false);
      }
    };
  return (
    <div className='py-12'>
      <form onSubmit={handlesubmit} className='max-w-2xl w-full flex flex-col gap-5'>
        
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Menu Name *
          </label>
          <input  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-transparent' type='text' name="name" value={formData.name} onChange={handlechange} required  placeholder='Enter Menu name'/>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            price
          </label>
          <input  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-transparent' type='number' name="price" value={formData.price} onChange={handlechange} required  placeholder='Enter Menu  price'/>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Menu Description*
          </label>
          <input  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-transparent' type='text' name="description" value={formData.description} onChange={handlechange} required  placeholder='Enter Menu description'/>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Select Category
          </label>
          
          <select className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-transparent' name="category" value={formData.category} onChange={handlechange}>
            <option value="">Select a category</option>
            {categories.map((item)=>(
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Menu image
  </label>

  <input
    type="file"
    id="fileupload"
    className="hidden"
    onChange={handlefilechange}
    required
  />

  {/* Custom upload area */}
  <label
    htmlFor="fileupload"
    className="flex flex-col items-center justify-center
               w-full h-32 border border-dashed border-gray-300
               rounded-lg cursor-pointer transition"
  >
    <Upload className="w-8 h-8 text-gray-500 mb-2" />
    <span className="text-gray-600 text-sm text-center">
      {file ? file.name : "Click to upload an image"}
    </span>
  </label>
</div>
{preview && <img src={preview}  alt='preview' className='w-20'/>}
        <button className='bg-orange-500 text-white px-8 py-3 cursor-pointer'>
          {loading ? "adding..":"add menu"}

        </button>
      </form>
      
    </div>
  );
}

export default AddMenu;
