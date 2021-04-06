import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Recipe } from '../../models/Recipe';

const recipes = require('../../models/recipes.json');

function searchRecipes(name: string): Array<Recipe> | null {
  const foundArray = recipes.filter((e: Recipe) => e.strMeal.includes(name));
  if (foundArray.length > 0) {
    return foundArray;
  } else {
    return null;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.searchName instanceof String) {
    return {
      props: {
        recipes: searchRecipes(context.params.searchName as string),
      }
    }
  } else {
    return {
      notFound: true,
    }
  } 
}

function SearchPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  <div>
    <h1>Search page</h1>
    <h2>{data.recipes.length}</h2>
  </div>
}

export default SearchPage;
