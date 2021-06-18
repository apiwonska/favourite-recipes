export interface IRecipe {
  id: string;
  fields: {
    name: string;
    link: string;
    note?: string;
    image?: string;
    categories: string[];
    locked?: boolean;
    created: string;
    updated: string;
  };
}

export interface IRecipeData {
  records: IRecipe[];
  offset?: string;
}

export interface ICategory {
  id: string;
  fields: {
    name: string;
    order: number;
  };
}

export interface ICategoryData {
  records: ICategory[];
}
