import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Menucard from './Menucard';

const Menus = () => {

    const{menuse}=useContext(AppContext);
  return (
   <section className='min-h-screen  from-gray-50 to-white py-12'>
    <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold mb-3'>Our <span className='text-yellow-500'>Menu</span></h1>
            <p className='text-gray-600 max-w-2xl mx-auto'>Explore our delicious selection of handcrafted dishes made with the finest ingredients </p>
            

        </div>
        <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {
                menuse.map((menu)=>(
                    <Menucard key={menu._id} menu={menu}/>
                ))
            }

        </div>
        </div>
        

    </div>

   </section>
  );
}

export default Menus;
