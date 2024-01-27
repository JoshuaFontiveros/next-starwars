import useStarWars from '@/app/_hooks/useStarWars';

import React, { FunctionComponent, ReactElement } from 'react';
import { CldImage } from 'next-cloudinary';
import moment from 'moment';

const Card: FunctionComponent = (): ReactElement => {
  const { starWarsData } = useStarWars();

  const { title, opening_crawl, release_date, publicId, characters, planets, director, vehicles } =
    starWarsData ?? {};

  return (
    <div className='bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3'>
      <CldImage
        width='300'
        height='200'
        src={publicId ? publicId : 'https://via.placeholder.com/300x200'}
        sizes='100vw'
        alt='Description of my image'
      />
      <h2 className='text-xl font-semibold mt-2'>{title}</h2>
      <p className='text-gray-600'>{opening_crawl}</p>
      <div className='flex flex-col'>
        <span className='text-gray-600'>Number of characters involved: {characters?.length}</span>
        <span className='text-gray-600'>Number of planets: {planets?.length}</span>
        <span className='text-gray-600'>Number of starships: {planets?.length}</span>
        <span className='text-gray-600'>Number of vehicles: {vehicles?.length}</span>
      </div>
      <div className='flex flex-col'>
        <span className='hover:underline font-semibold'>Directed by: {director}</span>
        <span className='hover:underline font-semibold'>
          Date released: {moment(release_date).format('LL')}
        </span>
      </div>
    </div>
  );
};

export default Card;
