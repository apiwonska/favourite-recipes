export interface RecipeInterface {
  id: string;
  fields: {
    name: string;
    link: string;
    note: string;
  };
}

export interface RecipeDataInterface {
  records: RecipeInterface[];
  offset?: string;
}
