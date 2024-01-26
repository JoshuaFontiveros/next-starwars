'use client';

import { ReactElement, useEffect, useMemo, useState } from 'react';
import { debounce, isEmpty, set } from 'lodash';
import { FunctionComponent } from 'react';
import { SearchBar } from '..';
import { StarWarsFilmData } from '@/types/starWarTypes';
import { getFilms } from '@/utils/api';

const InputSearchCombobox: FunctionComponent = (): ReactElement => {
  const [value, setValue] = useState('');

  const [clientData, setClientData] = useState<StarWarsFilmData>([]);

  // const debouncedFetchData = debounce(async (inputValue) => {
  //   const data = await getFilms(inputValue);
  //   setClientData(data);
  // }, 1000);

  useEffect(() => {
    SWApi.Planets.findBySearch(['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor']).then(
      (planets) =>
        _.map(planets.resources, (planet) => ({
          text: planet.value.name,
          value: parseInt(planet.value.population),
        }))
    );

    SWApi.Vehicles.find((vehicle) => vehicle.pilots.length > 0)
      .then((vehicles) => vehicles.populateAll('pilots'))
      .then((vehicles) => vehicles.populateAll('pilots.homeworld'))
      .then((vehicles) =>
        _.filter(vehicles.resources, (vehicle) =>
          _.every(
            vehicle.value.pilots,
            (pilot) => _.get(pilot, 'homeworld.population') !== 'unknown'
          )
        )
      )
      .then((vehicles) =>
        _.map(vehicles, (vehicle) => ({
          name: vehicle.value.name,
          pilots: _.map(vehicle.value.pilots as SWApi.IPeople[], 'name'),
          population: _.map(vehicle.value.pilots, (pilot) => ({
            name: _.get(pilot, 'homeworld.name'),
            population: _.get(pilot, 'homeworld.population'),
          })),
          get populationSum() {
            return _.sumBy(this.population, (p) => parseInt(p.population));
          },
        }))
      )
      .then((vehicles) => _.reverse(_.sortBy(vehicles, (vehicle) => vehicle.populationSum)));
  }, []);

  // useEffect(() => {
  //   // Call the debounced function when the value changes
  //   if (value) {
  //     debouncedFetchData(value);
  //   }
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value]);

  const filteredValue = useMemo(() => {
    if (isEmpty(clientData.results)) {
      return;
    }
    if (value === '') {
      return clientData?.results;
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
              filteredValue?.map((value) => <span key={value.episode_id}>{value.title}</span>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSearchCombobox;
