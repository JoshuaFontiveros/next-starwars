import { NextPage } from 'next';
import React from 'react';
import { InputSearchCombobox, StarwarsCard } from './_components';
import { getFilms } from '@/utils/api';
import { isEmpty } from 'lodash';

const Home: NextPage = async () => {
  return (
    <div className='flex flex-col w-full'>
      <InputSearchCombobox />
      <StarwarsCard />
    </div>
  );
};

export default Home;
