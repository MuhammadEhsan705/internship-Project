import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import {Upload} from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const {axios,navigate, loading ,setLoading}=useContext(AppContext)
  const [formdata ,setformdata]=useState({name:"",image:null});
  const[file ,setFile]=useState(null);
  const[ preview,setpreview]=useState(null);

  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value});
  }
  const handlefilechange=(e)=>{
    const selectedfile=e.target.files[0];
    if(selectedfile){
      setFile(selectedfile);
    }
    setformdata({...formdata, image: selectedfile});
    if(selectedfile){
      setpreview(URL.createObjectURL(selectedfile));
    }
  };

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data}=await axios.post ("/api/category/add",formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      
      })
      if(data.success){
        toast.success(data.message);
        navigate("/admin/categories")
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
      <form onSubmit={handlesubmit} className='max-w-md w-full flex flex-col gap-5'>
        {preview && <img src={preview}  alt='preview' className='w-1/2'/>}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Category Name *
          </label>
          <input  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-transparent' type='text' name="name" value={formdata.name} onChange={handlechange} required  placeholder='Enter category name'/>
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category image
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

        <button className='bg-orange-500 text-white px-8 py-3 cursor-pointer'>
          {loading ? "adding..":"add category"}

        </button>
      </form>
      
    </div>
  );
}

export default AddCategory;
