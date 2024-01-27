'use client';
import React, { FunctionComponent, ReactElement } from 'react';
import Card from './Card';
import useStarWars from '@/app/_hooks/useStarWars';

const CardContainer: FunctionComponent = (): ReactElement => {
  const { starWarsData } = useStarWars();

  if (!starWarsData) {
    return <div>Nothing to show</div>;
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
        <Card />
      </div>
    </div>
  );
};

export default CardContainer;
