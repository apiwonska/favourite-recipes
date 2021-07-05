import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { fetchCategories } from 'api';
import { ICategory } from 'appInterfaces';

interface IuseCategoryReturn {
  categories: ICategory[] | null;
  isLoading: boolean;
  isError: boolean;
}

const useCategories = (): IuseCategoryReturn => {
  const { data, isLoading, isError } = useQuery('categories', fetchCategories);
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    if (data) {
      const sortedCategories = data?.records.sort(
        (cat1, cat2) => cat1.fields.order - cat2.fields.order
      );
      setCategories(sortedCategories);
    }
  }, [data]);

  return { categories, isLoading, isError };
};

export default useCategories;
