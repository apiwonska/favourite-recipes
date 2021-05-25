export interface RecipeInterface {
  id: string;
  fields: {
    name: string;
    link: string;
    note: string;
    image: string;
    locked: boolean;
    created: string;
    updated: string;
  };
}

export interface RecipeDataInterface {
  records: RecipeInterface[];
  offset?: string;
}

export interface RecipePayloadInterface {
  fields: {
    name: string;
    link: string;
    note?: string;
    image?: string;
  };
}
