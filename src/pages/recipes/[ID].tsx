import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../../models/Recipe';

const recipes = require('../../models/recipes.json');

export const getStaticProps: GetStaticProps = async (context) => {
  // @ts-ignore
  const recipe = recipes.filter((element: Recipe) => String(element.idMeal) == context.params.ID)[0];

  return {
    props: {
      recipe: recipe
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = recipes.map((recipe: Recipe) => ({params: {ID: String(recipe.idMeal)}}));

  return {paths, fallback: false}
}

const RecipePage = ({recipe}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { ID } = router.query;

  return (
    <div>
      <p>{ID}</p>
      <h1>{recipe.strMeal}</h1>
    </div>
  );
}

export default RecipePage;