import { NextResponse } from 'next/server';
const API = process.env.STARWARS_API;

const getStarWarsFilms = async () => {
  if (API === undefined) return;
  console.log('API URL:', API); // Add this line for debugging
  try {
    const response = await fetch(`${API}/films`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Star Wars films data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Star Wars films:', error);
    throw error;
  }
};

export default async function POST(request: Request) {
  try {
    const data = await getStarWarsFilms();
    return NextResponse.json({ data });
  } catch (error) {
    return;
  }
}
