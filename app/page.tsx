import { NextPage } from 'next';
import React from 'react';

import { SearchBar, StarwarsCard } from './_components';

const Home: NextPage = () => {
  return (
    <div className='flex w-full flex-col justify-center'>
      <SearchBar />
      <StarwarsCard />
    </div>
  );
};

export default Home;
