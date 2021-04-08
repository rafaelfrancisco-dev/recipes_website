import React from 'react';

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

import { Meta } from '../../layout/Meta';
import { Recipe } from '../../models/Recipe';
import { Main } from '../../templates/Main';
import Link from 'next/link';

function searchRecipes(name: string | string[]): Array<Recipe> {
  const recipes = require('../../models/recipes.json');

  const searchName = typeof name === 'string' ? name.toLowerCase() : name[0].toLowerCase();
  const foundArray = recipes.filter((e: Recipe) => e.strMeal.toLowerCase().includes(searchName));

  if (foundArray !== undefined) {
    return foundArray;
  } else {
    return [];
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => ({
  props: {
    recipes: searchRecipes(params?.searchName === undefined ? '' : params.searchName),
    searchedText: params?.searchName
  }
});

const SearchPage: NextPage = ({ recipes, searchedText }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Main
    meta={(
      <Meta
        title='Next.js Boilerplate Presentation'
        description='Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework.'
      />
    )}
  >
    <div>
      <p>Search for {searchedText}</p>
      <p>Found {recipes.length} results</p>

      <br />

      {recipes.map((r: Recipe, index: number) => (
        <div key={index}>
          <Link key={r.idMeal} href={`/recipes/${r.idMeal}`}>
            <p>{r.strMeal}</p>
          </Link>
        </div>
      ))}
    </div>
  </Main>
);

export default SearchPage;
