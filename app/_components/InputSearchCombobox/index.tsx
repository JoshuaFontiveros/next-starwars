'use client';

import { ReactElement, Ref, useEffect, useMemo, useState } from 'react';
import { isEmpty, set } from 'lodash';
import { FunctionComponent } from 'react';
import { SearchBar, SearchResults } from '.';

import { useDebounce, useClickAway } from '@uidotdev/usehooks';
import useStarWars from '@/app/_hooks/useStarWars';

interface InputSearchComboboxProps {
  data: StarWarsFilmData;
}

const InputSearchCombobox: FunctionComponent<InputSearchComboboxProps> = ({
  data,
}): ReactElement => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);
  const divRef = useClickAway(() => {
    setIsOpen(false);
  });
  const { setStarWarsData } = useStarWars();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!debounceValue);
  }, [debounceValue]);

  const filteredValue = useMemo(() => {
    if (isEmpty(data.results)) {
      return [];
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

  const handleSelect = (value: StarWarsFilm) => {
    setStarWarsData(value);

    //clear fields
    setValue('');
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col relative' ref={divRef as Ref<HTMLDivElement>}>
      <SearchBar inputValue={value} setInputValue={setValue} open={isOpen} setOpen={setIsOpen} />
      {isOpen && <SearchResults filteredValue={filteredValue} handleSelect={handleSelect} />}
    </div>
  );
};

export default InputSearchCombobox;
