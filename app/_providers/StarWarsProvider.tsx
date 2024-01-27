'use client';

import { StarWarsFilm } from '@/types/starWarTypes';
import React, {
  createContext,
  useState,
  ReactNode,
  FunctionComponent,
  ReactElement,
  useCallback,
} from 'react';

interface StarWarsContextInterface {
  starWarsData?: StarWarsFilm;
  setStarWarsData: (data: StarWarsFilm) => void;
  activateServerSearch: boolean;
  setActivateServerSearch: (value: boolean) => void;
}

export const StarWarsContext = createContext<StarWarsContextInterface | undefined>(undefined);

interface StarWarsContextProviderProps {
  children: ReactNode;
}

const StarWarsProvider: FunctionComponent<StarWarsContextProviderProps> = ({
  children,
}): ReactElement => {
  const [starWarsData, setStarWarsData] = useState<StarWarsFilm>();
  const [activateServerSearch, setActivateServerSearch] = useState(false);

  const contextValue: StarWarsContextInterface = {
    activateServerSearch,
    setActivateServerSearch,
    starWarsData,
    setStarWarsData: useCallback(
      (data: StarWarsFilm) => {
        setStarWarsData(data);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [starWarsData]
    ),
  };

  return <StarWarsContext.Provider value={contextValue}>{children}</StarWarsContext.Provider>;
};

export default StarWarsProvider;
