import { StarWarsFilmData } from '@/types/starWarTypes';
import getDataFromUrl from './getDataFromUrl';

type StarwarsSubdata = 'species' | 'planets' | 'characters' | 'starships' | 'vehicles';

const handleUrl = (url: StarWarsFilmData, type: StarwarsSubdata) => {
  const subdataURL = url.results.find((data) => data[type])?.[type] || [];

  return subdataURL;
};

const getNames = (data: any) => {
  return data?.map((data: any) => data.name);
};

const getFilms = async (query: string): Promise<StarWarsFilmData> => {
  try {
    const response = await fetch(`https://swapi.dev/api/films?=sear${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data');
    }

    const data: StarWarsFilmData = await response.json();

    // const speciesURL = handleUrl(data, 'species');
    // const planetsURL = handleUrl(data, 'planets');
    // const starshipsURL = handleUrl(data, 'starships');
    // const charactersURL = handleUrl(data, 'characters');
    // const vehicles = handleUrl(data, 'vehicles');

    // const planetsData = await Promise.all(
    //   planetsURL?.map(async (url) => await getDataFromUrl(url))
    // );

    // const starshipsData = await Promise.all(
    //   starshipsURL?.map(async (url) => await getDataFromUrl(url))
    // );

    // const charactersData = await Promise.all(
    //   charactersURL?.map(async (url) => await getDataFromUrl(url))
    // );

    // const vehiclesData = await Promise.all(vehicles?.map(async (url) => await getDataFromUrl(url)));

    // const newData = {
    //   ...data,
    //   results: data.results.map((film) => ({
    //     ...film,
    //     species: getNames(speciesURL),
    //     characters: getNames(charactersData),
    //     starships: getNames(starshipsData),
    //     planets: getNames(planetsData),
    //     vehicles: getNames(vehiclesData),
    //   })),
    // };

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getFilms;
