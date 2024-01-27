export interface StarWarsFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  imageUrl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  publicId: string;
  url: string;
}

export interface StarWarsFilmData {
  count: number;
  next: null | string;
  previous: null | string;
  results: StarWarsFilm[];
}
export interface DataResponse {
  data: StarWarsFilmData;
}
