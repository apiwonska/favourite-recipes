import { useEffect } from 'react';

const useTitle = (subtitle: string): void => {
  useEffect(() => {
    document.title = `Favourite Recipes | ${subtitle}`;
  }, []);
};

export default useTitle;
