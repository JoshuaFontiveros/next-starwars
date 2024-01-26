import { NextPage } from 'next';
import React from 'react';
import { InputSearchCombobox, StarwarsCard } from './_components';
import { getFilms } from '@/utils/api';

const Home: NextPage = async () => {
  const films = await getFilms();

  return (
    <div className='flex flex-col w-full'>
      <InputSearchCombobox data={films} />
      <StarwarsCard />
    </div>
  );
};

export default Home;
