'use client';

import { StarWarsFilm } from '@/types/starWarTypes';
import React, { createContext, useState, ReactNode, FunctionComponent, ReactElement } from 'react';

interface StarWarsContextInterface {
  starWarsData: StarWarsFilm;
  setStarWarsData: (data: StarWarsFilm) => void;
}

export const StarWarsContext = createContext<StarWarsContextInterface | undefined>(undefined);

interface StarWarsContextProviderProps {
  children: ReactNode;
}

const StarWarsProvider: FunctionComponent<StarWarsContextProviderProps> = ({
  children,
}): ReactElement => {
  const [starWarsData, setStarWarsData] = useState<StarWarsFilm>({} as StarWarsFilm);

  const contextValue: StarWarsContextInterface = {
    starWarsData,
    setStarWarsData,
  };

  return <StarWarsContext.Provider value={contextValue}>{children}</StarWarsContext.Provider>;
};

export default StarWarsProvider;
