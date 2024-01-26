'use client';

import { LegacyRef, ReactElement, Ref, useEffect, useMemo, useState } from 'react';
import { isEmpty, set } from 'lodash';
import { FunctionComponent } from 'react';
import { SearchBar } from '..';
import { StarWarsFilmData } from '@/types/starWarTypes';
import { useDebounce, useClickAway } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';

interface InputSearchComboboxProps {
  data: StarWarsFilmData;
}

const InputSearchCombobox: FunctionComponent<InputSearchComboboxProps> = ({
  data,
}): ReactElement => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);
  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!debounceValue);
  }, [debounceValue]);

  const filteredValue = useMemo(() => {
    if (isEmpty(data.results)) {
      return;
    }
    if (debounceValue === '') {
      return data?.results;
    }

    return data.results.filter((data) => {
      const searchValue = debounceValue.toLowerCase();
      return (
        data.title.toLowerCase().includes(searchValue) ||
        data.species.some((species) => species.toLowerCase().includes(searchValue)) ||
        data.episode_id.toString().includes(searchValue) ||
        data.director.toLowerCase().includes(searchValue) ||
        data.planets.some((planet) => planet.toLowerCase().includes(searchValue)) ||
        data.characters.some((character) => character.toLowerCase().includes(searchValue))
      );
    });
  }, [data, debounceValue]);

  return (
    <div className='flex flex-col relative'>
      <SearchBar inputValue={value} setInputValue={setValue} />

      {isOpen && (
        <motion.div
          className='relative'
          ref={ref as Ref<HTMLDivElement>}
          initial={{ y: 0, x: 0, scale: 0.5, rotate: 0 }}
          animate={{
            y: 300,
            transition: { delay: 0.2, type: 'spring', stiffness: 100 },
            scale: 1,
            rotate: 0,
          }}
        >
          <div className='absolute  w-full z-[999]'>
            <div
              className={`absolute bottom-0 shadow-lg border mt-8 rounded-md h-auto flex flex-col gap-2 py-2 px-4 bg-white w-full`}
            >
              {isEmpty(filteredValue) ? (
                <span className='text-gray-500'>No results found</span>
              ) : (
                filteredValue?.map((value) => (
                  <div
                    key={value.episode_id}
                    onClick={() => {
                      setValue('');
                      setIsOpen((prev) => !prev);
                    }}
                    className='hover:bg-gray-500 w-auto cursor-pointer flex gap-2 items-center'
                  >
                    <img
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1920px-Image_created_with_a_mobile_phone.png'
                      className='w-10 h-10'
                      alt='test'
                    />
                    {value.title}
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InputSearchCombobox;
