import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Recipe } from '../models/Recipe';
import Link from 'next/link';

const recipes = require('../models/recipes.json');

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      recipeList: recipes
    }
  };
};

const Index = ({ recipeList }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Main
    meta={(
      <Meta
        title='Next.js Boilerplate Presentation'
        description='Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework.'
      />
    )}
  >
    <a href='https://github.com/ixartz/Next-js-Boilerplate'>
      <img
        src={`${process.env.baseUrl}/assets/images/nextjs-starter-banner.png`}
        alt='Nextjs starter banner'
      />
    </a>

    {recipeList.sort((a: Recipe, b: Recipe) => {a.strMeal < b.strMeal}).map((recipe: Recipe) => (
      <Link key={recipe.idMeal} href={"/recipes/" + recipe.idMeal}>
        <p>{recipe.strMeal}</p>
      </Link>
    ))}
  </Main>
);

export default Index;
