import { StarWarsFilm, StarWarsFilmData } from '@/types/starWarTypes';
import { NextRequest, NextResponse } from 'next/server';
import { getCldImageUrl } from 'next-cloudinary';
import Cors from 'micro-cors'; // Import micro-cors
const API = process.env.STAR_WARS_API;

type StarwarsSubdata = 'species' | 'planets' | 'characters' | 'starships' | 'vehicles';

const cors = Cors({
  allowMethods: ['GET'],
  origin: '*',
});

const getDataFromUrl = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        ...cors,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from URL: ${url}`);
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const handleUrl = (url: StarWarsFilmData, type: StarwarsSubdata) => {
  const subdataURL = url.results.find((data) => data[type])?.[type] || [];

  return subdataURL;
};

const handleCloudinaryUrl = (episode_id: number) => {
  switch (episode_id) {
    case 1:
      return 'of2xix1ynvsdm7rah7y1';
    case 2:
      return 'bigeedrpqfbmrdidvani';
    case 3:
      return 'nitb99eckaiyvckxjt1f';
    case 4:
      return 'ogy8ipagk3pexi3wok3h';
    case 5:
      return 'omqlyohf2bgbi6h7ziqe';
    case 6:
      return 'f86uf2gblwklfeulibak';
  }
};

const getNames = (data: any) => {
  return data?.map((data: any) => data.name);
};

const getStarWarsFilms = async () => {
  if (API === undefined) return;
  console.log('API URL:', API); // Add this line for debugging
  try {
    const response = await fetch(`${API}/films`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        ...cors,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data');
    }

    const data = await response.json();

    const speciesURL = handleUrl(data, 'species');
    const planetsURL = handleUrl(data, 'planets');
    const starshipsURL = handleUrl(data, 'starships');
    const charactersURL = handleUrl(data, 'characters');
    const vehicles = handleUrl(data, 'vehicles');

    const planetsData = await Promise.all(
      planetsURL?.map(async (url) => await getDataFromUrl(url))
    );

    const starshipsData = await Promise.all(
      starshipsURL?.map(async (url) => await getDataFromUrl(url))
    );

    const charactersData = await Promise.all(
      charactersURL?.map(async (url) => await getDataFromUrl(url))
    );

    const vehiclesData = await Promise.all(vehicles?.map(async (url) => await getDataFromUrl(url)));

    const newData = {
      ...data,
      results: data.results.map((film: StarWarsFilm) => ({
        ...film,
        species: getNames(speciesURL),
        characters: getNames(charactersData),
        starships: getNames(starshipsData),
        planets: getNames(planetsData),
        vehicles: getNames(vehiclesData),
        publicId: handleCloudinaryUrl(film.episode_id) || '',
        imageUrl: getCldImageUrl({
          src: handleCloudinaryUrl(film.episode_id) || '',
          width: 300,
          height: 300,
        }),
      })),
    };

    return newData;
  } catch (error) {
    console.error('Error fetching Star Wars films:', error);
    throw error;
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await getStarWarsFilms();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
