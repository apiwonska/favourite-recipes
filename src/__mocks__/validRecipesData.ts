import { RecipeInterface } from 'app_interfaces';

const createRecipe = (n: number): RecipeInterface => ({
  id: `${n}`,
  fields: {
    name: `Recipe title ${n}`,
    link: `url ${n}`,
    note: `Best apple pie recipe ${n}`,
  },
});
const data = { records: [1, 2, 3].map((n) => createRecipe(n)) };

export default data;
