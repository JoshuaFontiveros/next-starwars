import useStarWars from '@/app/_hooks/useStarWars';

import React, { FunctionComponent, ReactElement } from 'react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import moment from 'moment';

const Card: FunctionComponent = (): ReactElement => {
  const { starWarsData } = useStarWars();

  const { title, opening_crawl, release_date, publicId, characters, planets, director, vehicles } =
    starWarsData ?? {};

  return (
    <div className='bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row gap-6 h-auto'>
      <Image
        src={getCldImageUrl({
          src: publicId || '',
          width: 1000,
          height: 1000,
        })}
        width={400}
        height={200}
        loading='lazy'
        placeholder='blur'
        blurDataURL='https://via.placeholder.com/400x200'
        className='w-full h-full'
        alt=''
      />
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold mt-2'>{title}</h2>
        <p className='text-gray-600'>{opening_crawl}</p>
        <div className='flex flex-col'>
          <span className='text-gray-600'>Number of characters involved: {characters?.length}</span>
          <span className='text-gray-600'>Number of planets: {planets?.length}</span>
          <span className='text-gray-600'>Number of starships: {planets?.length}</span>
          <span className='text-gray-600'>Number of vehicles: {vehicles?.length}</span>
        </div>
        <div className='flex flex-col lg:flex-row'>
          <span className='hover:underline font-semibold'>Directed by: {director}</span>

          <span className='hover:underline font-semibold lg:ml-4'>
            Date released: {moment(release_date).format('LL')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
