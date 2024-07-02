import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
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
import Banner from '../Component/Banner';
import ItemsCategory from '../Component/ItemsCategory';
import ItemCards from '../Component/ItemCards'
import { Link } from 'react-router-dom';

const Home = () => {
  const smartPhones = useSelector(store => store.smartPhone);
  const laptops = useSelector(store => store.laptop);
  const fragrances = useSelector(store => store.fragrances);
  const skincares = useSelector(store => store.skincare);
  const groceries = useSelector(store => store.groceries);
  const homeDecorations = useSelector(store => store.homeDecoration);
  const tops = useSelector(store => store.top);
  const womanDresses = useSelector(store => store.womensDresses);
  const womenShoes = useSelector(store => store.womenShoes);
  const manShirts = useSelector(store => store.manShirt);
  const manShoess = useSelector(store => store.manShoes);
  const manWatchs = useSelector(store => store.manWatch);
  const womenWatchs = useSelector(store => store.womenWatch);

  return (
    <div className='flex flex-col '>
      <Banner/>
      <ItemCards/>
      <ItemsCategory/>
      <Category name="tops" items={tops} Component={Top} />
      <Category name="womens-dresses" items={womanDresses} Component={WomensDresses} />
      {/* <Category name="Women's Shoes" items={womenShoes} Component={WomenShoes} /> */}
      <Category name="man-shirts" items={manShirts} Component={ManShirt} />
      <Category name="women-shoes" items={manShoess} Component={ManShoes} />
      <Category name="mens-watches" items={manWatchs} Component={ManWatch} />
      <Category name="womens-watches" items={womenWatchs} Component={WomenWatch} />
      <Category name="smartphones" items={smartPhones} Component={SmartPhone} />
      <Category name="laptops" items={laptops} Component={Laptop} />
      <Category name="fragrances" items={fragrances} Component={Fragrances} />
      {/* <Category name="Skincare" items={skincares} Component={Skincare} /> */}
      <Category name="groceries" items={groceries} Component={Groceries} />
      {/* <Category name="Home Decoration" items={homeDecorations} Component={HomeDecoration} /> */}
    </div>
  );
};

const Category = ({ name, items, Component }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstChild.getBoundingClientRect().width;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -itemWidth * 3 : itemWidth * 3,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='mb-2  '>
      
     <div className='flex justify-between content-center items-center px-10 mt-10'>
     <h1 className='text-xl font-bold'>{name}</h1>
     <Link to={`/showCategory/${name}`} className='text-green-700 text-xl'>see all</Link>
     </div>
      <div className='relative px-8'>
        <button
          className='absolute left-0 top-1/2 transform -translate-y-1/2 z-45 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none'
          onClick={() => scroll('left')}
        >
          &#9664;
        </button>
        <div
          className='flex overflow-x-hidden px-10 space-x-4 gap-4'
          ref={scrollRef}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className='flex-shrink-0 justify-center  w-full items-center content-center sm:w-full md:w-1/3 lg:w-1/4'
              style={{ scrollSnapAlign: 'start' }}
            >
              <Component item={item} />
            </div>
          ))}
        </div>
        <button
          className='absolute right-0 top-1/2 transform -translate-y-1/2 z-45 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none'
          onClick={() => scroll('right')}
        >
          &#9654;
        </button>

      </div>
    </div>
  );
};

export default Home;
