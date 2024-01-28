import { StarWarsFilmData } from '@/types/starWarTypes';

const API = process.env.NEXT_PUBLIC_API;

const getFilms = async (): Promise<StarWarsFilmData> => {
  try {
    const response = await fetch(`${API}/star-wars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data. Please try again later.');
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getFilms;
