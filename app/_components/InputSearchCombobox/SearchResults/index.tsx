import React, { FunctionComponent, ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StarWarsFilm } from '@/types/starWarTypes';
import { cn } from '@/utils/cn';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import moment from 'moment';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  filteredValue: StarWarsFilm[];
  handleSelect: (value: StarWarsFilm) => void;
  loading: boolean;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({
  filteredValue,
  handleSelect,
  loading,
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
          ) : loading ? (
            <Loader2 className='animate-spin transition all ease-in-out ' />
          ) : (
            filteredValue?.map((value) => (
              <div
                key={value.episode_id}
                onClick={() => handleSelect(value)}
                className=' w-auto cursor-pointer flex gap-6 items-center  hover:bg-gray-500 hover:text-white p-2 rounded-md transition-all ease-in-out relative'
              >
                <Image
                  src={value.imageUrl}
                  width={1000}
                  height={1000}
                  loading='lazy'
                  placeholder='blur'
                  className='w-20 h-20'
                  alt='test'
                  blurDataURL='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png'
                />
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 flex-wrap'>
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
