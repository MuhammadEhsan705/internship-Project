import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { CircleX } from 'lucide-react';

import {toast}from 'react-hot-toast';

const Menus = () => {
  const { axios,menuse ,fetchmenus}=useContext(AppContext);
  const deleteMenu =async(id)=>{
    try {
       const {data}=await axios.delete(`/api/menu/delete/${id}`);
       if(data.success){
        toast.success(data.message);
        fetchmenus();
        
       }else{
        toast.error(data.message);
       }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='py-4'>
      <h1 className='text-3xl font-bold mb-3'>All Menus</h1>
      <div className='border border-gray-400 max-w-5xl mx-auto p-3'>
        <div className='grid grid-cols-5 font-semibold text-gray-700'>
          <div>image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        
        </div>
        <hr className='w-full my-4 text-gray-200'/>
        <ul>
          {
            menuse.map((item)=>(
              <div key={item._id}>
                <div className='grid grid-cols-5 font-semibold text-gray-700'>
                 <div className='flex item-center gap-2 max-w-md'>
                  <img src={item.image}alt="" className='w-24 h-24'/>
                 </div>
                 <p>{item.name}</p>
                 <p>{item.category.name}</p>
                 <p>{item.price}</p>
               
                 
                 <p  onClick={()=>deleteMenu(item._id)} className='text-red-600 cursor-pointer hover:underline' >
                  <CircleX/>
                 </p>
                </div>
                <hr className='w-full text-gray-300'/>

              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Menus;
