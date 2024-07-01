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
      <Category name="Tops" items={tops} Component={Top} />
      <Category name="Women's Dresses" items={womanDresses} Component={WomensDresses} />
      {/* <Category name="Women's Shoes" items={womenShoes} Component={WomenShoes} /> */}
      <Category name="Men's Shirts" items={manShirts} Component={ManShirt} />
      <Category name="Men's Shoes" items={manShoess} Component={ManShoes} />
      <Category name="Men's Watches" items={manWatchs} Component={ManWatch} />
      <Category name="Women's Watches" items={womenWatchs} Component={WomenWatch} />
      <Category name="Smartphones" items={smartPhones} Component={SmartPhone} />
      <Category name="Laptops" items={laptops} Component={Laptop} />
      <Category name="Fragrances" items={fragrances} Component={Fragrances} />
      {/* <Category name="Skincare" items={skincares} Component={Skincare} /> */}
      <Category name="Groceries" items={groceries} Component={Groceries} />
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
      
      <h1 className='text-xl font-bold my-4 ml-10'>{name}</h1>
      <div className='relative px-8'>
        <button
          className='absolute left-0 top-1/2 transform -translate-y-1/2 z-45 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none'
          onClick={() => scroll('left')}
        >
          &#9664;
        </button>
        <div
          className='flex overflow-x-hidden px-10 space-x-4'
          ref={scrollRef}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map(item => (
            <div
              key={item.id}
              className='flex-shrink-0 justify-center  w-full items-center content-center sm:w-1/2 md:w-1/3 lg:w-1/4'
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
