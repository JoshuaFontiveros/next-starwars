import React, { FunctionComponent, ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StarWarsFilm } from '@/types/starWarTypes';
import { cn } from '@/utils/cn';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import moment from 'moment';

interface SearchResultsProps {
  filteredValue: StarWarsFilm[];
  handleSelect: (value: StarWarsFilm) => void;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  filteredValue,
  handleSelect,
}): ReactElement => {
  return (
    <AnimatePresence>
      <motion.div
        className='relative'
        initial={{ y: 0, x: 0, rotate: 0 }}
        animate={{
          y: 2,
          transition: { delay: 0.2, type: 'spring', stiffness: 100 },
          scale: 1,
          rotate: 0,
        }}
      >
        <div
          className={cn(
            'shadow-lg border p-2 rounded-md  flex flex-col gap-2 py-2 px-4 bg-white w-full',
            isEmpty(filteredValue) ? 'h-100' : 'h-auto'
          )}
        >
          {isEmpty(filteredValue) ? (
            <span className='text-gray-500'>No results found</span>
          ) : (
            filteredValue?.map((value) => (
              <div
                key={value.episode_id}
                onClick={() => handleSelect(value)}
                className='hover:bg-gray-500 w-auto cursor-pointer flex gap-2 items-center'
              >
                <Image
                  src={value.images}
                  width={1000}
                  height={1000}
                  loading='lazy'
                  placeholder='blur'
                  className='w-24 h-24'
                  alt='test'
                  blurDataURL='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png'
                />
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <span className='font-semibold'>{value.title}</span>
                    <span className='font-light'>({moment(value.release_date).format('LL')})</span>
                  </div>
                  <span>Director: {value.director}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;
