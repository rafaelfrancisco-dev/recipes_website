import React from 'react';

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import RecipeBox from '../../components/RecipeBox';
import { Meta } from '../../layout/Meta';
import { Recipe } from '../../models/Recipe';
import recipeList from '../../models/recipes.json';
import { Main } from '../../templates/Main';

function searchRecipes(name: string | string[]): Array<Recipe> {
  const searchName = typeof name === 'string' ? name.toLowerCase() : name[0].toLowerCase();
  const foundArray = recipeList.filter((e: Recipe) => e.strMeal.toLowerCase().includes(searchName));

  if (foundArray !== undefined) {
    return foundArray;
  }

  return [];
}

// eslint-disable-next-line max-len
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => ({
  props: {
    recipes: searchRecipes(params?.searchName === undefined ? '' : params.searchName),
    searchedText: params?.searchName,
  },
});

// eslint-disable-next-line max-len
const SearchPage: NextPage = ({
  recipes,
  searchedText,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starer code for your project. Build your React application with Next.js framework."
      />
    )}
  >
    <div>
      <p>{`Searched for ${searchedText}`}</p>
      <p>{`Found ${recipes.length} results`}</p>

      <br />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-8">
        {recipes.map((r: Recipe) => (
          <RecipeBox recipe={r} key={r.idMeal} />
        ))}
      </div>
    </div>
  </Main>
);

export default SearchPage;
