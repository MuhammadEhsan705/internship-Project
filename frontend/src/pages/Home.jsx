import React from 'react';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Menus from '../components/Menus';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';


const Home = () => {
  return (
    <div className=''>
      <Hero/>
      <Category/>
      <Menus/>
      <Newsletter/>
      <Testimonials/>
    </div>
  );
}

export default Home;

