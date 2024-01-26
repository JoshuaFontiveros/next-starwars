import { NextPage } from 'next';
import React from 'react';
import { InputSearchCombobox } from '../_components';
import { getFilms } from '@/utils/api';
import { isEmpty } from 'lodash';

const ServerSide: NextPage = async () => {
  const films = await getFilms();
  return (
    <div className='flex flex-col w-full'>
      <InputSearchCombobox data={films} />
    </div>
  );
};

export default ServerSide;
