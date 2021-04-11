import React from 'react';

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import FadeInImage from '../../components/FadeInImage';
import { Meta } from '../../layout/Meta';
import { Recipe } from '../../models/Recipe';
import { Main } from '../../templates/Main';

const recipes = require('../../models/recipes.json');

export const getStaticProps: GetStaticProps = async (context) => {
  const recipe = recipes.filter(
    (element: Recipe) => String(element.idMeal) === context.params?.ID,
  )[0];

  if (recipe === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = recipes.map((recipe: Recipe) => ({ params: { ID: String(recipe.idMeal) } }));

  return { paths, fallback: false };
};

const RecipePage = ({ recipe }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main meta={<Meta title={recipe.strMeal} description={recipe.strCategory} />}>
    <article className="prose lg:prose-xl">
      <h1 className="text-gray-900 dark:text-gray-100">{recipe.strMeal}</h1>

      <div className="relative md:pl-6 xl:pl-8 hidden sm:block h-64">
        <FadeInImage
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="my-4">
        <h3 className="font-mono mb-2">Info</h3>
        <h5>{recipe.strCategory}</h5>
        <h5>{recipe.strTags}</h5>
      </div>

      <div className="my-4">
        <h3 className="font-mono mb-2">Ingredients</h3>
        <p>Ingredients go here</p>
      </div>

      <div className="my-4">
        <h3 className="font-mono mb-2">Instructions</h3>

        {recipe.strInstructions.split('\\r\\n').map((i: string) => (
          <p key={i}>{i}</p>
        ))}
      </div>
    </article>
  </Main>
);

export default RecipePage;
