'use client';

import { ReactElement, Ref, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { debounce, isEmpty, set } from 'lodash';
import { FunctionComponent } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useDebounce, useClickAway } from '@uidotdev/usehooks';
import useStarWars from '@/app/_hooks/useStarWars';
import { StarWarsFilm, StarWarsFilmData } from '@/types/starWarTypes';

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
  const { starWarsData, setStarWarsData } = useStarWars();

  console.log('starWarsData', starWarsData);
  const [isOpen, setIsOpen] = useState(false);

  const handleSetValue = useCallback(
    (value: string) => {
      setValue(value);
    },
    [value]
  );

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

  const handleSelect = useCallback(
    (value: StarWarsFilm) => {
      if (starWarsData === value) return;
      setStarWarsData(value);

      //clear fields
      setValue('');
      setIsOpen(false);
    },
    [starWarsData, setStarWarsData]
  );

  const PureSearchbar = memo(SearchBar);

  return (
    <div className='flex flex-col relative' ref={divRef as Ref<HTMLDivElement>}>
      <PureSearchbar
        inputValue={value}
        setInputValue={handleSetValue}
        open={isOpen}
        setOpen={setIsOpen}
      />
      {isOpen && <SearchResults filteredValue={filteredValue} handleSelect={handleSelect} />}
    </div>
  );
};

export default InputSearchCombobox;
