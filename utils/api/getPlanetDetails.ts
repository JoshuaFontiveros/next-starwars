interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
}

// Function to fetch planet details
async function fetchPlanetDetails(planetUrl: string): Promise<Planet | null> {
  try {
    const response = await fetch(planetUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const planetData: Planet = await response.json();
    return planetData;
  } catch (error) {
    console.error('Error fetching planet details:', error);
    return null;
  }
}

// URL of the Star Wars planets resource
const planetsUrl = 'https://swapi.dev/api/planets/';

// Function to fetch details for all planets
async function fetchAllPlanetDetails(): Promise<Planet[]> {
  const planetDetails: Planet[] = [];
  try {
    let nextUrl = planetsUrl;
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const planetPage = await response.json();
      const planetsOnPage: Planet[] = planetPage.results;
      planetDetails.push(...planetsOnPage);
      nextUrl = planetPage.next;
    }
  } catch (error) {
    console.error('Error fetching planet details:', error);
  }
  return planetDetails;
}

// Fetch details for all planets
fetchAllPlanetDetails()
  .then((planetDetails) => {
    console.log('Planet details:', planetDetails);
  })
  .catch((error) => {
    console.error('Error fetching planet details:', error);
  });
