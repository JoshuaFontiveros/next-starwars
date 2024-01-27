import { DataResponse } from '@/types/starWarTypes';

const API = process.env.NEXT_PUBLIC_API;

const getFilms = async (): Promise<DataResponse> => {
  try {
    const response = await fetch(`${API}/star-wars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data');
    }

    const data = await response.json();

    console.log('data', data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getFilms;
