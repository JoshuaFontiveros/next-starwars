import { StarWarsContext } from '../_providers/StarWarsProvider';
import { useContext } from 'react';

const useStarWars = () => {
  const context = useContext(StarWarsContext);

  if (context === undefined) {
    throw new Error('Video Call hook must be used within a Video Call provider');
  }

  return context;
};

export default useStarWars;
