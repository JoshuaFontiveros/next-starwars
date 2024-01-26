'use client';

import { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { FunctionComponent } from 'react';
import { SearchBar } from '..';
import { Film } from '@/types/starWarTypes';

interface InputSearchComboboxProps {
  data: Film[];
}

const InputSearchCombobox: FunctionComponent<InputSearchComboboxProps> = ({
  data,
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const filteredValue =
    value === ''
      ? data
      : data.filter((data) => {
          const searchValue = value.toLowerCase();
          return (
            data.title.toLowerCase().includes(searchValue) ||
            data.episode_id.toString().includes(searchValue) ||
            data.director.toLowerCase().includes(searchValue) ||
            data.characters.some((character) => character.toLowerCase().includes(searchValue))
          );
        });

  return (
    <div className='flex flex-col relative'>
      <SearchBar inputValue={value} setInputValue={setValue} />
      {!isEmpty(value) && (
        <div className='absolute h-52 mt-10 w-full z-[999]'>
          <div className='absolute bottom-0 shadow-lg border mt-2 rounded-md h-52 flex flex-col py-2 px-4 bg-white w-full'>
            {isEmpty(filteredValue) ? (
              <span className='text-gray-500'>No results foun</span>
            ) : (
              filteredValue.map((framework) => (
                <span key={framework.episode_id}>{framework.title}</span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSearchCombobox;
