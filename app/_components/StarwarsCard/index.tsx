import React, { FunctionComponent, ReactElement } from 'react';
import { CardBody, CardContainer, CardItem } from '../animated/3DCard';
import { StarWarsFilm } from '@/types/starWarTypes';

interface StarwarsCardProps {
  data: StarWarsFilm;
}
const StarwarsCard: FunctionComponent<StarwarsCardProps> = ({ data }): ReactElement => {
  const { title, episode_id, director, producer, release_date, opening_crawl } = data;

  return (
    <CardContainer className='inter-var'>
      <CardBody className='bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  '>
        <CardItem translateZ='50' className='text-xl font-bold text-neutral-600 dark:text-white'>
          {title}
        </CardItem>
        <CardItem
          as='p'
          translateZ='60'
          className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ='100' rotateX={20} rotateZ={-10} className='w-full mt-4'>
          aasd
          {/* <img
            src='https://images.unsplash.com/photo-1622837130330-4a9d5c5d7d3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwYmFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
            alt='card'
            className='w-full h-full rounded-xl'
          /> */}
        </CardItem>
        <div className='flex justify-between items-center mt-20'>
          <CardItem
            translateZ={20}
            translateX={-40}
            as='button'
            className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white'
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as='button'
            className='px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold'
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default StarwarsCard;
