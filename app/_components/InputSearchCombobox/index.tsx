'use client';

import { ReactElement, Ref, useCallback, useEffect, useMemo, useState } from 'react';

import { isEmpty } from 'lodash';
import { FunctionComponent } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useDebounce, useClickAway } from '@uidotdev/usehooks';
import useStarWars from '@/app/_hooks/useStarWars';
import { StarWarsFilm, StarWarsFilmData } from '@/types/starWarTypes';
import { getFilms } from '@/utils/api';
import { toast } from 'sonner';

const InputSearchCombobox: FunctionComponent = (): ReactElement => {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);
  const divRef = useClickAway(() => {
    setIsOpen(false);
  });

  const { starWarsData, setStarWarsData } = useStarWars();

  const [clientData, setClientData] = useState<StarWarsFilmData>({} as StarWarsFilmData);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleSetValue = useCallback(
    (value: string) => {
      setValue(value);
    },
    //eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (!debounceValue) return;

    const fetchData = async () => {
      setLoading(true);
      const data = await getFilms();
      if (data) {
        setClientData(data);
      } else {
        toast.error('Error fetching data');
      }
      setLoading(false);
    };
    fetchData().catch((err) => toast.error(err.message));
  }, [debounceValue]);

  useEffect(() => {
    setIsOpen(!!debounceValue);
  }, [debounceValue]);

  const filteredValue = useMemo(() => {
    if (isEmpty(clientData?.results)) {
      return [];
    }
    if (debounceValue === '') {
      return clientData?.results;
    }

    return clientData?.results.filter((data) => {
      const searchValue = debounceValue.toLowerCase();

      if (!data) return false;

      return [
        data.title,
        data.director,
        data.episode_id.toString(),
        ...data.species,
        ...data.planets,
        ...data.starships,
        ...data.vehicles,
        ...data.characters,
      ].some((item) => item?.toLowerCase().includes(searchValue));
    });
  }, [clientData, debounceValue]);

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

  return (
    <div className='flex flex-col relative' ref={divRef as Ref<HTMLDivElement>}>
      <SearchBar
        inputValue={value}
        setInputValue={handleSetValue}
        open={isOpen}
        setOpen={setIsOpen}
      />
      {isOpen && (
        <SearchResults
          filteredValue={filteredValue}
          handleSelect={handleSelect}
          loading={loading}
        />
      )}
    </div>
  );
};

export default InputSearchCombobox;
