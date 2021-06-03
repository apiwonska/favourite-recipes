export interface IRecipe {
  id: string;
  fields: {
    name: string;
    link: string;
    note?: string;
    image?: string;
    locked?: boolean;
    created: string;
    updated: string;
  };
}

export interface IRecipeData {
  records: IRecipe[];
  offset?: string;
}
