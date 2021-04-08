import React from 'react';

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { Meta } from '../../layout/Meta';
import { Recipe } from '../../models/Recipe';
import { Main } from '../../templates/Main';

const recipes = require('../../models/recipes.json');

function searchRecipes(name: string | string[]): Array<Recipe> | null {
  const searchName = typeof name === 'string' ? name.toLowerCase() : name[0].toLowerCase();
  const foundArray = recipes.filter((e: Recipe) => e.strMeal.toLowerCase().includes(searchName));

  if (foundArray !== undefined) {
    return foundArray;
  }
  return [];
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => ({
  props: {
    recipes: searchRecipes(params?.searchName === undefined ? '' : params.searchName),
  },
});

const SearchPage = ({ props }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <div>
      <h2>{props.recipes.length}</h2>
    </div>
  </Main>
);

export default SearchPage;
