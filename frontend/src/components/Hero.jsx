import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const {navigate}=useContext(AppContext);
  return (
    <section
    className="relative h-[90vh] flex items-center justify-center bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://plus.unsplash.com/premium_photo-1674106347537-f0b19d647413?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
  >
    {/* overlay */}
    <div className='absolute inset-0 bg-black/60'></div>
    {/* content */}
    <div className='relative z-10 text-center text-white px-4'>
      <h1 className='text-4xl md:text-6xl font-bold mb-4'>Welcome to our Restaurant</h1>
      <p className='text-lg md:text-xl mb-8 max-w-2xl mx-auto'>
        Experience the taste of perfection-where every bite tells a story.
      </p>
      <div className='flex flex-col sm:flex-row justify-center gap-4'>
        <button onClick={()=>navigate("/menu")} className='cursor-pointer bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300'>All Menu</button>
        <button onClick={()=>navigate("/book-table")} className='cursor-pointer bg-transparent border-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition-all duration-300'>Booke a table</button>
      </div>

    </div>
  </section>
  

  );
}

export default Hero;
