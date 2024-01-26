import { NextPage } from 'next';
import React from 'react';

import { InputSearchCombobox, StarwarsCard } from './_components';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <InputSearchCombobox />
      <StarwarsCard />
    </div>
  );
};

export default Home;
