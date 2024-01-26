import { NextPage } from 'next';
import React from 'react';
import { InputSearchCombobox } from './_components';
import { getFilms } from '@/utils/api';
import { useRouter } from 'next/navigation';

const Home: NextPage = async () => {
  const router = useRouter();
  const films = await getFilms();
  return (
    <div className='flex flex-col w-full'>
      <span>Server side</span>
      <span>Client side</span>
    </div>
  );
};

export default Home;
