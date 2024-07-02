import React from 'react';
import baby from '../../public/images/babyCare.png';
import biskit from '../../public/images/biskit.png';
import brakeFast from '../../public/images/Brakefast.png';
import cleaning from '../../public/images/cleaning.png';
import colddrink from '../../public/images/coldDring.avif';
import home from '../../public/images/home.png';
import malsala from '../../public/images/masala.png';
// import milk from '../../public/images/Milk.avif';
import organic from '../../public/images/organic.png';
import personalCare from '../../public/images/personalCare.png';
import petCare from '../../public/images/petCare.png';
import Pharma from '../../public/images/Pharma.png';
import rice from '../../public/images/rice.png';

const items = [
  { src: baby, alt: 'Baby Care' },
  { src: biskit, alt: 'Biskit' },
  { src: brakeFast, alt: 'Breakfast' },
  { src: cleaning, alt: 'Cleaning' },
  { src: colddrink, alt: 'Cold Drink' },
  { src: home, alt: 'Home' },
  { src: malsala, alt: 'Masala' },
  // { src: milk, alt: 'Milk' },
  { src: organic, alt: 'Organic' },
  { src: personalCare, alt: 'Personal Care' },
  { src: petCare, alt: 'Pet Care' },
  { src: Pharma, alt: 'Pharma' },
  { src: rice, alt: 'Rice' }
];

const ItemsCategory = () => {
  return (
    <div className='flex justify-center items-center content-center flex-wrap gap-1  mt-10 '>
      {items.map((item, index) => (
       <div  key={index}>
         <img src={item.src} alt={item.alt} className='w-40 h-52 object-cover cursor-pointer' />
       </div>
      ))}
    </div>
  );
};

export default ItemsCategory;
