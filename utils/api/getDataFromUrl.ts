import { StarWarsFilmData } from '@/types/starWarTypes';

const getDataFromURL = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export default getDataFromURL;
