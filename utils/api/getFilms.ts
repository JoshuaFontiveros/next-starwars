import { Film } from '@/types/starWarTypes';

const getFilms = async (): Promise<Film[]> => {
  try {
    const response = await fetch(`https://swapi.dev/api/films`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data');
    }

    const data: Film[] = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getFilms;
