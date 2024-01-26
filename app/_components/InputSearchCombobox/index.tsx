'use client';

import { useEffect, useMemo, useState } from 'react';
import { isEmpty, set } from 'lodash';
import { FunctionComponent } from 'react';
import { SearchBar } from '..';
import { StarWarsFilmData } from '@/types/starWarTypes';
import { getFilms } from '@/utils/api';

interface InputSearchComboboxProps {
  data: StarWarsFilmData;
}

const InputSearchCombobox: FunctionComponent<InputSearchComboboxProps> = ({
  data,
}): React.ReactElement => {
  const [value, setValue] = useState('');

  const [clientData, setClientData] = useState<StarWarsFilmData>(() => data);

  console.log('clientData', clientData);

  const filteredValue = useMemo(() => {
    if (isEmpty(clientData.results)) {
      return;
    }
    if (value === '') {
      return clientData.results;
    }

    return clientData.results.filter((data) => {
      const searchValue = value.toLowerCase();
      return (
        data.title.toLowerCase().includes(searchValue) ||
        data.species.some((species) => species.toLowerCase().includes(searchValue)) ||
        data.episode_id.toString().includes(searchValue) ||
        data.director.toLowerCase().includes(searchValue) ||
        data.planets.some((planet) => planet.toLowerCase().includes(searchValue)) ||
        data.characters.some((character) => character.toLowerCase().includes(searchValue))
      );
    });
  }, [clientData, value]);

  return (
    <div className='flex flex-col relative'>
      <SearchBar inputValue={value} setInputValue={setValue} />
      {!isEmpty(value) && (
        <div className='absolute h-52 mt-10 w-full z-[999]'>
          <div className='absolute bottom-0 shadow-lg border mt-2 rounded-md h-52 flex flex-col py-2 px-4 bg-white w-full'>
            {isEmpty(filteredValue) ? (
              <span className='text-gray-500'>No results found</span>
            ) : (
              filteredValue &&
              filteredValue?.map((value) => <span key={value.episode_id}>{value.title}</span>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSearchCombobox;
