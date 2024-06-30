import React from 'react'
import {useSelector} from 'react-redux';
import SmartPhone from './SmartPhone';
import Laptop from './Laptop';
import Fragrances from './Fragrances';
import Groceries from './Groceries';
import Skincare from './Skincare';
import HomeDecoration from './HomeDecoration';
import Top from './Top';
import WomensDresses from './WomensDresses';
import WomenShoes from './WomenShoes';
import ManShirt from './ManShirt';
import ManShoes from './ManShoes';
import ManWatch from './ManWatch';
import WomenWatch from './WomenWatch';




const Home = () => {
  const smartPhones=useSelector(store=>store.smartPhone);
  const laptops = useSelector(store=>store.laptop);
  const fragrances = useSelector(store=>store.fragrances);
  const skincares = useSelector(store=>store.skincare);
  const groceries = useSelector(store=>store.groceries);
  const homeDecorations=useSelector(store=>store.homeDecoration);
  const tops = useSelector(store=>store.top);
  const womanDresses = useSelector(store=>store.womensDresses);
  const womenShoes = useSelector(store=>store.womenShoes);
  const manShirts = useSelector(store=>store.manShirt);
  const manShoess = useSelector(store=>store.manShoes);
  const manWatchs = useSelector(store=>store.manWatch);
  const womenWatchs = useSelector(store=>store.womenWatch);
  




 return (
    <div className='flex justify-center content-center items-center flex-wrap'>
      {
        tops.map((item)=>(
          <Top key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
      {
       womanDresses.map((item)=>(
          <WomensDresses key={item.id} item={item} className='w-1/4'/>
          
        ))
      }

    {
       womenShoes.map((item)=>(
          <WomenShoes key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
       {
       manShirts.map((item)=>(
          <ManShirt key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
      {
       manShoess.map((item)=>(
          <ManShoes key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
      {
       manWatchs.map((item)=>(
          <ManWatch key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
      {
       womenWatchs.map((item)=>(
          <WomenWatch key={item.id} item={item} className='w-1/4'/>
          
        ))
      }


      {
        smartPhones.map((item)=>(
          <SmartPhone key={item.id} item={item} className='w-1/4'/>
          
        ))
      }
       
       {
        laptops.map((item)=>(
          <Laptop key={item.id} item={item} className='w-1/4'/>
          
        ))
      }

{
        fragrances.map((item)=>(
          <Fragrances key={item.id} item={item} className='w-1/4'/>
          
        ))
      }

{
        skincares.map((item)=>(
          <Skincare key={item.id} item={item} className='w-1/4'/>
          
        ))
      }

{
        groceries.map((item)=>(
          <Groceries key={item.id} item={item} className='w-1/4'/>
          
        ))
      }

{
        homeDecorations.map((item)=>(
          <HomeDecoration key={item.id} item={item} className='w-1/4'/>
          
        ))
      }


  
    </div>
  )
}

export default Home
