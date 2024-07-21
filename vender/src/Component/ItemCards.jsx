import React from 'react'
import pharmacy from '../../public/images/pharmacy-WEB.avif'
import petCareWeb from '../../public/images/Pet-Care_WEB.avif'
import babycare from '../../public/images/babycare-WEB.avif'

const ItemCards = ({ imgSrc, altText }) => {
  return (
    <div className='cursor-pointer'>
      <img src={imgSrc} alt={altText}/>
    </div>
  )
}

const App = () => {
  return (
    <div className='flex justify-center items-center gap-4 px-5 '>
      <ItemCards imgSrc={pharmacy} altText="Pharmacy" />
      <ItemCards imgSrc={petCareWeb} altText="Pet Care" />
      <ItemCards imgSrc={babycare} altText="Baby Care" />
    </div>
  )
}

export default App
