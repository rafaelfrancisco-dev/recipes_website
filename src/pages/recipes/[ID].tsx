import React from 'react';

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { Meta } from '../../layout/Meta';
import { Recipe } from '../../models/Recipe';
import { Main } from '../../templates/Main';

const recipes = require('../../models/recipes.json');

export const getStaticProps: GetStaticProps = async (context) => {
  const recipe = recipes.filter(
    (element: Recipe) => String(element.idMeal) === context.params.ID,
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
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <div>
      <p>{recipe.idMeal}</p>
      <h1>{recipe.strMeal}</h1>
    </div>
  </Main>
);

export default RecipePage;
